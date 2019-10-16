/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { mount } from 'enzyme';

import { BasicSearch } from './BasicSearch.component';
import { FacetedManager } from '../FacetedManager';

describe('BasicSearch', () => {
	const initialFacetedBadges = [
		{
			properties: {
				name: 'name',
				category: 'name',
				operator: { label: 'Equal', name: 'equal', iconName: 'equal' },
				operators: [
					{ label: 'Equal', name: 'equal', iconName: 'equal' },
					{ label: 'Does not contains', name: 'notEqual', iconName: 'not-equal' },
					{ label: 'Contains', name: 'contains', iconName: 'contains' },
				],
				initialOpenedOperator: false,
				initialOpenedValue: false,
				label: 'hello world\n',
				value: 'hello world\n',
			},
			metadata: {
				attribute: 'name',
				badgeId: 'name-7bc9bd07-3b46-4b8c-a406-a08b6263de5b',
				case: 'insensitive',
				badgesPerFacet: 'N',
				entitiesPerBadge: '1',
			},
		},
	];
	const badgeDefinitionName = {
		facet_field: {
			object: 'dataset',
			attribute: 'name',
		},
		facet_operators: ['equal', 'notEqual', 'contains'],
		case: 'insensitive',
		badges_per_facet: 'N',
		entities_per_badge: '1',
	};
	const badgesDefinitionsRawData = [badgeDefinitionName];

	it('should render the default html output with no badges', () => {
		// Given
		const props = {
			onSubmit: jest.fn(),
		};
		// When
		const wrapper = mount(
			<FacetedManager id="manager-id">
				<BasicSearch {...props} />
			</FacetedManager>,
		);
		// Then
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should render the default html output with some badges', () => {
		// Given
		const props = {
			badgesDefinitionsRawData,
			initialFacetedBadges,
			onSubmit: jest.fn(),
		};
		// When
		const wrapper = mount(
			<FacetedManager id="manager-id">
				<BasicSearch {...props} />
			</FacetedManager>,
		);
		// Then
		expect(wrapper.html()).toMatchSnapshot();
	});
});
