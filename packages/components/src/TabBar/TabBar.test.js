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

	it('should select a tab from its key', () => {
		const tabBar = <TabBar {...props} selected={'2'} />;
		const wrapper = mount(tabBar);

		expect(
			wrapper
				.find('li')
				.at(0)
				.props()
				.className.includes('active'),
		).toBe(false);
		expect(
			wrapper
				.find('li')
				.at(1)
				.props()
				.className.includes('active'),
		).toBe(true);
		expect(
			wrapper
				.find('li')
				.at(2)
				.props()
				.className.includes('active'),
		).toBe(false);
	});

	it('should select a tab from the isSelected flag', () => {
		const custom = { ...props };
		custom.items[2].isSelected = true;
		const tabBar = <TabBar {...custom} />;
		const wrapper = mount(tabBar);

		expect(
			wrapper
				.find('li')
				.at(0)
				.props()
				.className.includes('active'),
		).toBe(false);
		expect(
			wrapper
				.find('li')
				.at(1)
				.props()
				.className.includes('active'),
		).toBe(false);
		expect(
			wrapper
				.find('li')
				.at(2)
				.props()
				.className.includes('active'),
		).toBe(true);
	});
});
