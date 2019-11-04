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
					name: '=',
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
						name: '=',
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
});
