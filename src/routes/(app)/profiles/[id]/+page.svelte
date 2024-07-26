<script lang="ts">
    import Actions from "$lib/components/Actions.svelte";
    import PostComponent from "$lib/components/PostComponent.svelte";
    import { pb } from "$lib/pocketbase";
    import type { PageData } from "./$types";
  
    export let data: PageData;
  
    let { result } = data;
  </script>
  
  <svelte:head>
    <title>{result.user ? result.user.name : "User not found"} - CS</title>
  </svelte:head>
  
  <div class="metadata" style:--metadata="metadata">
    <header>
      {#if result.user}
        <div class="first-row">
          <div class="user-information">
            {#if $pb && result.user.photo}
              <img
                src={$pb.getFileUrl(result.user, result.user.photo)}
                alt={result.user.name}
              />
            {:else}
              <iconify-icon icon="mingcute:user-4-fill"></iconify-icon>
            {/if}
  
            <h1>{result.user.name}</h1>
          </div>
        </div>
        
        {#if result.user.bio}
          <p class="bio">{result.user.bio}</p>
        {:else}
          <p>Sin información</p>
        {/if}
      {:else}
        <h1 class="not-found">{"User not found"}</h1>
      {/if}
    </header>
  </div>

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

  <div class="actions" style:--actions="actions">
    <Actions authModel={data.authModel}/>
  </div>


  <style>
    .mainContent {
      grid-area: 3 / 5 / 13 / 13;
      view-transition-name: mainContent;
      overflow: scroll;

      padding: 1rem;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;

      border-width: 0.1vh 0 0 0.1vh;
      border-color: var(--text-color);
    }

    .metadata {
      grid-area: 1 / 1 / 3 / 13;
      padding: 1rem;

      border-width: 0.1vh 0.1vh 0.1vh 0;
      border-color: var(--text-color);
    }

    .actions {
        grid-area: 3 / 1 / 13 / 5;
        view-transition-name: actions;
        z-index: 1;

        border-width: 0.1vh 0.1vh 0.1vh 0 ;
        border-color: var(--text-color);
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
      background-color: var(--primary-color);
      border-radius: 8px;
      border: solid 1px var(--tertiary-color);
      height: 100%;
      flex-grow: 1;
      padding: 1rem;
      display: flex;
      align-items: center;
    }
  
    article {
      gap: 1rem;
    }
  
    header {
      gap: 12px;
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
  
    .user-information {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  
    h1 {
      font-size: 20px;
      font-weight: 400;
    }
  
    h1.not-found {
      text-align: center;
    }
  
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  
    iconify-icon {
      font-size: 40px;
    }
  </style>