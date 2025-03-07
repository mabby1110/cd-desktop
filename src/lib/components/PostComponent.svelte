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
  let moreOptions = false

  // logica carrusel imagenes
  let imgIndex = 0
  function nextImage() {
    event.stopPropagation();
    imgIndex = (imgIndex + 1) % post.media.length; // Cycle through the images
  }
  
  // logica expandir
  let expanded: boolean = false;
  function handleClick(){
    expanded=expanded?false:true;
    console.log("expanded", expanded)
  }

  function handleOptions() {
    event.stopPropagation();
    moreOptions = moreOptions?false:true;
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
<div class="postContent {expanded?'card-big':''}" on:click={handleClick}>
  <header class="{expanded?'postTitle expanded':'postTitle'}">
    <a href="/posts/{post.id}"><h1>{post.title}</h1></a>
    <b>${post.price}</b>
    {#if post.id}

      <button class="flex items-center" on:click={()=>{removeFromCart(post.id);event.stopPropagation();}}>
        <iconify-icon icon="material-symbols:remove" width="1rem" height="1rem"></iconify-icon>
      </button>

      {#if cartProduct}
        <p>{cartProduct.quantity}</p>
      {/if}

      <button class="flex items-center" on:click={()=>{addToCart(post);event.stopPropagation();}}>
        <iconify-icon icon="material-symbols:add" width="1rem" height="1rem"></iconify-icon>
      </button>

    {/if}
  </header>

  {#if expanded}
  <div class="postPre">
      <pre>
        <p bind:this={contentRef}>{post.content}</p>
      </pre>
    </div>
  {/if}
  
  <section class="{expanded?'postMedia expanded':'postMedia'}">
    {#if $pb && post.media} 
      <!-- {#each post.media as file} -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <img
          src={$pb.getFileUrl(post,post.media[imgIndex])}
          alt={post.media[0].name || 'Post media'}
          class="mediaImg"
        />
        <button class="nextImg" on:click={nextImage}>></button>
      <!-- {/each} -->
    {/if}
  </section>

  <section class="postTags">
    {#each post.tags as tag}
      <div class="tag">
        <pre>{tag}</pre>
      </div>
    {/each}
  </section>

  <section class="postComments">
  {#if $pb && post.expand.comments}
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

  <section class="postActions">
    <!-- svelte-ignore a11y-missing-attribute -->
    <a class="account">
      {#if $pb && post.user.photo}
        <img
          src={$pb.getFileUrl(post.user, post.user.photo)}
          alt={post.user.name}
          class="profileImg"
        />
      {:else}
        <iconify-icon icon="ic:round-account-circle"></iconify-icon>
      {/if}
      <a href="/profiles/{post.user.id}" on:click={(event)=>{event.stopPropagation()}}>{post.user.name}</a>
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
          <Button size="icon" variant="ghost" on:click={(event)=>{event.stopPropagation();}}>
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
      {#if moreOptions}
        <div>
          {#if authModel && post.user.id === authModel.id}
            <form action="/posts/{post.id}?/deletePost" method="post">
              <Button size="icon" variant="destructive">
                <iconify-icon icon="ph:trash"></iconify-icon>
              </Button>
            </form>
          {/if}
        </div>
        <button>mas detalles</button>
      {/if}
      <button on:click={handleOptions}>
        <iconify-icon icon="mi:options-vertical" width="2rem" height="2rem"  style="color: white"></iconify-icon>
      </button>
    </div>
  </section>
</div>

<style>
*::-webkit-scrollbar {
  display: none;  /* Para Chrome, Safari y Opera */
}
.postContent {
  width: 100%;
  color: var(--text-color-bb);
  background-color: var(--primary-color);
  backdrop-filter: blur(0.3rem);
  border-radius: 5%;
  box-shadow: 10px 10px 10px black;
  display: grid;
  grid-template-columns:1fr;
  grid-template-rows: repeat(5, minmax(1rem, 1fr));
}

.postTitle {
  grid-area: 6 / 1 / 5 / -1;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 3;
}
.postTitle.expanded {
  grid-area: 5 / 1 / 6 / -1;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 3;
}
.postMedia {
  grid-area: 1 / 1 / 6 / -1;
  position: relative;
  z-index: -1;
}
.postMedia.expanded {
  grid-area: 1 / 1 / -2 / -1;
  position: relative;
}
.postPre {
  grid-area: 7 / 1 / 8 / -1;
  overflow: scroll;
  height: 15rem;
  padding: 0 1rem;
}
.postTags {
  grid-area: 6 / 1 / 7 / -1;
  align-items: center;
  display: flex;
  overflow: scroll;
  padding: 0.5rem 0 0.5rem 1rem;
}
.postComments {
  display: none;
}
.postActions {
  grid-area: 1 / 1 / 2  / -1;
  display: flex;
  height: 3rem;
  justify-content: space-between;
}
.mediaImg {
  width: 100%;
  height: 100%;
  object-fit:cover;
}

pre p {
  line-height: 1.2rem;
  text-wrap: wrap;
}

h1 {
  font-size: 20px;
}

iconify-icon {
  font-size: 20px;
}
.postTitle button {
  justify-content:center;
  width: 2rem;
  height: 100%;
}
.account {
  background-color: var(--primary-color);
  border-radius: 0 0 1rem  0;
  padding-right: 1rem;
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
  align-items: center;
  gap: 8px;
}

.interactions iconify-icon {
  font-size: 24px;
}

.liked {
  color: var(--accent-color);
}

.profileImg {
  width: 3rem;
  height: 100%;
  border-radius: 0 0 10% 0;
  object-fit:cover;
}

.account iconify-icon {
  font-size: 32px;
}
.nextImg {
  position: absolute;top:40%;right:0;width:2rem;height:4rem;
}.nextImg:hover {
  background-color: var(--primary-color);
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
.card-big {
  grid-row: span 2 / auto;
}
</style>
