import { createFacetedBadgeDefinition } from './badgeDefinition.type';

describe('types/badgeDefinition', () => {
	describe('createFacetedBadgeDefinition', () => {
		const defaultRawObject = {
			attribute: 'badgeName',
			initialOpenedOperator: true,
			initialOpenedValue: false,
			label: 'badgeLabel',
			operator: {},
			operators: [],
			type: 'text',
			metadata: {
				badgeId: 'badgeId',
				badgesPerFacet: 1,
				entitiesPerBadge: 'N',
			},
		};

		it('Should create a badge definition when argument is not defined', () => {
			const received = createFacetedBadgeDefinition(undefined);
			expect(received).toMatchObject({
				properties: {
					attribute: '',
					initialOpenedOperator: false,
					initialOpenedValue: false,
					label: '',
					operator: {},
					operators: [],
					type: '',
				},
				metadata: {
					badgeId: '',
					badgesPerFacet: 1,
					entitiesPerBadge: 'N',
				},
			});
		});

		it('Should create a badge definition from raw object', () => {
			expect(createFacetedBadgeDefinition(defaultRawObject)).toMatchObject({
				properties: expect.objectContaining({
					attribute: 'badgeName',
					initialOperatorOpened: true,
					initialValueOpened: false,
					label: 'badgeLabel',
					operator: {},
					operators: [],
					type: 'text',
				}),
				metadata: { badgeId: 'badgeId', badgesPerFacet: 1, entitiesPerBadge: 'N' },
			});
		});

		it('Should not pass raw object properties not in badge definition template', () => {
			const addedProperties = { customProp: 'customValue' };
			const rawObject = { ...defaultRawObject, ...addedProperties };
			expect(createFacetedBadgeDefinition(rawObject)).not.toMatchObject(addedProperties);
		});

		it('Should move operators to metadata', () => {
			const rawObject = { ...defaultRawObject, operators: ['operator'] };
			expect(createFacetedBadgeDefinition(rawObject)).toMatchObject({
				properties: {
					operators: [],
				},
				metadata: {
					operators: ['operator'],
				},
			});
		});

		it('Should pass all metadata from raw object to metadata property', () => {
			const customMetadata = 'value';
			const rawObject = {
				...defaultRawObject,
				metadata: { ...defaultRawObject.metadata, customMetadata },
			};
			expect(createFacetedBadgeDefinition(rawObject)).toMatchObject({
				metadata: {
					customMetadata,
				},
			});
		});

		it('Should flatten typeProperties into properties', () => {
			const typeProperties = {
				customTypeProperty: 'customTypePropertyValue',
			};
			const rawObject = {
				...defaultRawObject,
				typeProperties,
			};
			expect(createFacetedBadgeDefinition(rawObject)).toMatchObject({
				properties: {
					...typeProperties,
				},
			});
		});
	});
});
