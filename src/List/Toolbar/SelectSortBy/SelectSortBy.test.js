import React from 'react';
import renderer from 'react-test-renderer';

import SelectSortBy from './SelectSortBy.component';

jest.mock('react-dom');

describe('SelectSortBy', () => {
	it('should render', () => {
		// given
		const props = {
			onSelectSortBy: jest.fn(),
			sortBy: [
				{ id: 'id', name: 'Name', selected: true },
				{ id: 'name', name: 'Name' },
			],
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
			sortBy: [
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
			sortBy: [
				{ id: 'id', name: 'Name', selected: true },
				{ id: 'name', name: 'Name' },
			],
		};

		// when
		const wrapper = renderer.create(
			<SelectSortBy {...props} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
