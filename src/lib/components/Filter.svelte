<script>
    import { createEventDispatcher } from 'svelte';
    import Button from './Button.svelte';

    const dispatch = createEventDispatcher();
    let searchTag = '';
    let searchTitle = '';
    let searchUser = '';


    function handleFilter() {
        dispatch('filter', {
            tag: searchTag,
            title: searchTitle,
            user: searchUser
        });
    }
    function handleReset() {
        searchUser = '';
        searchTitle = '';
        searchTag = '';
        // Optionally, you can also trigger a new search here to show all results
        handleFilter();
    }
</script>

<style>
    form {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        position: sticky;
        top:0
    }

    input {
        width: 26%;
        padding: 5px;
        font-size: 16px;
        color: black;
    }
</style>

<form on:submit|preventDefault={handleFilter}>
    <input type="text" placeholder="Buscar por usuario" bind:value={searchUser} />
    <input type="text" placeholder="Buscar por título" bind:value={searchTitle} />
    <input type="text" placeholder="Buscar por tag" bind:value={searchTag} />
    <Button variant="primary">Buscar</Button>
    {#if searchTag || searchTitle || searchUser}
    <button type="button" on:click={handleReset}>
        <iconify-icon icon="ep:close-bold" width="1rem" height="1rem"></iconify-icon>
    </button>
    {/if}
</form>
