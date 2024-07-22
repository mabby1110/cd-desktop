<script>
    import { cartItems } from '../../shoppingCart';
    import { get } from 'svelte/store';

    let cart = get(cartItems);
    cartItems.subscribe((newCartValue) => {
        cart = newCartValue
    })
    let showMenu = false;
</script>

{#if showMenu}
    <div class="overlay" on:click={() => showMenu = false}></div>
    <div class="sidebar">
        <button on:click={() => {
            showMenu = false;
        }} class="inline-block">
        <iconify-icon icon="ep:close-bold" width="1rem" height="1rem"></iconify-icon>
        </button>
        <br>
        {#each cart as item}
            <p>{item.id} - {item.quantity}</p>
        {/each}
    </div>
{:else}
    <div class="ml-auto flex items-center">
        <button on:click={() => {
            showMenu = true;
        }} class="relative my-2 mx-4">
            <iconify-icon icon="typcn:shopping-cart" width="3rem" height="3rem"></iconify-icon>
            <div
                data-test="cart-quantity"
                class="absolute bottom-0 left-0 -ml-3 -mb-3 flex h-5 w-5 items-center justify-center rounded-full border border-black bg-white text-xs text-black"
            >
                {cart.length}
            </div>
        </button>
    </div>
{/if}

<style>
    .sidebar {
        position: fixed;
        display: nonecx ;
        top: 0;
        right: 0;
        height: 100%;
        width: 250px; /* Adjust the width as needed */
        background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent background */
        color: white;
        padding: 20px;
        z-index: 1000; /* Ensures it is on top of other elements */
    }
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
        z-index: 999; /* Ensures it is behind the sidebar but in front of other elements */
    }
</style>