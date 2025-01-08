export async function attachClickListenerToImage(imageSelector: string): Promise<void> {
	const image = document.querySelector<HTMLImageElement>(imageSelector);
	if (image) {
		image.addEventListener('click', async (e: MouseEvent) => {
			const rect = image.getBoundingClientRect();
			const x = Math.round(e.clientX - rect.left);
			const y = Math.round(e.clientY - rect.top);

			console.log(`x: ${x}, y: ${y}`);

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
