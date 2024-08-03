<script lang="ts">
    import AnimatedElement from "$lib/components/AnimatedElement.svelte";
    import Link from "$lib/components/Link.svelte";
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
    <div class="heroSection">
        <div class="heroTitle">
            <div class="que"><p>¿Que</p></div>
            <div class="se"><p>SE</p></div>
            <div class="vende"><p>VENDE</p></div>
            <div class="en"><p>en ...</p></div>
            <div class="abeja"><iconify-icon icon="fluent-emoji-high-contrast:honeybee" width="9rem" height="10rem"></iconify-icon></div>
        </div>
        <div class="heroVisuals">visuales</div>
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
    <div id="end" class="homeSection">
        <Link href="/search" variant="ghost">
            <div class="link-content">
                <iconify-icon icon="material-symbols:search"></iconify-icon>
                <span> Search </span>
            </div>
            </Link>
    </div>
</AnimatedElement>
</div>

<style>
.home {
    position: absolute;
    max-width: 1080px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.heroSection {
    height: 95vh;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}
.heroTitle {
    display: grid;
    grid-template-rows: repeat(12, 1fr);
    grid-template-columns: repeat(12, 1fr);
}
.que {
    grid-area: 2 / 2 / 3 / 6;
    font-size:150%;
    font-weight:bold;
    display: flex;
    align-items: flex-end;
}
.se {
    grid-area: 3 / 3 / 5 / 6;
    font-size:550%;
    font-weight:bold;
    display: flex;
    align-items:center;
}
.vende {
    grid-area: 5 / 3 / 7 / 11;
    font-size:550%;
    font-weight:bold;
    display: flex;
    align-items:center;
}
.en {
    grid-area: 7 / 9 / 8 / 12;
    font-size:150%;
    font-weight:bold;
}
.abeja {
    grid-area: 3 / 6 / 5 / 11;
}
</style>