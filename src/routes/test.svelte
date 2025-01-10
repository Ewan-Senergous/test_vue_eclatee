<script lang="ts">
	import type { Part } from '$lib/data/partsData';

	export let partsData: Part[]; // Les données des pièces annotées

	let imageX = 0; // Position horizontale absolue de l'image
	let imageY = 0; // Position verticale absolue de l'image
	let scale = 1; // Niveau de zoom
	const zoomStep = 0.5; // Pas de zoom
	const minScale = 0.5; // Zoom minimal
	const maxScale = 4; // Zoom maximal
	let isDragging = false; // Indique si l'image est en cours de glissement
	let dragStartX = 0; // Position initiale de la souris (x) pour le drag
	let dragStartY = 0; // Position initiale de la souris (y) pour le drag
	let imageStartX = 0; // Position initiale de l'image pour le drag
	let imageStartY = 0; // Position initiale de l'image pour le drag

	// Début du glissement (drag)
	const handleDragStart = (e: MouseEvent) => {
		isDragging = true;
		dragStartX = e.clientX;
		dragStartY = e.clientY;
		imageStartX = imageX;
		imageStartY = imageY;
	};

	// Mouvement de glissement (drag)
	const handleDragMove = (e: MouseEvent) => {
		if (isDragging) {
			imageX = imageStartX + (e.clientX - dragStartX);
			imageY = imageStartY + (e.clientY - dragStartY);
		}
	};

	// Fin du glissement (drag)
	const handleDragEnd = () => {
		isDragging = false;
	};

	// Gestion du zoom (avec la molette)
	const handleWheelZoom = (e: WheelEvent) => {
		e.preventDefault();

		// Position de la souris relative à l'image
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;

		// Calcul du facteur de zoom
		const zoomDirection = e.deltaY < 0 ? 1 : -1;
		const newScale = Math.min(Math.max(scale + zoomStep * zoomDirection, minScale), maxScale);

		// Ajustement des positions pour centrer le zoom sur la souris
		const scaleRatio = newScale / scale;
		imageX -= (mouseX - imageX) * (scaleRatio - 1);
		imageY -= (mouseY - imageY) * (scaleRatio - 1);

		scale = newScale;
	};

	// Gestion des boutons de zoom
	const zoomIn = () => {
		const newScale = Math.min(scale + zoomStep, maxScale);
		scale = newScale;
	};

	const zoomOut = () => {
		const newScale = Math.max(scale - zoomStep, minScale);
		scale = newScale;
	};
</script>

<!-- Conteneur interactif -->
<div
	role="button"
	tabindex="0"
	aria-label="Image interactive avec zoom et déplacement"
	on:mousedown={handleDragStart}
	on:mousemove={handleDragMove}
	on:mouseup={handleDragEnd}
	on:mouseleave={handleDragEnd}
	on:wheel={handleWheelZoom}
	style="overflow: hidden; width: 100%; height: 100vh; position: relative; cursor: grab;"
>
	<!-- Image zoomable et déplaçable -->
	<img
		src="/exploded_view_1.png"
		alt="Vue éclatée"
		draggable="false"
		style="position: absolute; left: {imageX}px; top: {imageY}px; transform: scale({scale}); transform-origin: top left;"
	/>

	<!-- Numéros annotés -->
	{#each partsData as part}
		<div
			class="absolute"
			style="top: calc({part.y}px * {scale} + {imageY}px); left: calc({part.x}px * {scale} + {imageX}px); width: 60px; height: 30px; transform: translate(-50%, -50%);"
		>
			<div class="h-full w-full rounded border-4 border-blue-500 opacity-40"></div>
		</div>
	{/each}
</div>

<!-- Boutons de zoom -->
<div
	class="fixed bottom-4 left-1/2 flex -translate-x-1/2 transform items-center gap-4 rounded-lg bg-gray-700 bg-opacity-80 p-2 text-white"
>
	<button class="rounded bg-gray-600 p-2 hover:bg-gray-500" on:click={zoomOut}> - </button>
	<span class="text-sm">{Math.round(scale * 100)}%</span>
	<button class="rounded bg-gray-600 p-2 hover:bg-gray-500" on:click={zoomIn}> + </button>
</div>

<style>
	img {
		cursor: grab;
	}
	img:active {
		cursor: grabbing;
	}
</style>
