<script lang="ts">
	import { onMount } from 'svelte';
	import type { Part } from '$lib/data/partsData';
	import { partsData } from '$lib/data/partsData';
	import { attachClickListenerToImage } from '$lib/utils/coordinates';

	let hoveredPart: Part | null = null;
	let imageContainer: HTMLElement | null = null;
	let scale = 1; // Échelle de zoom initiale
	let zoomStep = 0.5; // Incrément de zoom
	let minScale = 0.5; // Échelle minimale
	let maxScale = 3; // Échelle maximale

	const handleMouseOver = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		const partId = target.getAttribute('data-part-id');
		if (partId) {
			hoveredPart = partsData.find((part) => part.id === Number(partId)) || null;
		}
	};

	const handleMouseOut = () => {
		hoveredPart = null;
	};

	const handleWheelZoom = (e: WheelEvent) => {
		e.preventDefault();
		const zoomDirection = e.deltaY < 0 ? 1 : -1;
		scale = Math.min(Math.max(scale + zoomStep * zoomDirection, minScale), maxScale);
	};

	onMount(() => {
		attachClickListenerToImage('img');
		if (imageContainer) {
			imageContainer.addEventListener('mouseover', handleMouseOver);
			imageContainer.addEventListener('mouseout', handleMouseOut);
			imageContainer.addEventListener('wheel', handleWheelZoom);
		}

		return () => {
			if (imageContainer) {
				imageContainer.removeEventListener('mouseover', handleMouseOver);
				imageContainer.removeEventListener('mouseout', handleMouseOut);
				imageContainer.removeEventListener('wheel', handleWheelZoom);
			}
		};
	});
</script>

<div class="relative h-full w-full overflow-hidden">
	<!-- Conteneur avec transformation pour zoom -->
	<div
		bind:this={imageContainer}
		class="relative inline-block"
		style="transform: scale({scale}); transform-origin: center; transition: transform 0.2s ease;"
	>
		<img src="/exploded_view_1.png" alt="Vue éclatée" class="mx-auto" />

		{#each partsData as part}
			<div
				class="group absolute"
				data-part-id={part.id}
				style="top: {part.y}px; left: {part.x}px; width: 60px; height: 30px; transform: translate(-50%, -50%);"
			>
				<div
					class="h-full w-full rounded border-4 border-blue-500 opacity-20 group-hover:opacity-40"
					data-part-id={part.id}
				></div>
			</div>
		{/each}
	</div>

	<!-- Tooltip -->
	{#if hoveredPart}
		<div
			class="absolute rounded-lg border border-gray-300 bg-white p-2 text-sm shadow-lg"
			style="top: {hoveredPart.y}px; left: {hoveredPart.x + 50}px;"
		>
			<strong class="text-gray-800">{hoveredPart.name}</strong>
			<br />
			<span class="text-gray-500">Code fournisseur : {hoveredPart.supplierCode}</span>
		</div>
	{/if}

	<div
		class="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform items-center gap-4 rounded-lg bg-gray-700 bg-opacity-80 p-2 text-white"
	>
		<button
			class="rounded bg-gray-600 p-2 hover:bg-gray-500"
			on:click={() => (scale = Math.max(scale - zoomStep, minScale))}
		>
			-
		</button>
		<span class="text-sm">{Math.round(scale * 100)}%</span>
		<button
			class="rounded bg-gray-600 p-2 hover:bg-gray-500"
			on:click={() => (scale = Math.min(scale + zoomStep, maxScale))}
		>
			+
		</button>
	</div>
</div>
