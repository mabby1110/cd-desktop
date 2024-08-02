<script lang="ts">
    import AnimatedElement from "$lib/components/AnimatedElement.svelte";
    import { onMount } from 'svelte';
    import { rotation } from '$lib/bgAnimation';

    onMount(() => {
        const handleScroll = () => {
        const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        rotation.set(scrollPercentage * 45); // 45 degrees max rotation
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    });
</script>

<svelte:head>
<title>Home - CS</title>
</svelte:head>

<div class="home">
<AnimatedElement>
    <div class="homeSection">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod consectetur, deserunt, cum in nostrum cupiditate mollitia praesentium eius magnam esse quam nobis voluptas aspernatur voluptates alias enim. Adipisci necessitatibus, sit quae aliquid aliquam, fuga, iure quo provident ratione veritatis ea reprehenderit ipsam eius? Harum nemo molestiae recusandae ea. Et, ad.
    </div>
</AnimatedElement>

<AnimatedElement>
    <div class="homeSection">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod consectetur, deserunt, cum in nostrum cupiditate mollitia praesentium eius magnam esse quam nobis voluptas aspernatur voluptates alias enim. Adipisci necessitatibus, sit quae aliquid aliquam, fuga, iure quo provident ratione veritatis ea reprehenderit ipsam eius? Harum nemo molestiae recusandae ea. Et, ad.
    </div>
</AnimatedElement>

<AnimatedElement>
    <div class="homeSection">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod consectetur, deserunt, cum in nostrum cupiditate mollitia praesentium eius magnam esse quam nobis voluptas aspernatur voluptates alias enim. Adipisci necessitatibus, sit quae aliquid aliquam, fuga, iure quo provident ratione veritatis ea reprehenderit ipsam eius? Harum nemo molestiae recusandae ea. Et, ad.
    </div>
</AnimatedElement>
</div>

<style>
.home {
    grid-area: 1 / 1 / -1 / -1;
    z-index: 999;
    width: 100%;
    color: white;
    background-color: black;
}

.homeSection {
    height: 65vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    box-sizing: border-box;
}

:global(.animated-element) {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 1s, transform 1s;
}

:global(.animated-element.show) {
    opacity: 1;
    transform: translateY(0);
}
</style>