import React from 'react';
import { mount } from 'enzyme';
import Immutable from 'immutable';

import ActionDropdown from './ActionDropdown.component';

const items = [
	{
		icon: 'talend-icon',
		label: 'document 1',
		onClick: jest.fn(),
	},
	{
		label: 'document 2',
		onClick: jest.fn(),
	},
];
const immutableItems = Immutable.fromJS(items);

describe('ActionDropdown', () => {
	it('should render a button dropdown with its menu', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			items,
		};

		// when
		const wrapper = mount(<ActionDropdown {...props} />);

		// then
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should render the same as when plain object or immutable list', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			items,
		};
		const immutableProps = {
			...props,
			items: immutableItems,
		};

		// when
		const immutableWrapper = mount(<ActionDropdown {...immutableProps} />);
		const wrapper = mount(<ActionDropdown {...props} />);

		// then
		expect(wrapper.html()).toEqual(immutableWrapper.html());
	});

	it('should render immutable items', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			items: immutableItems,
		};

		// when
		const wrapper = mount(<ActionDropdown {...props} />);

		// then
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should render a button with icon and label', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			icon: 'fa fa-file-excel-o',
			items,
		};

		// when
		const wrapper = mount(<ActionDropdown {...props} />).find('DropdownButton');

		// then
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should render icon only with hideLabel props', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			icon: 'fa fa-file-excel-o',
			items,
			tooltipPlacement: 'right',
			hideLabel: true,
		};

		// when
		const wrapper = mount(<ActionDropdown {...props} />).find('DropdownButton');

		// then
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should render a button with "link" theme', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			items,
			link: true,
		};

		// when
		const wrapper = mount(<ActionDropdown {...props} />).find('DropdownButton');

		// then
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should render "no option" item when items array is empty', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			items: [],
		};

		// when
		const wrapper = mount(<ActionDropdown {...props} />).find('DropdownMenu');

		// then
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should render loader item', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			loading: true,
			items: [],
		};

		// when
		const wrapper = mount(<ActionDropdown {...props} />).find('DropdownMenu');

		// then
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should render loader item below existing items', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			loading: true,
			items,
		};

		// when
		const wrapper = mount(<ActionDropdown {...props} />).find('DropdownMenu');

		// then
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should render icon-only items with item hideLabel props', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			items: items.map(item => ({ ...item, hideLabel: true })),
		};

		// when
		const wrapper = mount(<ActionDropdown {...props} />).find('DropdownMenu');

		// then
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should apply transformation on icon', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'Button label',
			icon: 'talend-ellipsis',
			iconTransform: 'rotate-90',
		};

		// when
		const wrapper = mount(<ActionDropdown {...props} />).find('DropdownButton').find('svg.theme-rotate-90');

		// then
		expect(wrapper.html()).toMatchSnapshot();
	});
});
