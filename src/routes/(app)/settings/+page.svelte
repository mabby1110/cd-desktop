<script context="module">
    export const authModelKey = { name: "authModel" };
  </script>
  
  <script lang="ts">
    import AccountSettings from "./AccountSettings.svelte";
    import type { PageData } from "./$types";
    import Profile from "./Profile.svelte";
    import Security from "./Security.svelte";
    import { setContext } from "svelte";
  
    export let data: PageData;
  
    setContext(authModelKey, data.authModel);
  </script>
  
  <svelte:head>
    <title>Settings - CS</title>
  </svelte:head>

  <div class="accountSettings">
    <AccountSettings />
  </div>

  <div class="profile">
    <Profile />
  </div>

  <div class="security">
    <Security />
  </div>
  
  <style>
    article {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }
  
    .accountSettings {
      grid-area: 1 / 1 / 10 / 9;
    }
    .security {
      grid-area: 4 / 9 / 5 / -1;
    }

    .profile {
      grid-area: 1 / 9 / 4 / -1;
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