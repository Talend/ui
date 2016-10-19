import React from 'react';
import renderer from 'react-test-renderer';

import DisplayTable from './DisplayTable.component';

jest.mock('react-dom');

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
		const onTitleClick = jest.fn();
		const wrapper = renderer.create(
			<DisplayTable
				items={items}
				columns={columns}
				onTitleClick={onTitleClick}
			/>).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
