<script context="module">
    export const authModelKey = { name: "authModel" };
  </script>
  
  <script lang="ts">
    import AccountSettings from "./AccountSettings.svelte";
    import type { PageData } from "./$types";
    import Profile from "./Profile.svelte";
    import Security from "./Security.svelte";
    import { setContext } from "svelte";
    import Actions from "$lib/components/Actions.svelte";
  
    export let data: PageData;
  
    setContext(authModelKey, data.authModel);
  </script>
  
  <svelte:head>
    <title>Settings - CS</title>
  </svelte:head>

  <div class="main" style:--mainContent="mainContent">
    <div class="mainContent">
      <div class="profile">
        <Profile />
      </div>
      <div class="accountSettings">
        <AccountSettings />
      </div>
      <div class="security">
        <Security />
      </div>
    </div>
  </div>
  
  <div class="metadata" style:--metadata="metadata">
  </div>
  <div class="actions" style:--actions="actions">
  </div>

  <style>
    .main {
      grid-area: 1 / 2 / -1 / -1;
    }
      .mainContent {
        display: grid;
        gap: 1rem;
        grid-template-columns: 3fr 5fr;
        grid-template-rows: 1fr 1fr;
      }
    .metadata {
      grid-area: 1 / 1 / 5 / 2;
    }

    .actions {
      grid-area: 5 / 1 / 13 / 2;
    }
    .security {
      grid-area: 2 / 2 / -1 / -1;
    }
    .profile {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  
    @media (min-width: 700px) {
      article {
        flex-direction: row;
      }
  
      .right {
        min-width: 20rem;
      }
    }
  </style>