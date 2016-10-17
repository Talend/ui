import React from 'react';
import renderer from 'react-test-renderer';

import Toolbar from './Toolbar.component';

jest.mock('react-dom');

describe('Toolbar', () => {
	it('should render its name', () => {
		const props = {
			onSelectDisplayMode: jest.fn(),
			onSelectSortBy: jest.fn(),
			onFilter: jest.fn(),
			sortBy: [
				{ id: 'id', name: 'Name', selected: true },
				{ id: 'name', name: 'Name' },
			],
		};
		const wrapper = renderer.create(
			<Toolbar {...props} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
