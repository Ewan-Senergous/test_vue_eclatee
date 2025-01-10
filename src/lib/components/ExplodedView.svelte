<script lang="ts">
	import { onMount } from 'svelte';
	import MoveImage from '$lib/components/MoveImage.svelte';
	import { partsData } from '$lib/data/partsData';
	import { attachClickListenerToImage } from '$lib/utils/coordinates';

	onMount(() => {
		attachClickListenerToImage('img');
	});
</script>

<div>
	<MoveImage {partsData} />
</div>
