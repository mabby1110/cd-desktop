<script lang="ts">
  import type { Post, User } from "$lib/types";
  import type { RecordModel } from "pocketbase";
  import Button from "./Button.svelte";
  import { pb } from "$lib/pocketbase";
  import { enhance } from "$app/forms";
  import { fade } from "svelte/transition";
  import Highlight from "highlight.js";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  export let post: Post & RecordModel;
  export let authModel: User | undefined;

  let contentRef: HTMLElement | undefined;
  let content = "";
  
  onMount(() => {
    if (!contentRef || !post) {
      return;
    }

    Highlight.highlightElement(contentRef);
  });
</script>

<section class="actions">
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
  <b>${post.price}</b><h1>{post.title}</h1>
</header>

<pre>
  <p bind:this={contentRef}>{post.content}</p>
</pre>

<section class="tags">
  {#each post.tags as tag}
    <div class="tag">
      <span>
        {tag}
      </span>
    </div>
  {/each}
</section>

<section class="media">
  {#if $pb && post.media} 
    {#each post.media as file}
      <img
        src={$pb.getFileUrl(post,file)}
        alt={file.name || 'Post media'}
        class="mediaImg"
      />
    {/each}
  {/if}
</section>

<section class="comments">
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
  {/if}
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
      class="comment-submit"
    >
      Comment
    </Button>
  </form>
</section>

<style>
  .media {
  display: grid;
  gap: 1rem; /* Adjust the gap between grid items as needed */
}

@media (min-width: 0px) and (max-width: 599px) {
  .media {
    grid-template-columns: 1fr 1fr; /* 2 columns for small screens */
  }
}

@media (min-width: 600px) and (max-width: 899px) {
  .media {
    grid-template-columns: 1fr 1fr 1fr; /* 3 columns for medium screens */
  }
}

@media (min-width: 900px) {
  .media {
    grid-template-columns: repeat(3, 1fr); /* 3 columns for large screens */
  }
}

.mediaImg {
  width: 100%;
  height: auto;
  object-fit: cover; /* Adjust as needed */
}

  pre {
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

  code {
    border-radius: 8px;
    padding: 1rem;
    overflow-x: scroll;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h1 {
    font-size: 24px;
  }

  iconify-icon {
    font-size: 20px;
  }

  .language {
    position: absolute;
    background-color: var(--secondary-color);
    padding: 8px 1rem;
    border-radius: 8px;
    top: 1rem;
    right: 1rem;
    color: var(--accent-color);
  }

  .actions {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    overflow: scroll;
    padding: 4px;
  }

  .account {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    text-decoration: none;
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

  .mediaImg {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .account iconify-icon {
    font-size: 32px;
  }

  .tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .tag {
    padding: 5px 10px;
    background-color: var(--secondary-color);
    font-size: 14px;
    border-radius: 8px;
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
