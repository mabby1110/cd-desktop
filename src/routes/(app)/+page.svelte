<script lang="ts">
    import PostComponent from "$lib/components/PostComponent.svelte";
    import type { PageData } from "./$types";
  
    export let data: PageData;
  </script>
  
  <svelte:head>
    <title>Home - CS</title>
  </svelte:head>
  <div class="cunt">
    <div class="home">
      {#if data.result["not-found"]}
        <article><h1>No posts found</h1></article>
      {:else if data.result.posts}
        {#await data.result.posts}
          <article><h1>Loading posts</h1></article>
        {:then posts}
          {#each posts as post}
            <article class="postComponent">
              <PostComponent authModel={data.authModel} {post}/>
            </article>
          {:else}
            <article><h1>No posts found</h1></article>
          {/each}
        {/await}
      {/if}
    </div>

    <div class="owner">
      owner
    </div>

    <div class="map">
      map
    </div>
  </div>
  
  <style>
    .cunt {
      display: grid;
      height: 94vh;
      grid-template-columns: repeat(12, 1fr);
      grid-template-rows: repeat(12, 1fr);
    }

    .home {
      grid-area: 1 / 5 / last-line / last-line;
      max-height: inherit;
      overflow: scroll;

      padding: 1rem;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      border-width: 0 0 0 0.1vh;
      border-color: var(--text-color);
    }

    .owner {
      grid-area: 1 / 1 / 5 / 5;

      margin: 0 0 0 2rem;
      border-width: 0 0 0.1vh;
      border-color: var(--text-color);
    }

    .map {
      grid-area: 5 / 1 / last-line / 10;

      margin: 0 0 0 2rem;
      border-width: 0 0 0.1vh;
      border-color: var(--text-color);
    }
  
    article {
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