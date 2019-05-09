import { filterCollectionByText } from './helpers';

describe('filterCollectionByText', () => {
	const collection = [
		{
			firstName: 'Watkins',
			lastName: 'Fry',
			number: 0,
		},
		{
			firstName: 'Fannie',
			lastName: 'Carver',
			number: 1,
		},
		{
			firstName: 'Madden',
			lastName: 'Silva',
			number: 2,
		},
		{
			firstName: 'Ferrell',
			lastName: 'Jacobs',
			number: 3,
		},
		{
			firstName: 'Carly',
			lastName: 'Dorsey',
			number: 4,
		},
	];

	it('should do nothing if no text filter has been provided', () => {
		// when
		const result = filterCollectionByText(collection);

		// then
		expect(result).toEqual(collection);
	});

	it('filter the collection case-insensitively', () => {
		// given
		const textFilter = 'L';

		// when
		const result = filterCollectionByText(collection, textFilter);

		// then
		expect(result.length).toEqual(3);
	});
});
