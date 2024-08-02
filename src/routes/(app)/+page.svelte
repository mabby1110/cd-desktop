<script lang="ts">
    import AnimatedElement from "$lib/components/AnimatedElement.svelte";
    import { onMount } from 'svelte';
    import { release } from '$lib/bgAnimation';

    // onMount(() => {
    //     const handleScroll = () => {
    //         const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    //     };

    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //     window.removeEventListener('scroll', handleScroll);
    //     };
    // });
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
<AnimatedElement>
    <div class="homeSection">
        end
    </div>
</AnimatedElement>
</div>

<style>
.home {
    position: absolute;
    z-index: 999;
    width: 100%;
    color: white;
}

.homeSection {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    box-sizing: border-box;
}
</style>