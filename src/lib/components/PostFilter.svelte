<script>
    import { createEventDispatcher } from 'svelte';
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
</script>

<style>
    form {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    }

    input {
    padding: 5px;
    font-size: 16px;
    color: black;
    }
</style>

<form on:submit|preventDefault={handleFilter}>
    <input type="text" placeholder="Buscar por usuario" bind:value={searchUser} />
    <input type="text" placeholder="Buscar por título" bind:value={searchTitle} />
    <input type="text" placeholder="Buscar por tag" bind:value={searchTag} />
    <button type="submit">Buscar</button>
</form>
