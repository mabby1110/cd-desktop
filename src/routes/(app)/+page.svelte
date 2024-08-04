<script lang="ts">
    import AnimatedElement from "$lib/components/AnimatedElement.svelte";
    import Link from "$lib/components/Link.svelte";
    import mapa from "$lib/images/mapa.svg"
    import logo from "$lib/images/C de comercios LOGO.svg"
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
    <section class="heroSection">
        <div class="heroTitle">
            <div class="que"><p>¿Que</p></div>
            <div class="se"><p>SE</p></div>
            <div class="vende"><p>VENDE</p></div>
            <div class="en"><p>en ...</p></div>
            <div class="abeja"><iconify-icon icon="fluent-emoji-high-contrast:honeybee" width="16vw" height="16vw"></iconify-icon></div>
        </div>
        <div class="heroVisuals">
            <h1>Guadalajara</h1>
            <img src={mapa} alt="mapa de la ciudad">
            <div class="heroDescription">
                La C de Comercios es un espacio que reúne todos los productos que se venden en tu ciudad.
            </div>
        </div>
    </section>
</AnimatedElement>

<AnimatedElement>
    <section>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod consectetur, deserunt, cum in nostrum cupiditate mollitia praesentium eius magnam esse quam nobis voluptas aspernatur voluptates alias enim. Adipisci necessitatibus, sit quae aliquid aliquam, fuga, iure quo provident ratione veritatis ea reprehenderit ipsam eius? Harum nemo molestiae recusandae ea. Et, ad.
    </section>
</AnimatedElement>

<AnimatedElement>
    <section>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod consectetur, deserunt, cum in nostrum cupiditate mollitia praesentium eius magnam esse quam nobis voluptas aspernatur voluptates alias enim. Adipisci necessitatibus, sit quae aliquid aliquam, fuga, iure quo provident ratione veritatis ea reprehenderit ipsam eius? Harum nemo molestiae recusandae ea. Et, ad.
    </section>
</AnimatedElement>
<AnimatedElement>
    <section>
        <Link href="/search" variant="ghost">
            <div class="link-content">
                <iconify-icon icon="material-symbols:search"></iconify-icon>
                <span> Search </span>
            </div>
        </Link>
    </section>
</AnimatedElement>
</div>

<style>
.home {
    position: absolute;
    width: 100%;
    padding: 0 5vw;
}

section {
    height: 90vh;
}
.heroSection {
    display: grid;
    column-gap: 4rem;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}
.heroTitle {
    display: grid;
    grid-template-rows: repeat(12, minmax(1rem, auto));
    grid-template-columns: repeat(12, minmax(1rem, auto));
}
.heroVisuals {
    display: grid;
    grid-template-rows: repeat(12, minmax(1rem, auto));
    grid-template-columns: repeat(12, minmax(1rem, auto));
}
.que {
    grid-area: 5 / 2 / 6 / 6;
    font-size:4vw;
    font-weight:bold;
    display: flex;
    align-items: flex-end;
}
.se {
    grid-area: 6 / 3 / 7 / 7;
    font-size:12vw;
    font-weight:bold;
    display: flex;
    align-items:center;
    color: #FFEE95;
}
.vende {
    grid-area: 7 / 3 / 8 / 10;
    font-size:12vw;
    word-break:normal;
    font-weight:bold;
    display: flex;
    align-items:center;
    color: #FFE141;
}
.en {
    grid-area: 8 / 10 / 9 / 13;
    font-size:4vw;
    font-weight:bold;
}
.abeja {
    grid-area: 6 / 7 / 7 / 12;
    justify-content: center;
    display: flex;
    align-items:center;
}
.heroSection h1 {
    grid-area: 5 / 1 / 6 / 11;
    font-size:2vw;
    align-self: center;

}
.heroSection img {
    grid-area: 6 / 1 / 9 / 11;
    width: 100%;
    border-radius: 10px;
    box-shadow: 5px 5px 20px rgba(255, 255, 255, 0.281);
}
.heroSection .heroDescription {
    grid-area: 8 / 2 / 9 / 12;
    background-color: var(--primary-color);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 5px 5px 20px rgba(255, 255, 255, 0.281);
}
</style>