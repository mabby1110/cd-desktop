<script>
    import { onMount } from 'svelte';
    import { rotation } from '$lib/bgAnimation';

    export let threshold = 0.5;

    let element;
    let isVisible = false;

    onMount(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            isVisible = entry.isIntersecting;

            // Check if the observed element is the last child
            if (isVisible && entry.target === element.parentElement.lastElementChild) {
                rotation.set(45); // Update the rotation value
                console.log("algo rodasf")
            } else {
                rotation.set(0); // Reset the rotation value when not intersecting
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
    background-color: black;
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