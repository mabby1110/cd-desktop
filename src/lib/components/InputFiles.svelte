<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    export let selectedFiles;

    const dispatch = createEventDispatcher();
    let dragOver = false;

    function handleDragEnter(event: DragEvent) {
        event.preventDefault();
        dragOver = true;
    }

    function handleDragLeave() {
        dragOver = false;
    }

    function handleDragOver(event: DragEvent) {
        event.preventDefault();
    }

    function handleDrop(event: DragEvent) {
        event.preventDefault();
        dragOver = false;
        
        if (event.dataTransfer && event.dataTransfer.files) {
            const droppedFiles = Array.from(event.dataTransfer.files);
            const filteredFiles = droppedFiles.filter(file => 
                file.type.startsWith('image/') || 
                file.type.startsWith('video/') || 
                file.type.startsWith('audio/')
            );
            
            $selectedFiles = filteredFiles;
            dispatch('filesDropped', { files: filteredFiles });
        }
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="drop-zone"
    class:drag-over={dragOver}
    on:dragenter={handleDragEnter}
    on:dragleave={handleDragLeave}
    on:dragover={handleDragOver}
    on:drop={handleDrop}
>
{#if $selectedFiles.length === 0}
    <p>Drag and drop media files here</p>
{:else}
    <ul>
    {#each $selectedFiles as file}
        <li>{file.name} ({file.type})</li>
    {/each}
    </ul>
{/if}
</div>

<style>
.drop-zone {
    border: 2px dashed #ccc;
    border-radius: 4px;
    padding: 20px;
    text-align: center;
    transition: background-color 0.3s ease;
}

.drag-over {
    background-color: #f0f0f0;
    border-color: #999;
}
</style>