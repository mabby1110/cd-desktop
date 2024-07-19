<script lang="ts">
    import { pb } from "$lib/pocketbase";

    export let title = '';
    export let removeLabels = false;
    export let post_id;
    export let image_id;
    export let price: Number;
    export let href = '';
    export let priority = 'lazy';

    let hover = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    on:mouseenter={() => {
    hover = true;
    }}
    on:mouseleave={() => {
    hover = false;
    }}
    class="h-full w-full overflow-hidden"
>
    <a
    data-test="grid-tile"
    {href}
    data-sveltekit-prefetch
    class="focus:border-blue-500 focus:border-2 relative flex h-full w-full items-center justify-center"
    >
    <img
        alt={title}
        class={`w-full md:w-1/2 lg:w-full flex-none transition duration-300 ease-in-out ${
        hover ? 'scale-110' : ''
        }`}
        fetchpriority={priority === 'eager' ? 'high' : 'low'}
        decoding="async"
        loading={priority}
        src={$pb.getFileUrl(post_id, image_id)}
    />
    {#if !removeLabels}
        <div class="absolute top-0 left-0">
        <div class="bg-black p-3 text-2xl  font-medium">
            {title}
        </div>
        <div class="w-fit bg-black p-3 text-sm">
            ${price}
        </div>
        </div>
    {/if}
    </a>
</div>