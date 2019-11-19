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
				badges_per_facet: 'N',
				entities_per_badge: '1',
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
				badges_per_facet: 'N',
				entities_per_badge: '1',
				operators: ['contains', '='],
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
			wrapper.find('input').simulate('change', { target: { value: 'connection' } });
		});
		wrapper.update();
		expect(wrapper.find('input').prop('value')).toBe('connection');
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
			wrapper.find('button[aria-label="Remove filter"]').simulate('mouseDown');
		});
		wrapper.update();
		expect(wrapper.find('input').prop('value')).toBe('');
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
});
