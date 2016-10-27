import React from 'react';
import renderer from 'react-test-renderer';

import SelectSortBy from './SelectSortBy.component';

jest.mock('react-dom');

describe('SelectSortBy', () => {
	it('should render', () => {
		const props = {
			onSelectSortBy: jest.fn(),
			sortBy: [
				{ id: 'id', name: 'Name', selected: true },
				{ id: 'name', name: 'Name' },
			],
		};
		const wrapper = renderer.create(
			<SelectSortBy {...props} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render without sortBy selected', () => {
		const props = {
			onSelectSortBy: jest.fn(),
			sortBy: [
				{ id: 'id', name: 'Name' },
				{ id: 'label', name: 'Label' },
			],
		};
		const wrapper = renderer.create(
			<SelectSortBy {...props} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
