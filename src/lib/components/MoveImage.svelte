<script lang="ts">
	import { onMount } from 'svelte';
	import type { Part } from '$lib/data/partsData';

	export let partsData: Part[]; // Les données des pièces annotées

	let imageContainer: HTMLElement | null = null;
	let offsetX = 0;
	let offsetY = 0;
	let isDragging = false;
	let startX = 0;
	let startY = 0;
	let scale = 1; // Niveau de zoom
	let zoomStep = 0.5;
	let minScale = 0.5;
	let maxScale = 3;

	// Gestion du début de glissement
	const handleDragStart = (e: MouseEvent) => {
		isDragging = true;
		startX = e.clientX - offsetX;
		startY = e.clientY - offsetY;
	};

	// Gestion du mouvement de glissement
	const handleDragMove = (e: MouseEvent) => {
		if (isDragging) {
			offsetX = e.clientX - startX;
			offsetY = e.clientY - startY;
		}
	};

	// Fin du glissement
	const handleDragEnd = () => {
		isDragging = false;
	};

	// Gestion du zoom (molette)
	const handleWheelZoom = (e: WheelEvent) => {
		e.preventDefault();
		const zoomDirection = e.deltaY < 0 ? 1 : -1;
		scale = Math.min(Math.max(scale + zoomStep * zoomDirection, minScale), maxScale);
	};

	// Gestion du zoom avec les boutons
	const zoomIn = () => {
		scale = Math.min(scale + zoomStep, maxScale);
	};

	const zoomOut = () => {
		scale = Math.max(scale - zoomStep, minScale);
	};
</script>

<div
	bind:this={imageContainer}
	class="image-container relative h-full w-full overflow-hidden"
	role="button"
	tabindex="0"
	aria-label="Image de vue éclatée interactive"
	on:mousedown={handleDragStart}
	on:mousemove={handleDragMove}
	on:mouseup={handleDragEnd}
	on:mouseleave={handleDragEnd}
	on:wheel={handleWheelZoom}
	style="transform: translate({offsetX}px, {offsetY}px) scale({scale}); transform-origin: center;"
>
	<img src="/exploded_view_1.png" alt="Vue éclatée" class="block" draggable="false" />

	<!-- Rectangles entourant les numéros -->
	{#each partsData as part}
		<div
			class="absolute"
			style="top: {part.y}px; left: {part.x}px; width: 60px; height: 30px; transform: translate(-50%, -50%);"
		>
			<div class="h-full w-full rounded border-4 border-blue-500 opacity-40"></div>
		</div>
	{/each}
</div>

<!-- Boutons de zoom -->
<div
	class="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform items-center gap-4 rounded-lg bg-gray-700 bg-opacity-80 p-2 text-white"
>
	<button class="rounded bg-gray-600 p-2 hover:bg-gray-500" on:click={zoomOut}> - </button>
	<span class="text-sm">{Math.round(scale * 100)}%</span>
	<button class="rounded bg-gray-600 p-2 hover:bg-gray-500" on:click={zoomIn}> + </button>
</div>

<style>
	.image-container {
		cursor: grab;
	}
	.image-container:active {
		cursor: grabbing;
	}
</style>
