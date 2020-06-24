/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { mount } from 'enzyme';

import { BasicSearch } from './BasicSearch.component';
import { FacetedManager } from '../FacetedManager';

describe('BasicSearch', () => {
	const badgeText = {
		properties: {
			attribute: 'name',
			initialOperatorOpened: false,
			initialValueOpened: false,
			label: 'Name',
			operator: { label: 'Equals', name: '=', iconName: 'equal' },
			operators: [
				{ label: 'Equals', name: '=', iconName: 'equal' },
				{ label: 'Contains', name: 'contains', iconName: 'contains' },
			],
			type: 'text',
			value: 'hello',
		},
		metadata: {
			badgeId: 'name-7bc9bd07-3b46-4b8c-a406-a08b6263de5b',
			badgePerFacet: 'N',
			isInCreation: true,
			entitiesPerBadge: '1',
			operators: ['contains', '='],
		},
	};
	const badgesFaceted = {
		badges: [{ ...badgeText }],
	};
	const badgeDefinitionName = {
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
			operators: ['contains', '='],
		},
	};

	const badgesDefinitions = [badgeDefinitionName];

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
			badgesDefinitions,
			badgesFaceted,
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
	it('should not trigger onSubmit when a badge is in creation', () => {
		// given
		const onSubmit = jest.fn();
		const props = {
			badgesDefinitions,
			badgesFaceted,
			onSubmit,
		};
		// when
		const wrapper = mount(
			<FacetedManager id="manager-id">
				<BasicSearch {...props} />
			</FacetedManager>,
		);
		wrapper.update();
		// then
		expect(onSubmit).not.toHaveBeenCalled();
	});
	it('should trigger onSubmit when no badge is in creation', () => {
		// given
		const onSubmit = jest.fn();
		const props = {
			badgesDefinitions,
			badgesFaceted: {
				badges: [
					{
						...badgeText,
						metadata: {
							...badgeText.metadata,
							isInCreation: false,
						},
					},
				],
			},
			onSubmit,
		};
		// when
		const wrapper = mount(
			<FacetedManager id="manager-id">
				<BasicSearch {...props} />
			</FacetedManager>,
		);
		wrapper.update();
		// then
		expect(onSubmit).toHaveBeenCalled();
		expect(onSubmit.mock.calls.length).toBe(1);
		expect(onSubmit.mock.calls[0][0]).toEqual({});
		expect(onSubmit.mock.calls[0][1]).toEqual(props.badgesFaceted.badges);
	});

	it('should remove all badges on clear button click', () => {
		// Given
		const props = {
			badgesDefinitions,
			badgesFaceted,
			onSubmit: jest.fn(),
		};
		// When
		const wrapper = mount(
			<FacetedManager id="manager-id">
				<BasicSearch {...props} />
			</FacetedManager>,
		);

		// Then
		expect(wrapper.find('.tc-badge').length).toBe(1);
		wrapper.find('.tc-basic-search-clear-button').at(0).simulate('click');
		expect(wrapper.find('.tc-badge').length).toBe(0);
	});
});
