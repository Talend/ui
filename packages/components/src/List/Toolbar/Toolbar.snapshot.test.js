import React from 'react';
import renderer from 'react-test-renderer';

import Toolbar from './Toolbar.component';

jest.mock('react-dom');

const id = 'my-toolbar';

const actionBar = {
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

const selectAllCheckbox = {
	items: [{ id: 1 }, { id: 2 }],
	isSelected: jest.fn(),
	onToggleAll: jest.fn(),
};

const display = {
	displayMode: 'table',
	onSelectDisplayMode: jest.fn(),
};

const sort = {
	field: 'id',
	isDescending: true,
	onChange: jest.fn(),
	options: [{ id: 'id', name: 'Id' }, { id: 'name', name: 'Name' }],
};

const pagination = {
	startIndex: 6,
	totalResults: 13,
	onChangePagination: jest.fn(),
	itemsPerPage: 5,
};

const filter = {
	onFilter: jest.fn(),
	onToggle: jest.fn(),
};

describe('Toolbar', () => {
	it('should render empty toolbar', () => {
		// when
		const wrapper = renderer.create(<Toolbar />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render actions toolbar', () => {
		// given
		const tProps = {
			id,
			actionBar: {
				actions: actionBar.actions,
			},
		};

		// when
		const wrapper = renderer.create(<Toolbar {...tProps} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render actions toolbar with selected items', () => {
		// given
		const tProps = {
			id,
			actionBar,
			getComponent: 'whatever',
		};

		// when
		const wrapper = renderer.create(<Toolbar {...tProps} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render select all checkbox', () => {
		// given
		const tProps = {
			id,
			selectAllCheckbox,
		};

		// when
		const wrapper = renderer.create(<Toolbar {...tProps} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render display mode selector', () => {
		// given
		const tProps = {
			id,
			display,
		};

		// when
		const wrapper = renderer.create(<Toolbar {...tProps} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render sort selector', () => {
		// given
		const tProps = {
			id,
			sort,
		};

		// when
		const wrapper = renderer.create(<Toolbar {...tProps} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render filter form', () => {
		// given
		const tProps = {
			id,
			filter,
		};

		// when
		const wrapper = renderer.create(<Toolbar {...tProps} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render pagination', () => {
		// given
		const tProps = {
			id,
			pagination,
		};

		// when
		const wrapper = renderer.create(<Toolbar {...tProps} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
