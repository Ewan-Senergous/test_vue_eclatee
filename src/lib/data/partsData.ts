export interface Part {
	id: number;
	name: string;
	supplierCode: string;
	x: number;
	y: number;
}

export const partsData: Part[] = [
	{ id: 1, name: 'Pièce 1', supplierCode: '12345', x: 303, y: 358 },
	{ id: 2, name: 'Pièce 5', supplierCode: '67890', x: 184, y: 427 },
	{ id: 3, name: 'Pièce 8', supplierCode: '54321', x: 358, y: 321 }
];
