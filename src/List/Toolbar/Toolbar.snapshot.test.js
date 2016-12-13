import React from 'react';
import renderer from 'react-test-renderer';

import Toolbar, { getSubProps } from './Toolbar.component';

jest.mock('react-dom');

const props = { id: 'my-toolbar' };

const actionBarProps = {
	selected: 1,
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

const filterProps = {
	onFilter: jest.fn(),
};

const displayModeProps = {
	displayMode: 'table',
	onSelectDisplayMode: jest.fn(),
};

const sortByProps = {
	onSelectSortBy: jest.fn(),
	sortOptions: [
		{ id: 'id', name: 'Id' },
		{ id: 'name', name: 'Name' },
	],
	sortBy: 'id',
	sortDesc: true,
};

const paginationProps = {
	activePage: 5,
	itemsLength: 10,
	onChangePagination: jest.fn(),
	pageSize: 8,
};

describe('Toolbar', () => {
	it('should getSubProps', () => {
		// given
		const tProps = {
			...props,
			...displayModeProps,
			...sortByProps,
		};
		const propTypes = {
			onSelectDisplayMode: 'func',
			sortBy: 'bool',
		};

		// when
		const subProps = getSubProps(tProps, { propTypes });

		// then
		expect(Object.keys(subProps).length).toBe(2);
		expect(subProps.onSelectDisplayMode).toBe(displayModeProps.onSelectDisplayMode);
		expect(subProps.sortBy).toBe(sortByProps.sortBy);
	});

	it('should render empty toolbar', () => {
		// when
		const wrapper = renderer.create(<Toolbar />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render actions toolbar', () => {
		// given
		const tProps = {
			actions: actionBarProps.actions,
			...props,
		};

		// when
		const wrapper = renderer.create(<Toolbar {...tProps} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render actions toolbar with selected items', () => {
		// given
		const tProps = {
			...props,
			...actionBarProps,
		};

		// when
		const wrapper = renderer.create(<Toolbar {...tProps} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render display mode selector', () => {
		// given
		const tProps = {
			...props,
			...displayModeProps,
		};

		// when
		const wrapper = renderer.create(<Toolbar {...tProps} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render sort selector', () => {
		// given
		const tProps = {
			...props,
			...sortByProps,
		};

		// when
		const wrapper = renderer.create(<Toolbar {...tProps} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render filter form', () => {
		// given
		const tProps = {
			...props,
			...filterProps,
		};

		// when
		const wrapper = renderer.create(<Toolbar {...tProps} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render pagination', () => {
		// given
		const tProps = {
			...props,
			...paginationProps,
		};

		// when
		const wrapper = renderer.create(<Toolbar {...tProps} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
