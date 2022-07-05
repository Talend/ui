import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { AddFacetPopover } from './AddFacetPopover.component';
import getDefaultT from '../../translate';

const t = getDefaultT();

describe('AddFacetPopover', () => {
	const badges = [];
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
				type: 'checkbox',
			},
			metadata: {
				badgePerFacet: '1',
				entitiesPerBadge: '1',
				operators: ['in'],
				values: [
					{ id: 'amazon_s3', label: 'Amazon S3' },
					{ id: 'hdfs', label: 'HDFS' },
					{ id: 'kafka', label: 'Kafka' },
				],
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

	const getRowButtons = wrapper =>
		wrapper
			.find('div.tc-add-facet-popover-screen:not(.screen-category)')
			.find('div.tc-add-facet-popover-row-container')
			.find('button');

	it('should render the html output', () => {
		// Given
		const props = {
			badges,
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
			badges,
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
		expect(wrapper.find('input').first().prop('value')).toBe('connection');
		const rowButton = getRowButtons(wrapper);
		expect(rowButton).toHaveLength(1);
		expect(rowButton.text()).toBe('Connection name');
	});
	it('should reset the badge rows when the filter is reset', () => {
		// Given
		const props = {
			initialFilterValue: 'name',
			badges,
			badgesDefinitions,
			id: 'my-id',
			onClick: jest.fn(),
			t,
		};
		// When
		const wrapper = mount(<AddFacetPopover {...props} />);
		expect(getRowButtons(wrapper)).toHaveLength(2);
		// Then
		act(() => {
			wrapper.find('button[aria-label="Remove filter"]').first().simulate('mouseDown');
		});
		wrapper.update();
		expect(wrapper.find('input').first().prop('value')).toBe('');
		expect(getRowButtons(wrapper)).toHaveLength(3);
	});
	it('should return the badge definition when click on a row', () => {
		// Given
		const onClick = jest.fn();
		const props = {
			badges,
			badgesDefinitions,
			id: 'my-id',
			onClick,
			t,
		};
		// When
		const wrapper = mount(<AddFacetPopover {...props} />);
		getRowButtons(wrapper).first().simulate('click');
		// Then
		expect(onClick).toHaveBeenNthCalledWith(1, onClick.mock.calls[0][0], badgesDefinitions[1]);
	});
	it('should render the category row', () => {
		// Given
		const props = {
			badges,
			badgesDefinitions,
			id: 'my-id',
			onClick: jest.fn(),
			t,
		};
		// When
		const wrapper = mount(<AddFacetPopover {...props} />);
		// Then
		expect(wrapper.find('.tc-add-facet-popover-screen')).toHaveLength(2);
		expect(wrapper.find('.screen-category')).toHaveLength(1);
		expect(wrapper.find('.screen-move')).toHaveLength(0);
	});
	it('should display the hidden category screen when click on a category row', () => {
		// Given
		const props = {
			badges,
			badgesDefinitions,
			id: 'my-id',
			onClick: jest.fn(),
			t,
		};
		// When
		const wrapper = mount(<AddFacetPopover {...props} />);
		getRowButtons(wrapper).at(1).simulate('click'); // click on "Custom attributes"
		// Then
		expect(wrapper.find('.screen-move')).toHaveLength(2);
	});
	it('should render an empty state when filter return no result', () => {
		// Given
		const props = {
			badges,
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
		expect(wrapper.find('span.tc-add-facet-popover-filter-empty').first()).toHaveLength(1);
		expect(wrapper.find('span.tc-add-facet-popover-filter-empty').first().text()).toBe(
			'No result found',
		);
	});
	it('should render an disabled row if badgePerFacet is exceeded', () => {
		// Given
		const props = {
			badges: [
				{
					properties: {
						initialOpenedOperator: true,
						initialOpenedValue: false,
						attribute: 'connection.name',
						label: 'Connection name',
						operator: {},
						operators: [],
						type: 'checkbox',
						values: [{ id: 'amazon_s3', label: 'Amazon S3' }],
					},
					metadata: {
						badgePerFacet: '1',
						entitiesPerBadge: '1',
						operators: ['in'],
					},
				},
			],
			badgesDefinitions,
			id: 'my-id',
			onClick: jest.fn(),
			t,
		};
		// When
		const wrapper = mount(<AddFacetPopover {...props} />);
		// Then
		expect(getRowButtons(wrapper).first().prop('disabled')).toBe(true);
	});
	it('should not render an empty label badge', () => {
		// Given
		const props = {
			badges: [
				{
					properties: {
						initialOpenedOperator: true,
						initialOpenedValue: false,
						attribute: 'connection.name',
						label: '',
						operator: {},
						operators: [],
						type: 'checkbox',
						values: [{ id: 'amazon_s3', label: 'Amazon S3' }],
					},
					metadata: {
						badgePerFacet: '1',
						entitiesPerBadge: '1',
						operators: ['in'],
					},
				},
			],
			badgesDefinitions,
			id: 'my-id',
			onClick: jest.fn(),
			t,
		};
		// When
		const wrapper = mount(<AddFacetPopover {...props} />);
		// Then
		expect(wrapper.find('button[aria-label=""]')).toHaveLength(0);
	});
	it('should sort by label if no comparator provided', () => {
		// Given
		const props = {
			badges,
			badgesDefinitions,
			id: 'my id',
			onClick: jest.fn(),
			t,
		};
		// When
		const wrapper = mount(<AddFacetPopover {...props} />);

		// Then
		const rowButtons = getRowButtons(wrapper);
		expect(rowButtons.at(0).text()).toEqual('Connection name');
		expect(rowButtons.at(1).text()).toEqual('Custom attributes');
		expect(rowButtons.at(2).text()).toEqual('Name');
	});
	it('should not sort if null is provided as comparator', () => {
		// Given
		const props = {
			badges,
			badgesDefinitions,
			id: 'my id',
			onClick: jest.fn(),
			badgesDefinitionsSort: null,
			t,
		};
		// When
		const wrapper = mount(<AddFacetPopover {...props} />);

		// Then
		const rowButtons = getRowButtons(wrapper);
		expect(rowButtons.at(0).text()).toEqual('Name');
		expect(rowButtons.at(1).text()).toEqual('Connection name');
		expect(rowButtons.at(2).text()).toEqual('Custom attributes');
	});
});
