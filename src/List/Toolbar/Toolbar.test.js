import React from 'react';
import renderer from 'react-test-renderer';

import Toolbar, { getSubProps } from './Toolbar.component';

jest.mock('react-dom');

const props = {
	onSelectDisplayMode: jest.fn(),
	onSelectSortBy: jest.fn(),
	onFilter: jest.fn(),
	sortBy: [
		{ id: 'id', name: 'Name', selected: true },
		{ id: 'name', name: 'Name' },
	],
	sortDesc: true,
};

describe('Toolbar', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Toolbar {...props} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should getSubProps', () => {
		const propTypes = {
			onSelectDisplayMode: 'func',
			sortBy: 'bool',
		};
		const subProps = getSubProps(props, { propTypes });
		expect(subProps.onSelectDisplayMode).toBe(props.onSelectDisplayMode);
		expect(subProps.sortBy).toBe(props.sortBy);
		expect(Object.keys(subProps).length).toBe(2);
	});
});
