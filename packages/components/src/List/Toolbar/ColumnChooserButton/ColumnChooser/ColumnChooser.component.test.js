import React from 'react';
import { mount } from 'enzyme';
import Component from './ColumnChooser.component';

const columns = [
	{ key: 'id', label: 'Id', order: 1 },
	{ key: 'name', label: 'Name', order: 2 },
	{ key: 'author', label: 'Author', order: 3 },
	{ key: 'created', label: 'Created', order: 6 },
	{
		key: 'modified',
		label: 'Very long name long name long name long name long name',
		order: 4,
		header: 'icon',
		data: { iconName: 'talend-scheduler' },
	},
	{ key: 'icon', label: 'Icon', hidden: true, order: 5 },
];

describe('ColumnChooser', () => {
	it('should render with default props', () => {
		// Given
		const props = {
			id: 'my-id',
			columnsFromList: columns,
			onSubmit: jest.fn(),
		};
		// When
		const wrapper = mount(<Component {...props} />);
		// Then
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should render with children', () => {
		// Given
		const props = {
			id: 'my-id',
			columnsFromList: columns,
			onSubmit: jest.fn(),
		};
		const Children = <div id="my-child">Hello World</div>;
		// When
		const wrapper = mount(<Component {...props}>{Children}</Component>);
		// Then
		expect(wrapper.find('div#my-child').text()).toBe('Hello World');
	});
	it('should trigger the onSubmit props', () => {
		// Given
		const onSubmit = jest.fn();
		const props = {
			id: 'my-id',
			columnsFromList: columns,
			onSubmit,
		};
		// When
		const wrapper = mount(<Component {...props} />);
		wrapper.find('form#my-id-form').simulate('submit');
		// Then
		expect(onSubmit).toHaveBeenCalled();
		expect(onSubmit.mock.calls[0][1]).toEqual([
			{ hidden: false, key: 'id', label: 'Id', order: 1 },
			{ hidden: false, key: 'name', label: 'Name', order: 2 },
			{ hidden: false, key: 'author', label: 'Author', order: 3 },
			{
				hidden: false,
				key: 'modified',
				label: 'Very long name long name long name long name long name',
				order: 4,
			},
			{ hidden: true, key: 'icon', label: 'Icon', order: 5 },
			{ hidden: false, key: 'created', label: 'Created', order: 6 },
		]);
	});
	it('should filter the columns by name if an initial filter value is provided', () => {
		// Given
		const props = {
			id: 'my-id',
			initialFilterValue: 'Name',
			columnsFromList: columns,
			onSubmit: jest.fn(),
		};
		// When
		const wrapper = mount(<Component {...props} />);
		// Then
		expect(
			wrapper.find('input[aria-describedby="my-id-body-display the column Author"]'),
		).toHaveLength(0);
		expect(
			wrapper.find('input[aria-describedby="my-id-body-display the column Name"]'),
		).toHaveLength(1);
	});
	it('should locked the first two columns', () => {
		// Given
		const props = {
			id: 'my-id',
			columnsFromList: columns,
			onSubmit: jest.fn(),
			nbLockedLeftItems: 2,
		};
		// When
		const wrapper = mount(<Component {...props} />);
		// Then
		expect(wrapper.find('svg.tc-icon-name-talend-locked')).toHaveLength(2);
	});
});
