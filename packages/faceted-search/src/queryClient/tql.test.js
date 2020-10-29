import { createTqlQuery } from './tql';

describe('createTqlQuery', () => {
	const badges = [
		{
			properties: {
				attribute: 'name',
				operator: {
					label: 'Contains',
					name: 'contains',
					iconName: 'contains',
				},
				value: 'test-badge',
			},
		},
		{
			properties: {
				attribute: 'name',
				operator: {
					label: 'Equal',
					name: 'equals',
					iconName: 'equal',
				},
				value: 'another-badge\n\n',
			},
		},
	];
	it('should return an empty string when the faceted query is an empty string', () => {
		// Given
		const facetedQuery = '';
		// When
		const result = createTqlQuery(facetedQuery);
		// Then
		expect(result).toBe('');
	});
	it('should return an empty string when the faceted query is undefined', () => {
		// Given
		const facetedQuery = undefined;
		// When
		const result = createTqlQuery(facetedQuery);
		// Then
		expect(result).toBe('');
	});
	it('should return an empty string when there is no badges', () => {
		// Given nothing
		// When
		const result = createTqlQuery([]);
		// Then
		expect(result).toEqual('');
	});
	it('should return a tql query (text is trimmed)', () => {
		// Given
		const badgesParam = badges;
		// When
		const result = createTqlQuery(badgesParam);
		// Then
		expect(result).toEqual("(name contains 'test-badge') and (name = 'another-badge')");
	});
	it('should return an empty string if there is one badge and value is empty', () => {
		// Given
		const badge = [
			{
				properties: {
					attribute: 'name',
					operator: {
						label: 'Contains',
						name: 'contains',
						iconName: 'contains',
					},
					value: '',
				},
			},
		];
		// When
		const result = createTqlQuery(badge);
		// Then
		expect(result).toEqual('');
	});
	it('should return a tql query removing all badge with an empty value', () => {
		// Given
		const badgesWithOneValue = [
			{
				properties: {
					attribute: 'name',
					operator: {
						label: 'Contains',
						name: 'contains',
						iconName: 'contains',
					},
					value: '',
				},
			},
			{
				properties: {
					attribute: 'name',
					operator: {
						label: 'Equal',
						name: 'equals',
						iconName: 'equal',
					},
					value: 'another-badge\n\n',
				},
			},
		];
		// When
		const result = createTqlQuery(badgesWithOneValue);
		// Then
		expect(result).toEqual("(name = 'another-badge')");
	});
	it('should return a tql query with a in operator and multiple selection', () => {
		// Given
		const badgesWithMultipleValues = [
			{
				properties: {
					attribute: 'connection.type',
					initialValueOpened: false,
					operator: {
						label: 'In',
						name: 'in',
					},
					type: 'select',
					value: [
						{
							id: 'hdfs',
							label: 'HDFS',
							checked: true,
						},
						{
							id: 'localcon',
							label: 'Local connection',
							checked: true,
						},
						{
							id: 'aws_kinesis',
							label: 'AWS kinesis',
							checked: true,
						},
					],
				},
			},
		];
		// When
		const result = createTqlQuery(badgesWithMultipleValues);
		// Then
		expect(result).toEqual("(connection.type in ['hdfs', 'localcon', 'aws_kinesis'])");
	});
	it('should return an empty tql query', () => {
		// Given
		const badgesWithMultipleValues = [
			{
				properties: {
					attribute: 'connection.type',
					operator: {
						label: 'In',
						name: 'in',
					},
					type: 'select',
					value: [
						{
							id: '',
							label: 'HDFS',
							checked: true,
						},
					],
				},
			},
		];
		// When
		const result = createTqlQuery(badgesWithMultipleValues);
		// Then
		expect(result).toEqual('');
	});
	it('should return an empty tql query', () => {
		// Given
		const badgesWithMultipleValues = [
			{
				properties: {
					attribute: 'connection.type',
					operator: {
						label: 'In',
						name: 'in',
					},
					type: 'select',
					value: [
						{
							id: '',
							label: 'HDFS',
							checked: true,
						},
					],
				},
			},
		];
		// When
		const result = createTqlQuery(badgesWithMultipleValues);
		// Then
		expect(result).toEqual('');
	});
	it('should return an empty tql query when value is totally empty', () => {
		// Given
		const badgesWithMultipleValues = [
			{
				properties: {
					attribute: 'connection.type',
					operator: {
						label: 'In',
						name: 'in',
					},
					type: 'select',
					value: [],
				},
			},
		];
		// When
		const result = createTqlQuery(badgesWithMultipleValues);
		// Then
		expect(result).toEqual('');
	});
	it('should return an unequal tql query when value is using the notEqual operator', () => {
		// Given
		const badgeNotEqual = [
			{
				properties: {
					attribute: 'name',
					operator: {
						label: 'Not equals',
						name: 'notEquals',
						iconName: 'not-equal',
					},
					value: 'product name',
				},
			},
		];
		// When
		const result = createTqlQuery(badgeNotEqual);
		// Then
		expect(result).toEqual("(name != 'product name')");
	});
	it('should return an unequal tql query when value is using the greaterThan operator', () => {
		// Given
		const badgeNotEqual = [
			{
				properties: {
					attribute: 'price',
					operator: {
						label: 'Greater than',
						name: 'greaterThan',
						iconName: 'greater-than',
					},
					value: 2298.23,
				},
			},
		];
		// When
		const result = createTqlQuery(badgeNotEqual);
		// Then
		expect(result).toEqual('(price > 2298.23)');
	});
	it('should return an unequal tql query when value is using the greaterThanOrEquals operator', () => {
		// Given
		const badgeNotEqual = [
			{
				properties: {
					attribute: 'price',
					operator: {
						label: 'Greater than or equal',
						name: 'greaterThanOrEquals',
						iconName: 'greater-than-equal',
					},
					value: 12.9823,
				},
			},
		];
		// When
		const result = createTqlQuery(badgeNotEqual);
		// Then
		expect(result).toEqual('(price >= 12.9823)');
	});
	it('should return an unequal tql query when value is using the lessThan operator', () => {
		// Given
		const badgeNotEqual = [
			{
				properties: {
					attribute: 'price',
					operator: {
						label: 'Less than',
						name: 'lessThan',
						iconName: 'less-than',
					},
					value: 20938.20938,
				},
			},
		];
		// When
		const result = createTqlQuery(badgeNotEqual);
		// Then
		expect(result).toEqual('(price < 20938.20938)');
	});
	it('should return an unequal tql query when value is using the lessThanOrEquals operator', () => {
		// Given
		const badgeNotEqual = [
			{
				properties: {
					attribute: 'price',
					operator: {
						label: 'Less than or equal',
						name: 'lessThanOrEquals',
						iconName: 'less-than-equal',
					},
					value: 20982309892.23,
				},
			},
		];
		// When
		const result = createTqlQuery(badgeNotEqual);
		// Then
		expect(result).toEqual('(price <= 20982309892.23)');
	});
	it('should handle a NaN number value as an invalid value', () => {
		// Given
		const badge = [
			{
				properties: {
					attribute: 'price',
					operator: {
						label: 'Equal',
						name: 'equals',
						iconName: 'equal',
					},
					value: NaN,
				},
			},
		];
		// When
		const result = createTqlQuery(badge);
		// Then
		expect(result).toEqual('');
	});
	it('should handle a zero number value', () => {
		// Given
		const badge = [
			{
				properties: {
					attribute: 'price',
					operator: {
						label: 'Equal',
						name: 'equals',
						iconName: 'equal',
					},
					value: 0,
				},
			},
		];
		// When
		const result = createTqlQuery(badge);
		// Then
		expect(result).toEqual('(price = 0)');
	});
	it('should handle a negative number value', () => {
		// Given
		const badge = [
			{
				properties: {
					attribute: 'price',
					operator: {
						label: 'Equal',
						name: 'equals',
						iconName: 'equal',
					},
					value: -12098029830,
				},
			},
		];
		// When
		const result = createTqlQuery(badge);
		// Then
		expect(result).toEqual('(price = -12098029830)');
	});
	it('should handle a float number value', () => {
		// Given
		const badge = [
			{
				properties: {
					attribute: 'price',
					operator: {
						label: 'Equal',
						name: 'equals',
						iconName: 'equal',
					},
					value: 293820983098.23,
				},
			},
		];
		// When
		const result = createTqlQuery(badge);
		// Then
		expect(result).toEqual('(price = 293820983098.23)');
	});
	it('should return an containsIgnoreCase tql query when value is using the containsIgnoreCase operator', () => {
		// Given
		const badgeContainsIgnoreCase = [
			{
				properties: {
					attribute: 'Title',
					operator: {
						label: 'Contains',
						name: 'containsIgnoreCase',
						iconName: 'contains',
					},
					value: 'Dataset Title',
				},
			},
		];
		// When
		const result = createTqlQuery(badgeContainsIgnoreCase);
		// Then
		expect(result).toEqual("(Title containsIgnoreCase 'Dataset Title')");
	});
	it('should handle a pattern operator', () => {
		// Given
		const badge = [
			{
				properties: {
					attribute: 'name',
					operator: {
						name: 'complies',
					},
					value: '[aaa]',
				},
			},
		];
		// When
		const result = createTqlQuery(badge);
		// Then
		expect(result).toEqual("(name complies '[aaa]')");
	});
	it('should handle a word pattern operator', () => {
		// Given
		const badge = [
			{
				properties: {
					attribute: 'name',
					operator: {
						name: 'wordComplies',
					},
					value: '[word]',
				},
			},
		];
		// When
		const result = createTqlQuery(badge);
		// Then
		expect(result).toEqual("(name wordComplies '[word]')");
	});
});
