import React from 'react';
import renderer from 'react-test-renderer';

import List from './List.component';

jest.mock('react-dom');

describe('List', () => {
	it('should render its name', () => {
		const props = {
			displayMode: 'table',
			list: {
				columns: [
					{ key: 'id', label: 'Id' },
					{ key: 'name', label: 'Name' },
				],
				items: [
					{ id: 1, name: 'Hello world' },
					{ id: 2, name: 'Foo' },
					{ id: 3, name: 'Bar' },
				],
				titleProps: {
					onClick: jest.fn(),
				},
			},
			toolbar: {
				onFilter: jest.fn(),
				onSelectSortBy: jest.fn(),
				onSelectDisplayMode: jest.fn(),
				sortBy: [
					{ name: 'Id' },
					{ name: 'Name', selected: true },
				],
			},
		};
		const wrapper = renderer.create(
			<List {...props} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
