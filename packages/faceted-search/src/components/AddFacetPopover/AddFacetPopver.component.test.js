/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { AddFacetPopover } from './AddFacetPopover.component';
import getDefaultT from '../../translate';

const t = getDefaultT();

describe('AddFacetPopover', () => {
	const badgesDefinitions = [
		{
			properties: {
				initialOpenedOperator: true,
				initialOpenedValue: false,
				attribute: 'name',
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
		},
		{
			properties: {
				initialOpenedOperator: true,
				initialOpenedValue: false,
				attribute: 'connection.name',
				label: 'Connection name',
				operator: {},
				operators: [],
				type: 'text',
			},
			metadata: {
				badgePerFacet: 'N',
				entitiesPerBadge: '1',
				operators: ['contains', '='],
			},
		},
		{
			properties: {
				attribute: 'target',
				initialOperatorOpened: true,
				initialValueOpened: false,
				label: 'Target',
				operator: {},
				operators: [],
				type: 'text',
			},
			metadata: {
				category: 'Custom attributes',
				badgePerFacet: 'N',
				entitiesPerBadge: '1',
				operators: ['contains', 'equals', 'notEquals', 'match a regexp'],
			},
		},
	];
	it('should render the html output', () => {
		// Given
		const props = {
			id: 'my id',
			onClick: jest.fn(),
			t,
		};
		// When
		const wrapper = mount(<AddFacetPopover {...props} />);
		// Then
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should render the some badge row, with connection in their attribute', () => {
		// Given
		const props = {
			badgesDefinitions,
			id: 'my-id',
			onClick: jest.fn(),
			t,
		};
		// When
		const wrapper = mount(<AddFacetPopover {...props} />);
		// Then
		act(() => {
			wrapper
				.find('input')
				.first()
				.simulate('change', { target: { value: 'connection' } });
		});
		wrapper.update();
		expect(
			wrapper
				.find('input')
				.first()
				.prop('value'),
		).toBe('connection');
		expect(wrapper.find('button[aria-label="Connection name"]')).toHaveLength(1);
	});
	it('should reset the badge rows when the filter is reset', () => {
		// Given
		const props = {
			initialFilterValue: 'name',
			badgesDefinitions,
			id: 'my-id',
			onClick: jest.fn(),
			t,
		};
		// When
		const wrapper = mount(<AddFacetPopover {...props} />);
		// Then
		act(() => {
			wrapper
				.find('button[aria-label="Remove filter"]')
				.first()
				.simulate('mouseDown');
		});
		wrapper.update();
		expect(
			wrapper
				.find('input')
				.first()
				.prop('value'),
		).toBe('');
		expect(wrapper.find('button[aria-label="Name"]')).toHaveLength(1);
		expect(wrapper.find('button[aria-label="Connection name"]')).toHaveLength(1);
	});
	it('should return the badge definition when click on a row', () => {
		// Given
		const onClick = jest.fn();
		const props = {
			badgesDefinitions,
			id: 'my-id',
			onClick,
			t,
		};
		// When
		const wrapper = mount(<AddFacetPopover {...props} />);
		wrapper.find('button[aria-label="Name"]').simulate('click');
		// Then
		expect(onClick).toHaveBeenNthCalledWith(1, onClick.mock.calls[0][0], badgesDefinitions[0]);
	});
	it('should render the category row', () => {
		// Given
		const props = {
			badgesDefinitions,
			id: 'my-id',
			onClick: jest.fn(),
			t,
		};
		// When
		const wrapper = mount(<AddFacetPopover {...props} />);
		// Then
		expect(wrapper.find('button[aria-label="Custom attributes"]')).toHaveLength(1);
		expect(wrapper.find('.tc-add-facet-popover-screen')).toHaveLength(2);
		expect(wrapper.find('.screen-category')).toHaveLength(1);
		expect(wrapper.find('.screen-move')).toHaveLength(0);
	});
	it('should display the hidding category screen when click on a category row', () => {
		// Given
		const props = {
			badgesDefinitions,
			id: 'my-id',
			onClick: jest.fn(),
			t,
		};
		// When
		const wrapper = mount(<AddFacetPopover {...props} />);
		wrapper.find('button[aria-label="Custom attributes"]').simulate('click');
		// Then
		expect(wrapper.find('.screen-move')).toHaveLength(2);
	});
	it('should render an empty state when filter return no result', () => {
		// Given
		const props = {
			badgesDefinitions,
			id: 'my-id',
			onClick: jest.fn(),
			t,
		};
		// When
		const wrapper = mount(<AddFacetPopover {...props} />);
		// Then
		act(() => {
			wrapper
				.find('input')
				.first()
				.simulate('change', { target: { value: 'aaaaaaaaaa' } });
		});
		wrapper.update();
		expect(wrapper.find('button.tc-add-facet-popover-row')).toHaveLength(0);
		expect(wrapper.find('span').first()).toHaveLength(1);
		expect(
			wrapper
				.find('span')
				.first()
				.text(),
		).toBe('No result found');
	});
});
