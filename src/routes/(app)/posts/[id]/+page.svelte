<script lang="ts">
    import type { PageData } from "./$types";
    import PostComponent from "$lib/components/PostComponent.svelte";
    import GridTile from "$lib/components/GridTile.svelte";
    import { pb } from "$lib/pocketbase";
    import type { Post } from "$lib/types";
    import type { RecordModel } from "pocketbase";
    import DescriptionToggle from "$lib/components/DescriptionToggle.svelte";
  
    export let data: PageData;

    let currentImageIndex = 0;
    $: highlightedImageSrc = data?.post?.media[currentImageIndex];

    function changeHighlightedImage(direction: String) {
      if (direction === 'next') {
        if (currentImageIndex + 1 < data?.post?.media.length) {
          currentImageIndex = currentImageIndex + 1;
        } else {
          currentImageIndex = 0;
        }
      } else {
        if (currentImageIndex === 0) {
          currentImageIndex = data?.post?.media.length - 1;
        } else {
          currentImageIndex = currentImageIndex - 1;
        }
      }
      console.log(currentImageIndex)
    }
  </script>
  
  <svelte:head>
    <title>
      {data.post ? data.post.title : "Post not found"}
    </title>
  </svelte:head>

  {#if data.post}
  <div class="flex flex-col md:flex-row">
    <div class="md:h-90 md:w-2/3">
      {#key highlightedImageSrc}
      <div class="relative h-4/5 bg-light">
        <GridTile
          title={data.post.title}
          price={data.post.price}
          post_id={data.post}
          image_id={highlightedImageSrc}
        />
        {#if data.post?.media.length > 1}
          <div class="absolute right-0 bottom-0 z-40 p-6 ">
            <button
              on:click={() => {
                changeHighlightedImage('back');
              }}
              class="border border-b border-t border-l border-black py-4 px-8"
            >
              <iconify-icon icon="ph:caret-left-bold"></iconify-icon>
            </button>
            <button
              on:click={() => {
                changeHighlightedImage('next');
              }}
              class="-ml-1 border border-black py-4 px-8">
              <iconify-icon icon="ph:caret-right-bold"></iconify-icon>
            </button>
          </div>
        {/if}
      </div>
      {/key}

      <div class="flex h-1/5 ">
        {#each data.post.media as media}
          <div
            class="h-full w-1/4 bg-white"
          >
            {#if $pb}
              <img
                src={$pb.getFileUrl(data.post, media)}
                alt="media"
              >
            {:else}
              <iconify-icon icon="ic:round-account-circle"></iconify-icon>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <div class="h-full p-6 md:w-1/3">
      <!-- {#each data.post.options as option}
        <div class="mb-8">
          <div class="mb-4 text-sm uppercase tracking-wide">{option.name}</div>
          <div class="flex">
            {#each option.values as value}
              <button
                on:click={() => {
                  selectedOptions = { ...selectedOptions, [option.name]: value };
                }}
                class={`${value.length <= 3 ? 'w-12' : 'px-2'} ${
                  selectedOptions[option.name] === value ? 'opacity-100' : 'opacity-60'
                } transition duration-300 ease-in-out hover:scale-110 hover:opacity-100 border-white h-12 mr-3 flex items-center justify-center rounded-full border`}
              >
                {value}
              </button>
            {/each}
          </div>
        </div>
      {/each} -->
      <p class="text-sm">{data.post.content}</p>
      <div class="mt-8 flex items-center justify-between">
        <div class="flex items-center">
          <div class="mr-1">
            <iconify-icon icon="openmoji:star"></iconify-icon>
          </div>
          <div class="mr-1">
            <iconify-icon icon="openmoji:star"></iconify-icon>
          </div>
          <div class="mr-1">
            <iconify-icon icon="openmoji:star"></iconify-icon>
          </div>
          <div class="mr-1">
            <iconify-icon icon="openmoji:star"></iconify-icon>
          </div>
          <div class="mr-1 opacity-50">
            <iconify-icon icon="openmoji:star"></iconify-icon>
          </div>
        </div>
        <div class="text-sm opacity-50">36 Reviews</div>
      </div>
      <button
        class="mt-6 flex w-full items-center justify-center bg-light p-4 text-sm uppercase tracking-wide text-black opacity-90 hover:opacity-100"
      >
        <span>Add To Cart</span>
        <!-- {#if cartLoading}
          <div class="lds-ring ml-4">
            <div />
            <div />
            <div />
            <div />
          </div>
        {/if} -->
      </button>
      <DescriptionToggle
        title="Care"
        description="This is a limited edition production run. Printing starts when the drop ends."
      />
      <DescriptionToggle
        title="Details"
        description="This is a limited edition production run. Printing starts when the drop ends. Reminder: Bad Boys For Life. Shipping may take 10+ days due to COVID-19."
      />
    </div>

    <!-- <div class="px-4 py-8">
      <div class="mb-4 text-3xl font-bold">Related Products</div>
      <ul class="grid grid-flow-row grid-cols-2 gap-4 md:grid-cols-4">
        {#each data.body.featuredProducts as product, i (product.node.id)}
          <li>
            <div
              class="group relative block aspect-square overflow-hidden border border-white/20 bg-zinc-800/50"
            >
              <GridTile
                removeLabels={true}
                imageSrc={product.node.images.edges[0].node.originalSrc}
                href={`/product/${product.node.handle}`}
              />
            </div>
          </li>
        {/each}
      </ul>
    </div>
     -->
  </div>
  {/if}
  
  <style>
    .lds-ring {
      display: inline-block;
      position: relative;
      width: 20px;
      height: 20px;
    }
    .lds-ring div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 16px;
      height: 16px;
      margin: 2px;
      border: 2px solid #000;
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: #000 transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
      animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
      animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
      animation-delay: -0.15s;
    }
    @keyframes lds-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  </style>