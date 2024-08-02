<script>
    import { onMount } from 'svelte';

    export let threshold = 0.9;

    let element;
    let isVisible = false;

    onMount(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            isVisible = entry.isIntersecting;
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
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s, transform 0.5s;
}

div.visible {
    opacity: 1;
    transform: translateY(0);
}
</style>