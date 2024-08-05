<script lang="ts">
    import Actions from "$lib/components/Actions.svelte";
    import PostComponent from "$lib/components/PostComponent.svelte";
    import { pb } from "$lib/pocketbase";
    import type { PageData } from "./$types";
    import { onMount, onDestroy } from "svelte";
    import { release } from "$lib/bgAnimation";
  
    export let data: PageData;
  
    let { result } = data;
    onMount(()=>{release.set(true)})
    onDestroy(()=>{release.set(false)})
  </script>
  
  <svelte:head>
    <title>{result.user ? result.user.name : "User not found"} - CS</title>
  </svelte:head>
  <div class="main">
    <div class="mainContent" style:--mainContent="mainContent">
      {#if result.posts}
        {#await result.posts}
          <article>
            <h1>Loading Posts</h1>
          </article>
        {:then posts}
          {#each posts as post}
            <PostComponent authModel={data.authModel} {post} />
          {:else}
            <p>No posts found</p>
          {/each}
        {/await}
      {/if}
    </div>
  </div>
  
  <div class="metadata" style:--metadata="metadata">
    <header>
      {#if result.user}
        <div class="userImg">
          {#if $pb && result.user.photo}
            <img
              src={$pb.getFileUrl(result.user, result.user.photo)}
              alt={result.user.name}
            />
            {:else}
            <iconify-icon icon="mingcute:user-4-fill"></iconify-icon>
            {/if}
          </div>
          <div class="userInfo">
            <h1>{result.user.name}</h1>
            {#if result.user.bio}
              <p class="bio">{result.user.bio}</p>
            {:else}
              <p>Sin información</p>
            {/if}
        </div>
      {:else}
        <h1 class="not-found">{"User not found"}</h1>
      {/if}
    </header>
  </div>

  <div class="actions" style:--actions="actions">
    <Actions authModel={data.authModel}/>
  </div>
<style>
.main {
  overflow: scroll;
  grid-area: 4 / 5 / 13 / 13;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
  .mainContent {
    position: sticky;
    top: 0;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-auto-flow: dense;
    grid-auto-rows: 20rem;
  }

.metadata {
  grid-area: 1 / 1 / 4 / 13;
  background-color: var(--primary-color);
}

.actions {
  grid-area: 4 / 1 / 13 / 5;
}
  
  article{
    background-color: var(--primary-color);
    border-radius: 8px;
    border: solid 1px var(--tertiary-color);
    max-width: 40rem;
    flex-grow: 1;
    width: 60vw;
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }

  header {
    box-sizing: border-box;
    height: 100%;
    display: flex;
    height: 100%;
  }

  article {
    gap: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--tertiary-color);
  }

  .first-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .userImg {
    height: inherit;
    aspect-ratio: 1 / 1;
  }
  .userImg img {
    object-fit: cover;
    height: inherit;
  }
  .userInfo {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .user-information h1 {
    align-self: center;
  }

  h1 {
    font-size: 20px;
    font-weight: 400;
  }

  h1.not-found {
    text-align: center;
  }

  iconify-icon {
    font-size: 40px;
  }
</style>