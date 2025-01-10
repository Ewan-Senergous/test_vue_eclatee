<script lang="ts">
	import { onMount } from 'svelte';
	import MoveImage from '$lib/components/MoveImage.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { partsData } from '$lib/data/partsData';
	import type { Part } from '$lib/data/partsData';
	import { attachClickListenerToImage } from '$lib/utils/coordinates';

	let selectedPart: Part | null = null;

	const handlePartClick = (part: Part): void => {
		selectedPart = part;
	};

	onMount(() => {
		attachClickListenerToImage('img');
	});
</script>

<div class="flex">
	<Sidebar {selectedPart} />
	<div class="flex-1">
		<MoveImage {partsData} onPartClick={handlePartClick} />
	</div>
</div>
