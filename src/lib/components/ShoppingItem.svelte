<script lang="ts">
    import type { Post } from "$lib/types";
    import { pb } from "$lib/pocketbase";
    export let post: Post;
</script>

<div class="itemContent">
    <div class="title"><a href="/posts/{post.id}">{post.title}</a></div>
    <div class="price">${post.price}</div>
    <div class="total">total: ${post.price*post.quantity}</div>
    <div class="img">
        {#if $pb && post.media}
            <img
            src={$pb.getFileUrl(post,post.media[0])}
            alt={post.media[0].name || 'Post media'}
            class="mediaImg"
            />
            <button class="nextImg">></button>
        {/if}
    </div>
</div>

<style>
    * {
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
    .itemContent {
        height: 6rem;
        display: grid;
        grid-template-columns: repeat(5, minmax(1rem, auto));
        grid-template-rows: repeat(3, minmax(1rem, auto));
    }
    .price {
        grid-area: 1 / 1 / 2 / 2;
        z-index: 1;
        background-color: var(--primary-color);
        
        padding: 0.5rem;
    }
    .title {
        grid-area: 1 / 2 / 2 / 6;
        z-index: 1;
        background-color: var(--primary-color);
        
        padding: 0.5rem;
    }
    .total {
        grid-area: 3 / 4 / 4 / 6;
        z-index: 1;
        background-color: var(--primary-color);
        
        padding: 0.5rem;
    }
    .img {
        grid-area: 1 / 1 / 4 / 6;
        z-index: -1;
    }
    .img img {
        width: 100%;
        object-fit:cover;
    }
</style>