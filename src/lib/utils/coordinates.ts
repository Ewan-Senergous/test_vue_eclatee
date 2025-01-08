export async function attachClickListenerToImage(imageSelector: string): Promise<void> {
	const image = document.querySelector<HTMLImageElement>(imageSelector);
	if (image) {
		image.addEventListener('click', async (e: MouseEvent) => {
			const rect = image.getBoundingClientRect();
			const x = Math.round(e.clientX - rect.left); // Coordonnée X relative à l'image
			const y = Math.round(e.clientY - rect.top); // Coordonnée Y relative à l'image

			// Afficher dans la console du navigateur pour vérification
			console.log(`x: ${x}, y: ${y}`);

			// Envoyer les coordonnées à l'API interne
			await fetch('/api/log-coordinates', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ x, y })
			});
		});
	}
}
