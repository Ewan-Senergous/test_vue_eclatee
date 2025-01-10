<script lang="ts">
	import type { Part } from '$lib/data/partsData';

	export let selectedPart: Part | null = null;
</script>

<div class="fixed left-0 top-0 h-full w-64 overflow-y-auto bg-gray-100 p-4 shadow-lg">
	{#if selectedPart}
		<h2 class="mb-4 text-xl font-bold">Détails de la pièce</h2>
		<div class="mb-2">
			<strong>Nom :</strong>
			{selectedPart.name}
		</div>
		<div>
			<strong>Code Fournisseur :</strong>
			{selectedPart.supplierCode}
		</div>
	{:else}
		<p class="text-gray-500">Cliquez sur une pièce pour voir les détails.</p>
	{/if}
</div>

<style>
	div {
		font-family: Arial, sans-serif;
	}
</style>
