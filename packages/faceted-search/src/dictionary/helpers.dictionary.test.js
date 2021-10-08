import { removeOneOperator, filterBadgesDefinitionsWithOneContains } from './helpers.dictionary';

describe('removeOneOperator', () => {
	it('should remove a specific operator from a badge definition', () => {
		// given
		const badgesDefinition = {
			properties: {
				attribute: 'name',
				initialOperatorOpened: true,
				initialValueOpened: false,
				label: 'Name',
				operator: {},
				operators: [],
				type: 'text',
			},
			metadata: {
				badgePerFacet: 'N',
				entitiesPerBadge: '1',
				operators: ['contains', 'containsIgnoreCase', 'equals', 'notEquals', 'match a regexp'],
			},
		};

		// when
		const result = removeOneOperator(badgesDefinition, 'contains');
		// then
		expect(result).toEqual({
			properties: {
				attribute: 'name',
				initialOperatorOpened: true,
				initialValueOpened: false,
				label: 'Name',
				operator: {},
				operators: [],
				type: 'text',
			},
			metadata: {
				badgePerFacet: 'N',
				entitiesPerBadge: '1',
				operators: ['containsIgnoreCase', 'equals', 'notEquals', 'match a regexp'],
			},
		});
	});

	it('should return the whole badgeDefinition if operator to delete is not present', () => {
		// given
		const badgesDefinition = {
			properties: {
				attribute: 'name',
				initialOperatorOpened: true,
				initialValueOpened: false,
				label: 'Name',
				operator: {},
				operators: [],
				type: 'text',
			},
			metadata: {
				badgePerFacet: 'N',
				entitiesPerBadge: '1',
				operators: ['contains', 'containsIgnoreCase', 'notEquals', 'match a regexp'],
			},
		};

		// when
		const result = removeOneOperator(badgesDefinition, 'equals');
		// then
		expect(result).toEqual({
			properties: {
				attribute: 'name',
				initialOperatorOpened: true,
				initialValueOpened: false,
				label: 'Name',
				operator: {},
				operators: [],
				type: 'text',
			},
			metadata: {
				badgePerFacet: 'N',
				entitiesPerBadge: '1',
				operators: ['contains', 'containsIgnoreCase', 'notEquals', 'match a regexp'],
			},
		});
	});
});

describe('filterBadgesDefinitionsWithOneContains', () => {
	it('should remove a contains operator in badge text if there is a containsIgnoreCase', () => {
		// given
		const badgesDefinitions = [
			{
				properties: {
					attribute: 'name',
					operator: {},
					operators: [],
					type: 'text',
				},
				metadata: {
					operators: ['contains', 'containsIgnoreCase', 'equals', 'notEquals', 'match a regexp'],
				},
			},
			{
				properties: {
					attribute: 'price',
					operator: {},
					operators: [],
					type: 'number',
				},
				metadata: {
					operators: ['equals'],
				},
			},
		];

		// when
		const result = filterBadgesDefinitionsWithOneContains(badgesDefinitions);
		// then
		expect(result).toEqual([
			{
				properties: {
					attribute: 'name',
					operator: {},
					operators: [],
					type: 'text',
				},
				metadata: {
					operators: ['containsIgnoreCase', 'equals', 'notEquals', 'match a regexp'],
				},
			},
			{
				properties: {
					attribute: 'price',
					operator: {},
					operators: [],
					type: 'number',
				},
				metadata: {
					operators: ['equals'],
				},
			},
		]);
	});

	it('should do anything if there is not containsIgnoreCase operator', () => {
		// given
		const badgesDefinitions = [
			{
				properties: {
					attribute: 'name',
					operator: {},
					operators: [],
					type: 'text',
				},
				metadata: {
					operators: ['contains', 'equals', 'notEquals', 'match a regexp'],
				},
			},
		];

		// when
		const result = filterBadgesDefinitionsWithOneContains(badgesDefinitions);
		// then
		expect(result).toEqual([
			{
				properties: {
					attribute: 'name',
					operator: {},
					operators: [],
					type: 'text',
				},
				metadata: {
					operators: ['contains', 'equals', 'notEquals', 'match a regexp'],
				},
			},
		]);
	});
});
