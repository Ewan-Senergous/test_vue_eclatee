<script lang="ts">
	import type { Part } from '$lib/data/partsData';

	export let partsData: Part[];

	let container: HTMLElement;
	let imageX = 0;
	let imageY = 0;
	let scale = 1;
	const zoomStep = 0.5;
	const minScale = 0.5;
	const maxScale = 4;
	let isDragging = false;
	let startX = 0;
	let startY = 0;
	let lastX = 0;
	let lastY = 0;

	const handleDragStart = (e: MouseEvent) => {
		isDragging = true;
		startX = e.clientX - lastX;
		startY = e.clientY - lastY;
	};

	const handleDragMove = (e: MouseEvent) => {
		if (isDragging) {
			lastX = e.clientX - startX;
			lastY = e.clientY - startY;
			imageX = lastX;
			imageY = lastY;
		}
	};

	const handleDragEnd = () => {
		isDragging = false;
	};

	const handleWheelZoom = (e: WheelEvent) => {
		e.preventDefault();

		const rect = container.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;

		const zoomDirection = e.deltaY < 0 ? 1 : -1;
		const prevScale = scale;
		scale = Math.min(Math.max(scale + zoomStep * zoomDirection, minScale), maxScale);

		const scaleRatio = scale / prevScale;
		const newX = mouseX - (mouseX - imageX) * scaleRatio;
		const newY = mouseY - (mouseY - imageY) * scaleRatio;

		imageX = newX;
		imageY = newY;
		lastX = newX;
		lastY = newY;
	};

	const zoomIn = () => {
		const prevScale = scale;
		scale = Math.min(scale + zoomStep, maxScale);

		const scaleRatio = scale / prevScale;
		const centerX = container.clientWidth / 2;
		const centerY = container.clientHeight / 2;

		imageX = centerX - (centerX - imageX) * scaleRatio;
		imageY = centerY - (centerY - imageY) * scaleRatio;
		lastX = imageX;
		lastY = imageY;
	};

	const zoomOut = () => {
		const prevScale = scale;
		scale = Math.max(scale - zoomStep, minScale);

		const scaleRatio = scale / prevScale;
		const centerX = container.clientWidth / 2;
		const centerY = container.clientHeight / 2;

		imageX = centerX - (centerX - imageX) * scaleRatio;
		imageY = centerY - (centerY - imageY) * scaleRatio;
		lastX = imageX;
		lastY = imageY;
	};
</script>

<div
	bind:this={container}
	class="relative h-[calc(100vh-8rem)] w-full overflow-hidden"
	role="button"
	tabindex="0"
	aria-label="Vue éclatée interactive"
	on:mousedown={handleDragStart}
	on:mousemove={handleDragMove}
	on:mouseup={handleDragEnd}
	on:mouseleave={handleDragEnd}
	on:wheel={handleWheelZoom}
>
	<div
		class="absolute"
		style="transform: translate({imageX}px, {imageY}px) scale({scale}); transform-origin: 0 0;"
	>
		<img src="/exploded_view_1.png" alt="Vue éclatée" class="block select-none" draggable="false" />

		{#each partsData as part}
			<div
				class="absolute"
				style="top: {part.y}px; left: {part.x}px; width: 60px; height: 30px; transform: translate(-50%, -50%);"
			>
				<div class="h-full w-full rounded border-4 border-blue-500 opacity-40"></div>
			</div>
		{/each}
	</div>
</div>

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
