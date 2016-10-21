import React from 'react';
import renderer from 'react-test-renderer';

import DisplayTile from './DisplayTile.component';

describe('DisplayTile', () => {
	it('should render 3 tiles with name as title by default', () => {
		const items = [
			{ id: 1, name: 'one' },
			{ id: 2, name: 'two' },
		];
		const columns = [
			{ key: 'id', label: 'Id' },
			{ key: 'name', label: 'Name' },
		];
		const wrapper = renderer.create(
			<DisplayTile items={items} columns={columns} />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render 3 tiles with id as title by setting', () => {
		const items = [
			{ id: 1, name: 'one' },
			{ id: 2, name: 'two' },
		];
		const columns = [
			{ key: 'id', label: 'Id' },
			{ key: 'name', label: 'Name' },
		];
		const wrapper = renderer.create(
			<DisplayTile items={items} columns={columns} titleKey="id" />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render 3 tiles with id as title by setting and render a button', () => {
		const action = jest.fn();
		const items = [
			{ id: 1, name: 'one' },
			{ id: 2, name: 'two' },
		];
		const columns = [
			{ key: 'id', label: 'Id' },
			{ key: 'name', label: 'Name' },
		];
		const wrapper = renderer.create(
			<DisplayTile items={items} columns={columns} titleKey="id" onTitleClick={action} />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
