import { sortCollection } from './filter';

describe('sortCollection', () => {
	const collection = [
		{
			firstName: 'Conner',
			lastName: 'Sloan',
			id: 0,
		},
		{
			firstName: 'Luann',
			lastName: 'Hancock',
			id: 1,
		},
		{
			firstName: 'Louisa',
			lastName: 'Holt',
			id: 2,
		},
		{
			firstName: 'Shelly',
			lastName: 'Sanchez',
			id: 3,
		},
		{
			firstName: 'Copeland',
			lastName: 'Dixon',
			id: 4,
		},
	];

	it('should sort a given collection according to provided criterias (ascending)', () => {
		// given
		const sortParams = {
			sortBy: 'firstName',
			isDescending: false,
		};

		// when
		const result = sortCollection(collection, sortParams);

		// then
		expect(result[0].firstName).toEqual('Conner');
		expect(result[1].firstName).toEqual('Copeland');
		expect(result[2].firstName).toEqual('Louisa');
		expect(result[3].firstName).toEqual('Luann');
		expect(result[4].firstName).toEqual('Shelly');
	});

	it('should sort a given collection according to provided criterias (ascending)', () => {
		// given
		const sortParams = {
			sortBy: 'firstName',
			isDescending: true,
		};

		// when
		const result = sortCollection(collection, sortParams);

		// then
		expect(result[0].firstName).toEqual('Shelly');
		expect(result[1].firstName).toEqual('Luann');
		expect(result[2].firstName).toEqual('Louisa');
		expect(result[3].firstName).toEqual('Copeland');
		expect(result[4].firstName).toEqual('Conner');
	});

	it('should not do anything if sorting criterias are missing', () => {
		// when
		const result = sortCollection(collection);

		// then
		expect(result[0].firstName).toEqual(collection[0].firstName);
		expect(result[1].firstName).toEqual(collection[1].firstName);
		expect(result[2].firstName).toEqual(collection[2].firstName);
		expect(result[3].firstName).toEqual(collection[3].firstName);
		expect(result[4].firstName).toEqual(collection[4].firstName);
	});
});
