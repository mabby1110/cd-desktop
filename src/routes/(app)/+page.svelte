<script lang="ts">
    import AnimatedElement from "$lib/components/AnimatedElement.svelte";
    import Link from "$lib/components/Link.svelte";
    import mapa from "$lib/images/mapa.svg"
    import logo from "$lib/images/C DE COMERCIO LOGO.svg"
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
        <div class="title">
            <div class="que"><p>¿Que</p></div>
            <div class="se"><p>SE</p></div>
            <div class="vende"><p>VENDE</p></div>
            <div class="en"><p>en ...</p></div>
            <div class="abeja"><iconify-icon icon="fluent-emoji-high-contrast:honeybee" width="16vw" height="16vw"></iconify-icon></div>
        </div>
        <div class="visuals">
            <h1>Guadalajara</h1>
            <img src={mapa} alt="mapa de la ciudad">
            <div class="heroDescription">
                La C de Comercios es un espacio que reúne todos los productos que se venden en tu ciudad.
            </div>
        </div>
    </section>
</AnimatedElement>

<AnimatedElement>
    <section class="misionSection">
        <div class="title">
            <h3>Nuestra misión es digitalizar, centralizar y exponer todos los negocios locales, permitiendo que cualquier persona disponga de un sitio web y un espacio para desarrollar su trabajo, ya sea vender un producto u ofrecer algún servicio.</h3>
        </div>
        <div class="visuals">
            <h1>Misión</h1>
            <img src={logo} alt="logo">
        </div>
    </section>
</AnimatedElement>

<AnimatedElement>
    <section class="howSection">
        <div class="visuals">
            <h1>¿Como funciona?</h1>
            <div class="mapIcon">
                <iconify-icon icon="tdesign:map-information-2" width="10rem" height="10rem"  style="color: white"></iconify-icon>
                <p>
                    cualquier persona pueda comprar y vender productos en su ciudad, comparar precios, marcas y modelos en un solo sitio.
                </p>
            </div>
            <div class="comunityIcon">
                <iconify-icon icon="game-icons:team-idea" width="10rem" height="10rem"  style="color: white"></iconify-icon>
                <p>
                    C de Comercios busca virtualizar el comercio pequeño, informal es que generan los, Artesanos, Diseñadores, Artistas, Pequeños empresarios, “Pymes”, Estudiantes, Freelancers, Marcas independientes.
                </p>
            </div>
        </div>
    </section>
</AnimatedElement>

<AnimatedElement>
    <section class="buySection">
        <div class="visuals">
            <h1>
                No esperes mas!
                <p>Empieza a comprar comodamente</p>
                todo lo que necesitas en C de Comercio!
            </h1>
        </div>
        <div class="title">
            <h1>Beneficios</h1>
            <ul>
                <li>
                    Como son productos locales, los puedes obtener el mismo dia.
                </li>
                <li>
                    C de comercios tendrá un lugar físico en distintos puntos de tu ciudad y contará con el servicio de logística.
                </li>
                <li>
                    Deseas algun producto o servicio? Decide si recibir el producto en tu hogar o hacer pickup.
                </li>
                <li>
                    Ofreces algun producto o servicio? Decide si llevar el producto por su cuenta o si desea usar el servicio de logística.
                </li>
            </ul>
            
            <button>Buscar productos y servicios</button>
        </div>
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
.title {
    display: grid;
    grid-template-rows: repeat(12, minmax(1rem, auto));
    grid-template-columns: repeat(12, minmax(1rem, auto));
}
.visuals {
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

.misionSection {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.misionSection h1 {
    grid-area: 1 / 1 / 7 / -1;
    justify-self: center;
    align-self:self-end;
    font-size: 450%;
}
.misionSection img {
    grid-area: 4 / 1 / -1 / -1;
    justify-self: center;
    align-self: center;
    width: 20rem;
}
.misionSection h3 {
    grid-area: 1 / 1 / -1 / -1;
    align-self: center;
    justify-self: center;
    line-height: 1.8rem;
    font-size: x-large;
    background-color: var(--primary-color);
    border-radius: 2rem;
    padding: 2rem;
    filter: drop-shadow(10px 10px 5px black);
}


.howSection {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.howSection h1 {
    grid-area: 1 / 1 / 4 / -1;
    align-self: flex-end;
    font-size: 300%;
}
.comunityIcon {
    grid-area: 7 / 1 / -1 / 7;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
.comunityIcon p {
    line-height: 1.6rem;
    font-size: large;
    align-self: flex-start;
    background-color: var(--primary-color);
    border-radius: 2rem;
    padding: 2rem;
    filter: drop-shadow(10px 10px 5px black);
    height: 15rem;
}
.mapIcon {
    grid-area: 7 / 9 / -1 / -1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
.mapIcon p {
    line-height: 1.6rem;
    font-size: large;
    align-self: flex-start;
    background-color: var(--primary-color);
    border-radius: 2rem;
    padding: 2rem;
    filter: drop-shadow(10px 10px 5px black);
    height: 15rem;
}

.buySection {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}
.buySection h1 {
    grid-area: 4 / 1 / 5 / -1;
    font-size: 350%;
    line-height: 4rem;
    font-weight: 500;
}
.buySection h1 p{
    font-weight: 100;
    line-height: 4rem;
}
.buySection ul{
    grid-area: 5 / 1 / 6 / -1;
    padding: 2rem;
    background-color: var(--primary-color);
    border-radius: 2rem;
    padding: 3rem;
    filter: drop-shadow(10px 10px 5px black);
    height: auto;
}
.buySection ul li {
    padding-bottom: 1rem;
    line-height: 1rem;
    list-style:georgian;
    font-weight: 200;
    font-size: large;
}

.buySection button {
    grid-area: 6 / 1 / 7 / -1;
    margin-top: 1rem;
    background-color: var(--complementary-color);
    border-radius: 2rem;
    filter: drop-shadow(10px 10px 5px black);
    color: var(--text-color-wb);
    transition: all 0.3s;
    font-weight: normal;
    word-spacing: 0.2rem;
    letter-spacing: 0.2rem;
    height: 3rem;
}
.buySection button:hover {
    font-size: larger;
}
</style>