<script lang="ts">
  import Button from "./Button.svelte";
  import Highlight from "highlight.js";
  import { pb } from "$lib/pocketbase";
  import { enhance } from "$app/forms";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { get } from "svelte/store";

  import type { Post, User } from "$lib/types";
  import type { RecordModel } from "pocketbase";
  import { cartItems, addToCart, removeFromCart } from "../../shoppingCart";

  export let post: Post & RecordModel;
  export let authModel: User | undefined;
  let contentRef: HTMLElement | undefined;

  // logica comentarios
  let content = "";

  // logica del carrito
  let cart = get(cartItems)
  let cartItemIndex = cart.findIndex((item) => { return item.id === post.id })
  let cartProduct = cart[cartItemIndex]

  // logica expandir post
  let expandPost = false
  let imgIndex = 0

  function nextImage() {
    imgIndex = (imgIndex + 1) % post.media.length; // Cycle through the images
  }

  function expand() {
    if (event.target.classList.contains('postContent') || event.target.classList.contains('expand')) {
      expandPost = false==expandPost
    }
  }

  cartItems.subscribe((newCartValue) => {
    cart = newCartValue
    cartItemIndex = cart.findIndex((item) => { return item.id === post.id })
    cartProduct = cart[cartItemIndex]

  })

  onMount(() => {
    if (!contentRef || !post) {
      return;
    }

    Highlight.highlightElement(contentRef);
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="postContent"
  class:small={!expandPost}
  class:big={expandPost}
  on:click={expand}
  >
  <section class="userActions">
    <a href="/profiles/{post.user.id}" class="account">
      {#if $pb && post.user.photo}
        <img
          src={$pb.getFileUrl(post.user, post.user.photo)}
          alt={post.user.name}
          class="profileImg"
        />
      {:else}
        <iconify-icon icon="ic:round-account-circle"></iconify-icon>
      {/if}
      <p>{post.user.name}</p>
    </a>
  
    <div class="interactions">
      {#if authModel}
        <form
          action="/posts/{post.id}?/toggleLiked&redirect={$page.url.pathname}"
          method="post"
          use:enhance={() => {
            if (post && authModel) {
              if (post.likes.includes(authModel.id)) {
                let { id } = authModel;
                post.likes = post.likes.filter((user) => user !== id);
              } else {
                post.likes = [...post.likes, authModel.id];
              }
            }
  
            return async ({ update }) => {
              await update({ invalidateAll: true, reset: true });
            };
          }}
        >
          <Button size="icon" variant="ghost">
            {#key post.likes}
              <iconify-icon
                in:fade={{ duration: 200 }}
                icon="mdi:heart{post.likes.includes(authModel.id)
                  ? ''
                  : '-outline'}"
                class:liked={post.likes.includes(authModel.id)}
              ></iconify-icon>
            {/key}
          </Button>
        </form>
      {/if}
      {#if authModel && post.user.id === authModel.id}
        <form action="/posts/{post.id}?/deletePost" method="post">
          <Button size="icon" variant="destructive">
            <iconify-icon icon="ph:trash"></iconify-icon>
          </Button>
        </form>
      {/if}
    </div>
  </section>
  
  <header>
    <a href="/posts/{post.id}" class="account"><h1>{post.title}</h1></a>
    <b>${post.price}</b>
    <div class="addToCart">
      {#if post.id && expandPost}
        <!-- borrar post -->
        <button 
          on:click={()=>removeFromCart(post.id)}
          class="flex items-center"
        >
          <iconify-icon icon="material-symbols:remove" width="1rem" height="1rem"></iconify-icon>
        </button>
  
        {#if cartProduct}
          <p>{cartProduct.quantity}</p>
        {/if}
  
        <button 
          on:click={()=>addToCart(post.id)}
          class="flex items-center"
        >
          <iconify-icon icon="material-symbols:add" width="1rem" height="1rem"></iconify-icon>
        </button>
      {/if}
    </div>
    {#if expandPost}
    <pre>
      <p bind:this={contentRef}>{post.content}</p>
    </pre>
    {/if}
  </header>
  
  <section class="media">
    {#if $pb && post.media} 
      <!-- {#each post.media as file} -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <img
          src={$pb.getFileUrl(post,post.media[imgIndex])}
          alt={post.media[0].name || 'Post media'}
          class="mediaImg"
          on:click={nextImage}
        />
      <!-- {/each} -->
    {/if}
  </section>

  <section class="tags">
    {#each post.tags as tag}
      <div class="tag">
        <pre>{tag}</pre>
      </div>
    {/each}
  </section>

  <section class="comments">
  {#if $pb && post.expand.comments && expandPost}
    <div class="comments-section">
      <h3 class="comments-title">Comments</h3>
      {#each post.expand.comments as comment}
        <div class="comment">
          <div class="comment-avatar">
            {#if comment.expand.user.photo}
              <img
                src={$pb.getFileUrl(comment.expand.user, comment.expand.user.photo)}
                alt={"Profile picture of " + comment.expand.user.username}
                class="avatar-img"
              />
            {:else}
              <div class="avatar-placeholder">
                <iconify-icon icon="ic:round-account-circle"></iconify-icon>
              </div>
            {/if}
          </div>
          <div class="comment-content">
            <p class="comment-author">{comment.expand.user.username}</p>
            <p class="comment-text">{comment.content}</p>
          </div>
        </div>
      {/each}
      <div class="show-more">Show more</div>
    </div>

    <form
      class="comment-form"
      method="post"
      action="/?/newComment"
      use:enhance={({ formData }) => {
        formData.append('user', authModel.id);
        formData.append('post', post.id);
        formData.append('content', content);
      }}
    >
      <textarea bind:value={content} placeholder="Add a comment..." class="comment-input"></textarea>
      <Button
        variant="primary"
        disabled={content === ""}
      >
        Comment
      </Button>
    </form>
  {/if}
  </section>

  <div class="expand"><p>...</p></div>
</div>

<style>

.postContent {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(3rem, 2fr) 2fr 8fr 1fr auto 0.5fr;
  background-color: var(--primary-color);
  backdrop-filter: blur(0.3rem);
  border-radius: 8px;
  border: solid 1px var(--tertiary-color);
  padding: 1rem;
  color: var(--text-color-bb);

  transition: grid 0.3s ease; /* Adjust timing as needed */
}
.userActions {
  grid-area: 1 / 1 / 2  / 2;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 4px;
}
header {
  grid-area: 2 / 1 / 3  / 2;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.media {
  grid-area: 3 / 1 / 4  / 2;
  justify-self: center;
  background-color: #065fd4;
  display: flex;
  width: 80%;
  height: 100%;
  overflow: hidden;
}
.tags {
  grid-area: 4 / 1 / 5  / 2;
  display: flex;
  justify-content: baseline;
  gap: 8px;
  overflow: scroll;
}
.comments {
  grid-area: 5 / 1 / 6  / 2;
}
.expand {
  grid-area: 6 / 1 / 7  / 2;
  width: 100%;
  display: flex;
  justify-content: center;
}

.expand p{
  pointer-events: none;
}

.mediaImg {
  width: 100%;
  height: 100%;
  object-fit:cover;
}

pre {
  flex: 1 1 100%;
  tab-size: 4;
  display: flex;
  flex-direction: column;
  position: relative;
  max-height: 60vh;
}

pre p {
  padding: 0.6rem;
  text-wrap: wrap;
}

h1 {
  font-size: 20px;
}

iconify-icon {
  font-size: 20px;
}

.account {
  flex: 1 1 50%;
  display: flex;
  justify-content:baseline;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}
.addToCart {
  display: flex;
}
.interactions {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.interactions iconify-icon {
  font-size: 24px;
}

.liked {
  color: var(--accent-color);
}

.profileImg {
  width: 32px;
  height: 32px;
  border-radius: 100px;
  object-fit: cover;
}

.account iconify-icon {
  font-size: 32px;
}

.tag {
  padding: 5px 10px;
  background-color: var(--secondary-color);
  font-size: 14px;
  border-radius: 8px;
  width: fit-content;
  height: fit-content;
  
  display: flex;
  gap: 2px;
}
.tag::before {
  content: "#";
  color: var(--accent-color);
}

/* comment section */
.comments-section {
  margin-top: 20px;
  font-family: 'Roboto', Arial, sans-serif;
}

.comments-title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 24px;
}

.comment {
  display: flex;
  margin-bottom: 16px;
}

.comment-avatar {
  margin-right: 16px;
}

.avatar-img, .avatar-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.avatar-placeholder {
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #757575;
}

.comment-content {
  flex-grow: 1;
}

.comment-author {
  font-size: 13px;
  font-weight: 500;
  margin: 0 0 4px 0;
}

.comment-text {
  font-size: 14px;
  margin: 0;
  line-height: 1.4;
}

.show-more {
  color: #065fd4;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 16px;
}

.comment-form {
  margin-top: 24px;
}

.comment-input {
  width: 100%;
  min-height: 24px;
  padding: 8px;
  color: black;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

.comment-submit {
  margin-top: 8px;
  float: right;
}
</style>
