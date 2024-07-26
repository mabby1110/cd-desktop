<script lang="ts">
    import Actions from "$lib/components/Actions.svelte";
    import { fade, fly, draw } from "svelte/transition";
    import PostComponent from "$lib/components/PostComponent.svelte";
    import type { PageData } from "./$types";
  
    export let data: PageData;
  </script>
  
  <svelte:head>
    <title>Home - CS</title>
  </svelte:head>
  <div class="mainContent" style:--mainContent="mainContent">
    {#if data.result["not-found"]}
      <article><h1>No posts found</h1></article>
    {:else if data.result.posts}
      {#await data.result.posts}
        <article><h1>Loading posts</h1></article>
      {:then posts}
        {#each posts as post}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
          <PostComponent
            authModel={data.authModel}
            {post}
          />
        {:else}
          <article><h1>No posts found</h1></article>
        {/each}
      {/await}
    {/if}
  </div>

  <div class="metadata" style:--metadata="metadata">
    <!-- svelte-ignore a11y-missing-attribute -->
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d239065.04851389918!2d-103.63913292105042!3d20.572068413840732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428aee580d14005%3A0x29c32d113930043d!2sUniversidad%20Aut%C3%B3noma%20de%20Guadalajara!5e0!3m2!1ses!2smx!4v1721789053787!5m2!1ses!2smx" 
      width="100%"
      height="100%"
      style="border:0;"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>

  <div class="actions" style:--actions="actions">
    <Actions authModel={data.authModel}/>
  </div>

  <style>
    div {
      padding: 1rem;
    }
    .mainContent {
      grid-area: 1 / 5 / 13 / 13;
      view-transition-name: mainContent;
      overflow: scroll;
      padding: 1rem;
      border-width: 0.1vh 0 0 0.1vh;
      border-color: var(--text-color);
      
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
    }

    .metadata {
      grid-area: 1 / 1 / 5 / 5;

      border-width: 0.1vh 0.1vh 0.1vh 0 ;
      border-color: var(--text-color);
    }

    .actions {
        grid-area: 5 / 1 / 13 / 5;
        view-transition-name: actions;
        z-index: 1;

        border-width: 0.1vh 0.1vh 0.1vh 0 ;
        border-color: var(--text-color);
    }

    iframe {
      view-transition-name: c;
    }
  </style>