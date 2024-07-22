<script lang="ts">
    import PostComponent from "$lib/components/PostComponent.svelte";
    import type { PageData } from "./$types";
  
    export let data: PageData;
    let selectedPost = ""
  </script>
  
  <svelte:head>
    <title>Home - CS</title>
  </svelte:head>
  <div class="home">
    {#if data.result["not-found"]}
      <article><h1>No posts found</h1></article>
    {:else if data.result.posts}
      {#await data.result.posts}
        <article><h1>Loading posts</h1></article>
      {:then posts}
        {#each posts as post}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
          <article
            on:click={()=>{selectedPost = "trans-"+post.id}}
            class="postComponent"
          >
            <PostComponent authModel={data.authModel} {post}/>
          </article>
        {:else}
          <article><h1>No posts found</h1></article>
        {/each}
      {/await}
    {/if}
  </div>

  <div class="owner" style:--userTrans="{selectedPost}">
    {selectedPost}
  </div>

  <div class="map">
    map
  </div>
  
  <style>
    .home {
      grid-area: 1 / 5 / last-line / last-line;
      view-transition-name: mainContentTrans;
      overflow: scroll;

      padding: 1rem;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    


    .owner {
      grid-area: 1 / 1 / 5 / 5;
      view-transition-name: userTrans;

      margin: 0 0 0 2rem;
      border-width: 0 0.1vh 0.1vh 0;
      border-color: var(--text-color);
    }

    .map {
      grid-area: 5 / 1 / 12 / 5;
      margin: 0 0 0 2rem;
      border-width: 0 0.1vh 0.1vh 0;
      border-color: var(--text-color);
    }
  
    article {
      view-transition-name: var(--userTrans);
      background-color: var(--primary-color);
      border-radius: 8px;
      border: solid 1px var(--tertiary-color);
      max-width: 40rem;
      flex-grow: 1;
      width: 60vw;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  </style>