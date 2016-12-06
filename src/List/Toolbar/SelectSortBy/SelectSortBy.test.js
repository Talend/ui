import React from 'react';
import renderer from 'react-test-renderer';

import SelectSortBy from './SelectSortBy.component';

jest.mock('react-dom');

describe('SelectSortBy', () => {
	it('should render', () => {
		// given
		const props = {
			onSelectSortBy: jest.fn(),
			sortOptions: [
				{ id: 'id', name: 'Name' },
				{ id: 'name', name: 'Name' },
			],
			sortBy: 'id',
		};

		// when
		const wrapper = renderer.create(
			<SelectSortBy {...props} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render without sortBy selected', () => {
		// given
		const props = {
			onSelectSortBy: jest.fn(),
			sortOptions: [
				{ id: 'id', name: 'Name' },
				{ id: 'label', name: 'Label' },
			],
		};

		// when
		const wrapper = renderer.create(
			<SelectSortBy {...props} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});


	it('should render id if provided', () => {
		// given
		const props = {
			id: 'toolbar',
			onSelectSortBy: jest.fn(),
			sortOptions: [
				{ id: 'id', name: 'Name' },
				{ id: 'name', name: 'Name' },
			],
			sortBy: 'id',
		};

		// when
		const wrapper = renderer.create(
			<SelectSortBy {...props} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
