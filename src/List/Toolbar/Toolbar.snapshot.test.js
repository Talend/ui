import React from 'react';
import renderer from 'react-test-renderer';

import Toolbar, { getSubProps } from './Toolbar.component';

jest.mock('react-dom');

const props = {
	onSelectDisplayMode: jest.fn(),
	onSelectSortBy: jest.fn(),
	onFilter: jest.fn(),
	sortOptions: [
		{ id: 'id', name: 'Name' },
		{ id: 'name', name: 'Name' },
	],
	sortBy: 'id',
	sortDesc: true,
	itemsLength: 17,
	onChangePagination: jest.fn(),
};

describe('Toolbar', () => {
	it('should render', () => {
		// when
		const wrapper = renderer.create(
			<Toolbar {...props} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should getSubProps', () => {
		// given
		const propTypes = {
			onSelectDisplayMode: 'func',
			sortBy: 'bool',
		};

		// when
		const subProps = getSubProps(props, { propTypes });

		// then
		expect(subProps.onSelectDisplayMode).toBe(props.onSelectDisplayMode);
		expect(subProps.sortBy).toBe(props.sortBy);
		expect(Object.keys(subProps).length).toBe(2);
	});

	it('should render listActions', () => {
		// given
		const tprops = Object.assign({}, props);
		tprops.listActions = [
			{
				label: 'Delete selection',
				icon: 'fa fa-trash-o',
				onClick: jest.fn(),
			},
		];

		// when
		const wrapper = renderer.create(
			<Toolbar {...tprops} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render add btn', () => {
		// given
		const tprops = Object.assign({}, props);
		tprops.onClickAdd = jest.fn();

		// when
		const wrapper = renderer.create(
			<Toolbar {...tprops} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render id if provided', () => {
		// given
		const tprops = {
			...props,
			id: 'toolbar',
			onClickAdd: jest.fn(),
			listActions: [
				{
					label: 'Delete selection',
					icon: 'fa fa-trash-o',
					onClick: jest.fn(),
				},
			],
		};

		// when
		const wrapper = renderer.create(
			<Toolbar {...tprops} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
