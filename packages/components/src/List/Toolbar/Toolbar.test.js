import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import Toolbar from './Toolbar.component';

jest.mock('react-dom');

const id = 'my-toolbar';
const items = [{ id: 1 }, { id: 2 }];
const t = jest.fn(msg => msg);
const actionBar = {
	selectedCount: 1,
	actions: {
		left: [
			{
				id: 'add',
				label: 'Add',
				bsStyle: 'primary',
				icon: 'talend-plus',
				onClick: jest.fn(),
			},
		],
	},
	multiSelectActions: {
		left: [
			{
				id: 'delete',
				label: 'Delete selection',
				icon: 'talend-trash',
				onClick: jest.fn(),
			},
		],
	},
};

const selectAllCheckbox = {
	items,
	isSelected: jest.fn(),
	onToggleAll: jest.fn(),
};

const display = {
	displayMode: 'large',
	onDisplayChange: jest.fn(),
};

const sort = {
	sortOn: 'id',
	isSortDescending: true,
	onSortChange: jest.fn(),
	sortOptions: [{ id: 'id', name: 'Id' }, { id: 'name', name: 'Name' }],
};

const pagination = {
	pagination: true,
	startIndex: 6,
	totalResults: 13,
	onPaginationChange: jest.fn(),
	itemsPerPage: 5,
};

const filter = {
	onFilterChange: jest.fn(),
	onFilterToggle: jest.fn(),
};

const requiredProps = {
	items,
	t,
};

describe('Toolbar', () => {
	it('should render empty toolbar', () => {
		// when
		const wrapper = shallow(<Toolbar.WrappedComponent {...requiredProps} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render actions toolbar', () => {
		// given
		const tProps = {
			id,
			actions: actionBar.actions,
			...requiredProps,
		};

		// when
		const wrapper = mount(<Toolbar {...tProps} />);

		// then
		expect(wrapper.find('ActionBar').props().actions).toBe(tProps.actions);
	});

	it('should render ActionBar with selected items', () => {
		// given
		const tProps = {
			id,
			...requiredProps,
			...actionBar,
		};

		// when
		const wrapper = mount(<Toolbar {...tProps} />);

		// then
		expect(wrapper.find('ActionBar').props().selected).toBe(1);
	});

	it('should render SelectAll', () => {
		// given
		const tProps = {
			id,
			...requiredProps,
			...selectAllCheckbox,
		};

		// when
		const wrapper = mount(<Toolbar {...tProps} />);

		// then
		expect(wrapper.find('SelectAll').length).toBe(1);
	});

	it('should render SelectDisplayMode', () => {
		// given
		const tProps = {
			id,
			...display,
			...requiredProps,
		};

		// when
		const wrapper = mount(<Toolbar {...tProps} />);

		// then
		expect(wrapper.find('SelectDisplayMode').length).toBe(1);
	});

	it('should render SelectSortBy', () => {
		// given
		const tProps = {
			id,
			...requiredProps,
			...sort,
		};

		// when
		const wrapper = mount(<Toolbar {...tProps} />);

		// then
		expect(wrapper.find('SelectSortBy').length).toBe(1);
	});

	it('should render FilterBar', () => {
		// given
		const tProps = {
			id,
			...filter,
			...requiredProps,
		};

		// when
		const wrapper = mount(<Toolbar {...tProps} />);

		// then
		expect(wrapper.find('FilterBar').length).toBe(1);
	});

	it('should render Pagination', () => {
		// given
		const tProps = {
			id,
			...pagination,
			...requiredProps,
		};

		// when
		const wrapper = mount(<Toolbar {...tProps} />);

		// then
		expect(wrapper.find('Pagination').length).toBe(1);
	});
});
