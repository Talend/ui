import React from 'react';
import { mount } from 'enzyme';
import faker from 'faker';
import TabBar from './TabBar.component';

faker.seed(42);
const onClick = jest.fn();
const props = {
	items: [
		{
			id: 'tab-bar-action-1',
			key: '1',
			label: faker.random.word(),
		},
		{
			id: 'tab-bar-action-2',
			key: '2',
			label: faker.random.word(),
		},
		{
			id: 'tab-bar-action-3',
			key: '3',
			label: faker.random.word(),
		},
	],
	onSelect: onClick,
	selected: '2',
};

describe('TabBar', () => {
	it('should trigger tab callback on tab click', () => {
		// given
		const tabBar = <TabBar {...props} />;
		const wrapper = mount(tabBar);

		// when
		wrapper
			.find('button')
			.at(1)
			.simulate('click');

		// then
		expect(onClick).toBeCalledWith(expect.anything(), props.items[1]);
	});
});
