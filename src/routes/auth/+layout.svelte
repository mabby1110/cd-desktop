<script>
  import logo from "$lib/images/C DE COMERCIO LOGO.svg"
</script>

<main>
    <section class="authLayout">
      <h1>Unete al movimiento de liberacion mercantil</h1>
        <img src={logo} alt="" style="width: 20rem;">
        <p>
          Nuestra misión es digitalizar, centralizar y exponer todos los negocios locales, permitiendo que cualquier persona disponga de un sitio web y un espacio para desarrollar su trabajo, ya sea vender un producto u ofrecer algún servicio.
        </p>
    </section>

    <article>
        <slot />
    </article>
</main>

<style>
    main {
      height: 100vh;
      display: grid;
      grid-template-columns: repeat(1, 1fr);
    }
  
    article {
      display: flex;
      height: 100vh;
    }
    .authLayout {
    }
    .authLayout h1 p img {
      color: white;
      align-self: center;
      justify-self: center;
    }
    section {
      display: none;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      flex-direction: column;
      background-image: radial-gradient(
        circle at 200% 150%,
        black,
        var(--accent-color)
      );
      overflow: hidden;
    }
  
    h1 {
      color: var(--primary-color);
      font-size: 68px;
      padding: 0 0.5rem;
    }
  
    p {
      font-size: 16px;
      line-height: 20px;
      font-weight: 500;
    }
  
    @media (min-width: 550px) {
      main {
        grid-template-columns: 1fr 1fr;
      }
  
      section {
        display: flex;
      }
  
      p {
        width: 25ch;
      }
    }
  
    @media (min-width: 700px) {
      main {
        /* grid-template-columns: 0.8fr 1.2fr; */
        grid-template-columns: 1.2fr 0.8fr;
      }
  
      p {
        width: 38ch;
      }
    }
  </style>