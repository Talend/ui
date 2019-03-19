import { mergedColumnsChooser, compareOrder } from './columnChooser.utils';

describe('mergedColumnsChooser', () => {
	const originalCOllection = [
		{
			label: 'label1',
			metadata: 'metadata1',
		},
		{
			label: 'label2',
			metadata: 'metadata2',
		},
		{
			label: 'label3',
			metadata: 'metadata3',
		},
	];
	it('return a the collection merger', () => {
		// given
		const columnChooserCollection = [
			{
				label: 'label1',
				moreStuff: true,
			},
			{
				label: 'label2',
				moreStuff: true,
			},
			{
				label: 'label3',
				moreStuff: true,
			},
		];
		// when
		const ret = mergedColumnsChooser(originalCOllection, columnChooserCollection);
		// then
		expect(ret).toEqual([
			{ label: 'label1', metadata: 'metadata1', moreStuff: true },
			{ label: 'label2', metadata: 'metadata2', moreStuff: true },
			{ label: 'label3', metadata: 'metadata3', moreStuff: true },
		]);
	});
	it('should return the original collection', () => {
		// given nothing
		// when
		const ret = mergedColumnsChooser(originalCOllection);
		// then
		expect(ret).toBe(originalCOllection);
	});
});

describe('compareOrder', () => {
	it('should sort the collection by order', () => {
		// given
		const collection = [
			{
				order: 3,
			},
			{
				order: 1,
			},
			{
				order: 2,
			},
			{
				order: 5,
			},
			{
				order: 4,
			},
		];
		// when
		collection.sort(compareOrder);
		// then
		expect(collection).toEqual([
			{ order: 1 },
			{ order: 2 },
			{ order: 3 },
			{ order: 4 },
			{ order: 5 },
		]);
	});
});
