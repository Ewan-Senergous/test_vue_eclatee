<script lang="ts">
	import { onMount } from 'svelte';
	import type { Part } from '$lib/data/partsData';
	import { partsData } from '$lib/data/partsData';
	import { attachClickListenerToImage } from '$lib/utils/coordinates';

	let hoveredPart: Part | null = null;
	let imageContainer: HTMLElement | null = null;

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

	onMount(() => {
		attachClickListenerToImage('img');
		if (imageContainer) {
			imageContainer.addEventListener('mouseover', handleMouseOver);
			imageContainer.addEventListener('mouseout', handleMouseOut);
		}

		return () => {
			if (imageContainer) {
				imageContainer.removeEventListener('mouseover', handleMouseOver);
				imageContainer.removeEventListener('mouseout', handleMouseOut);
			}
		};
	});
</script>

<div class="relative">
	<div
		bind:this={imageContainer}
		class="relative inline-block"
		style="width: auto; height: auto; position: relative;"
	>
		<!-- Image principale -->
		<img src="/exploded_view_1.png" alt="Vue éclatée" class="mx-auto" />

		<!-- Zones interactives -->
		{#each partsData as part}
			<div
				class="group absolute"
				data-part-id={part.id}
				style="top: {part.y}px; left: {part.x}px; width: 60px; height: 30px; transform: translate(-50%, -50%);"
			>
				<!-- Zone interactive en rectangle bleu -->
				<div
					class="h-full w-full rounded border-4 border-blue-500 opacity-20 group-hover:opacity-40"
					data-part-id={part.id}
				></div>
			</div>
		{/each}
	</div>

	<!-- Tooltip dynamique -->
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
</div>
