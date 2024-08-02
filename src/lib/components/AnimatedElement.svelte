<script>
    import { onDestroy, onMount } from 'svelte';
    import { release } from '$lib/bgAnimation';

    export let threshold = 0.5;

    let element;
    let isVisible = false;

    onMount(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            isVisible = entry.isIntersecting;
            console.log(entry.target.nextElementSibling, isVisible)
            // Check if the observed element is the last child
            if (isVisible && entry.target.nextElementSibling == null) {
                release.set(true); // Update the rotation value
            } else if (entry.target.nextElementSibling != null){
                release.set(false); // Update the rotation value
            }
        },
        { threshold }
        );

        observer.observe(element);

        return () => observer.disconnect();
    });
</script>

<div bind:this={element} class:visible={isVisible}>
<slot></slot>
</div>

<style>
div {
    color: rgba(255, 255, 255, 0);
    transition: all 0.5s;
}

div.visible {
    color: var(--text-color-bb);
}
div.visible:last-child {
    opacity: 0;
    background-color: none;
}
</style>