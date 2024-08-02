<script>
    import { onDestroy, onMount } from 'svelte';
    import { release } from '$lib/bgAnimation';

    export let threshold = 0.5555;

    let element;
    let isVisible = false;

    onMount(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            let prev = entry.target.previousElementSibling
            let next = entry.target.nextElementSibling
            isVisible = entry.isIntersecting;

            console.log(isVisible, next, $release)

            if (isVisible && prev == null) {
                release.set(1)
            } else if (isVisible && prev != null && next != null){
                release.set(2)
            } else if (isVisible && next == null) {
                release.set(3)
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