import React from 'react';
import renderer from 'react-test-renderer';

import DisplayTable from './DisplayTable.component';

describe('DisplayTable', () => {
	it('should render its name', () => {
		const items = [
			{ id: 1, name: 'one' },
			{ id: 2, name: 'two' },
		];
		const columns = [
			{ key: 'id', label: 'Id' },
			{ key: 'name', label: 'Name' },
		];
		const wrapper = renderer.create(
			<DisplayTable items={items} columns={columns} />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
