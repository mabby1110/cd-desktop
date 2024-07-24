<script lang="ts">
    import Link from "./Link.svelte";
    import type { User } from "./$types";
    import ShoppingCart from "./ShoppingCart.svelte";

    
    export let authModel: User | undefined;
</script>

<div class="newPost">
{#if authModel}
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