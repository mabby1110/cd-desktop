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
            const parent = entry.target.parentElement;

            // Determine child position efficiently
            const childIndex = Array.from(parent.children).indexOf(entry.target);
            console.log(childIndex)

            if (isVisible && childIndex==0) {
                release.set(0)
            } else if (isVisible && childIndex==1){
                release.set(1)
            } else if (isVisible && childIndex==2) {
                release.set(2)
            } else if (isVisible && childIndex==3) {
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
</style>