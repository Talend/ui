import React from 'react';
import renderer from 'react-test-renderer';

import SelectSortBy from './SelectSortBy.component';

jest.mock('react-dom');

describe('SelectSortBy', () => {
	it('should render its name', () => {
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
});
