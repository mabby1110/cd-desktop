<script lang="ts">
  import type { PageData } from "./$types";
  import Link from "$lib/components/Link.svelte";
  import { pb } from "$lib/pocketbase";
  import ShoppingCart from "$lib/components/ShoppingCart.svelte";

  export let data: PageData;
</script>

<!-- <svelte:head>
  <link
  rel="stylesheet"
  href="https://unpkg.com/@highlightjs/cdn-assets@11.9.0/styles/default.min.css"
  />
  </svelte:head> -->
  
  
<main>
  <div class="navbar">
    <a href="/">
      <h1 class="md-show">Demo co</h1>
      <h1 class="md-hide">CS</h1>
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

      <Link href="/settings" variant="ghost">
        <div class="link-content">
          <iconify-icon icon="material-symbols:settings"></iconify-icon>
          <span> Settings </span>
        </div>
      </Link>
      {/if}
    </section>

    <section class="links icons">
      <Link href="/" variant="ghost" size="icon">
        <iconify-icon icon="octicon:home-fill-24"></iconify-icon>
      </Link>

      {#if data.authenticated}
        <Link href="/profiles" variant="ghost" size="icon">
          <iconify-icon icon="ic:baseline-account-circle"></iconify-icon>
        </Link>

        <Link href="/settings" variant="ghost" size="icon">
          <iconify-icon icon="material-symbols:settings"></iconify-icon>
        </Link>
      {:else}
        <Link href="/settings" size="icon" variant="primary">
          <iconify-icon icon="mdi:login"></iconify-icon>
        </Link>
      {/if}
    </section>
  </div>
  <slot />

  <div class="userActions">
    <div class="newPost">
      {#if data.authenticated}
        <Link href="/new" variant="primary" size="large">
          <iconify-icon icon="mingcute:add-fill"></iconify-icon>
          <span> Create </span>
        </Link>
      {:else}
        <Link href="/auth" variant="primary" size="large">
          Create an account
        </Link>
      {/if}
    </div>
    <div class="shoppingCart">
      <ShoppingCart/>
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    max-height: 95%;
    align-items: stretch;
    flex-direction: column;
    background-color: var(--secondary-color);
    
    overflow: scroll;
    height: 100vh;
  }

  .userActions {
    position: absolute;
    right: 0;
    z-index: 1;
  }

  hr {
    border: none;
    border-top: solid 1px var(--tertiary-color);
  }

  .navbar > a {
    text-decoration: none;
    display: grid;
    place-items: center;
  }

  .navbar {
    position: sticky;
    display: flex;
    max-height: 5%;
    justify-content: space-between;
    gap: 1rem;
    border-top: white;
    border-width: 0 0 0.1vw 0;

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
