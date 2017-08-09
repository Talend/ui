import React from 'react';
import { mount } from 'enzyme';
import TabBar from './TabBar.component';

const onClick = jest.fn();
const props = {
	items: [
		{
			id: 'tab-bar-action-1',
			key: '1',
			label: 'Tab1',
		},
		{
			id: 'tab-bar-action-2',
			key: '2',
			label: 'Tab2',
		},
		{
			id: 'tab-bar-action-3',
			key: '3',
			label: 'Tab3',
		},
	],
	onSelect: onClick,
	selected: '2',
};

describe('TabBar', () => {
	it('should trigger tab callback on tab click', () => {
		// given
		const tabBar = (<TabBar {...props} />);
		const wrapper = mount(tabBar);

		// when
		wrapper.find('button').at(1).simulate('click', { button: 0 });

		// then
		expect(onClick).toBeCalledWith(expect.anything(), props.items[1]);
	});
});
