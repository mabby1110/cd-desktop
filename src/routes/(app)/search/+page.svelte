<script lang="ts">
  import Actions from "$lib/components/Actions.svelte";
  import PostComponent from "$lib/components/PostComponent.svelte";
  import Filter from "$lib/components/Filter.svelte";
  import type { PageData } from "./$types";
  import { writable } from "svelte/store";
  import { release } from "$lib/bgAnimation";
  import { onMount, onDestroy } from "svelte";

  export let data: PageData;
  
  let filteredPosts = writable(data.result.posts);

  function handleFilter(event) {
    const { tag, title, user } = event.detail;
    const filtered = data.result.filterPosts(tag, title, user);
    filteredPosts.set(filtered);
  }

  onMount(()=>{release.set(true)})
  onDestroy(()=>{release.set(false)})
</script>
<svelte:head>
  <title>Home - CS</title>
</svelte:head>
<div class="main">
  <Filter on:filter={handleFilter}/>
  <div class="mainContent" style:--mainContent="mainContent">
    {#if $filteredPosts.length === 0}
      <article><h1>No posts found</h1></article>
    {:else}
      {#each $filteredPosts as post}
        <PostComponent
          authModel={data.authModel}
          {post}
        />
      {/each}
    {/if}
  </div>
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
    referrerpolicy="no-referrer-when-downgrade">
  </iframe>
</div>

<div class="actions" style:--actions="actions">
  <Actions authModel={data.authModel}/>
</div>

<style>
.main {
  overflow: scroll;
  grid-area: 1 / 5 / 13 / 13;
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
  grid-area: 1 / 1 / 5 / 5;
}

.actions {
  grid-area: 5 / 1 / 13 / 5;
}

iframe {
  view-transition-name: c;
}
</style>