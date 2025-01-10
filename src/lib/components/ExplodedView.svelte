<script lang="ts">
	import { onMount } from 'svelte';
	import MoveImage from '$lib/components/MoveImage.svelte';
	import { partsData } from '$lib/data/partsData';

	onMount(() => {
		console.log('Attach listener to image for coordinates');
	});
</script>

<div>
	<MoveImage {partsData} />
</div>
