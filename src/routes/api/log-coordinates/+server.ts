import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { x, y } = await request.json();

	console.log(`Coordonnées reçues : x=${x}, y=${y}`);

	return new Response('Coordonnées reçues', { status: 200 });
};
