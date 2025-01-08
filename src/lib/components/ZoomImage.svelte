<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let imageSrc: string; // Source de l'image
	export let scale = 1; // Échelle initiale
	export let zoomStep = 0.5; // Incrément de zoom
	export let minScale = 0.5; // Échelle minimale
	export let maxScale = 4; // Échelle maximale

	let imageContainer: HTMLElement | null = null;
	const dispatch = createEventDispatcher(); // Permet d'envoyer des événements au parent

	const handleWheelZoom = (e: WheelEvent) => {
		e.preventDefault();

		if (!imageContainer) return;

		const rect = imageContainer.getBoundingClientRect();
		const offsetX = (e.clientX - rect.left) / rect.width;
		const offsetY = (e.clientY - rect.top) / rect.height;

		imageContainer.style.transformOrigin = `${offsetX * 100}% ${offsetY * 100}%`;

		const zoomDirection = e.deltaY < 0 ? 1 : -1;
		scale = Math.min(Math.max(scale + zoomStep * zoomDirection, minScale), maxScale);

		// Envoyer la nouvelle valeur de scale au parent
		dispatch('scaleChange', { scale });
	};

	onMount(() => {
		if (imageContainer) {
			imageContainer.addEventListener('wheel', handleWheelZoom);
		}

		return () => {
			if (imageContainer) {
				imageContainer.removeEventListener('wheel', handleWheelZoom);
			}
		};
	});
</script>

<div
	bind:this={imageContainer}
	class="relative h-full w-full overflow-hidden"
	style="transform: scale({scale}); transform-origin: center; transition: transform 0.2s ease;"
>
	<img src={imageSrc} alt="Zoomable" class="mx-auto" />
</div>
