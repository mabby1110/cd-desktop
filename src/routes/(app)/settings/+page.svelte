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

  <div class="mainContent" style:--mainContent="mainContent">
    <AccountSettings />
  </div>

  <div class="metadata" style:--metadata="metadata">
    <div class="profile">
      <Profile />
    </div>

    <div class="security">
      <Security />
    </div>
  </div>

  <div class="globalActions" style:--globalActions="globalActions">
    <Actions/>
  </div>
  
  <style>
    .mainContent {
      grid-area: 1 / 5 / -1 / -1;
      view-transition-name: mainContent;
      
      border-width: 0.1vh;
      border-color: var(--text-color);
    }
    .metadata {
      grid-area: 1 / 1 / 9 / 5;
      view-transition-name: metadata;

      border-width: 0.1vh;
      border-color: var(--text-color);
    }
    .globalActions {
      grid-area: 9 / 1 / -1 / 5;
      view-transition-name: globalActions;

      border-width: 0.1vh;
      border-color: var(--text-color);
      padding: 2rem;
      display: flex;
      align-items: end;
    }
    article {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
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