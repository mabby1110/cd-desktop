<script lang="ts">
  import Anaglyph from "$lib/components/Anaglyph.svelte";

</script>
<svelte:head>
  <title>Home - CS</title>
</svelte:head>

<div class="home">
  <Anaglyph/>
</div>

<style>
.home {
  grid-area: 1 / 1 / -1 / -1;
}

</style>