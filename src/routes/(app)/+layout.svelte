<script lang="ts">
  import type { PageData } from "./$types";
  import Link from "$lib/components/Link.svelte";
  import { pb } from "$lib/pocketbase";
  import ViewTransition from "$lib/components/Navigation.svelte"
  import Anaglyph from "$lib/components/Anaglyph.svelte";
  import { release } from "$lib/bgAnimation";
  import logo from "$lib/images/C DE COMERCIO LOGO.svg"


  export let data: PageData;

</script>

<!-- <svelte:head>
  <link
  rel="stylesheet"
  href="https://unpkg.com/@highlightjs/cdn-assets@11.9.0/styles/default.min.css"
  />
  </svelte:head> -->
  
<div class="background">
  <Anaglyph mode={true} release={$release}/>
</div>

<main>
  <ViewTransition />
  <div class="navbar">
    <a href="/">
      <img src={logo} alt="logo c de comercio" class="logo">
    </a>

    <section class="links">
      <Link href="/" variant="ghost" align="left">
        <div class="link-content">
          <iconify-icon icon="octicon:home-fill-24"></iconify-icon>
          <span> Home </span>
        </div>
      </Link>   

      {#if data.authenticated}
      <Link href="/profiles" variant="ghost" align="left">
        <div class="link-content">
          {#if $pb && data.authModel && data.authModel.photo}
            <img
              src={$pb.getFileUrl(data.authModel, data.authModel.photo)}
              alt={data.authModel.name}
            />
          {:else}
            <iconify-icon icon="ic:baseline-account-circle"></iconify-icon>
          {/if}
          <span> Profile </span>
        </div>
      </Link>

      <Link href="/search" variant="ghost">
        <div class="link-content">
          <iconify-icon icon="material-symbols:search"></iconify-icon>
          <span> Search </span>
        </div>
      </Link>

      <Link href="/settings" variant="ghost">
        <div class="link-content">
          <iconify-icon icon="material-symbols:settings"></iconify-icon>
          <span> Settings </span>
        </div>
      </Link>
      {/if}
    </section>
  </div>
  <div class="mainGrid">
    <slot />
  </div>
</main>

<style>
  .logo {
    width: 10vh;
    height: 10vh;
  }
  .background {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: -999;
    width: 100%;
    background-color: rgb(0, 0, 0);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  main {
    display: flex;
    align-items: stretch;
    flex-direction: column;
  }
  main .mainGrid {
    position: absolute;
    top:10vh;
  }
  .navbar {
    position: fixed;
    z-index: 999;
    width: 100%;
    top: 0;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0 5vw;
    border-top: white;
    border-width: 0 0 0.1vw 0;
    background-color: black;
    color: var(--text-color-bb);
  }
  .navbar > a {
    text-decoration: none;
    display: grid;
    place-items: center;
  }
  .md-show {
    display: none;
  }
  .md-hide {
    display: block;
  }
  .links {
    display: none;
    flex-direction: row;
    gap: 8px;
  }
  .link-content {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  iconify-icon {
    font-size: 22px;
  }
  img {
    width: 22px;
    height: 22px;
    object-fit: cover;
  }
  .link-content span {
    font-size: 14px;
  }
  .link-content.create {
    justify-content: center;
  }
  .link-content.create iconify-icon {
    font-size: 16px;
    color: var(--text-color);
  }
  .link-content.create span {
    color: var(--text-color);
  }

  .icons {
    display: flex;
  }

  @media (min-width: 800px) {

    .md-show {
      display: block;
    }

    .md-hide {
      display: none;
    }

    .links {
      display: flex;
    }

    .icons {
      display: none;
    }
  }
</style>
