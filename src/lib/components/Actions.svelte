<script lang="ts">
    import Link from "./Link.svelte";
    import type { User } from "./$types";
    import ShoppingCart from "./ShoppingCart.svelte";
    import ShoppingItem from "./ShoppingItem.svelte";
    import { get } from "svelte/store";
    import { cartItems } from "../../shoppingCart";

    
    export let authModel: User | undefined;
    let view = "seleccione una accion"
    let cart = get(cartItems);
    cartItems.subscribe((newCartValue) => {
        cart = newCartValue
    })

    async function checkout() {
        await fetch("../api/stripeCheckout", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                { items: get(cartItems) }
            )
        }).then((data)=>{
            return data.json()
        }).then((data)=>{
            window.location.replace(data.url);
        })
    }
</script>

<div class="actionContainer">
    <div class="actionContent">
        {#if view == "shoppingCart"}
            {#if cart.length > 0}
                <!-- <div class="overlay" on:click={() => showMenu = false}></div> -->
                <div class="sidebar">
                    <br>
                    {#each cart as item}
                        <ShoppingItem post={item}/>
                    {/each}
                </div>
                <button on:click={()=>checkout()}>checkout</button>
            {:else}
                Vacio
            {/if}
        {:else if view == "seleccione una accion"}
            {view}
        {/if}
    </div>
    <div class="actionButtons">
        <div class="chat">
            <iconify-icon icon="teenyicons:chat-typing-solid" width="3rem" height="3rem"></iconify-icon>
        </div>
        
        <div class="newPost">
        {#if authModel}
            <Link href="/new" variant="primary" size="large">
                +
            </Link>
        {:else}
            <Link href="/auth" variant="primary" size="large">
            Create an account
            </Link>
        {/if}
        </div>
        
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="shoppingCart"
            on:click={()=>{view=view=="shoppingCart"?"seleccione una accion":"shoppingCart"}}
        >
            <ShoppingCart/>
        </div>
    </div>
</div>

<style>
    * {
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
    .actionContainer {
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 8fr 2fr;
        padding: 1rem;
    }
    .actionButtons {
        grid-area: 2 / 1 / 3 / 2;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .actionContent {
        height: 100%;
        grid-area: 1 / 1 / 2 / 2;
        overflow: scroll;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .newPost {
        height: 100%;
        display: flex;
        align-items: center;
    }
</style>