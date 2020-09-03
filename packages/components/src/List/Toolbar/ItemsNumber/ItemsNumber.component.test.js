import React from 'react';
import { mount } from 'enzyme';
import ItemsNumber from './ItemsNumber.component';

const props = {
	id: 'list-items-number',
	totalItems: 42,
};
describe('ItemsNumber', () => {
	it('should render total number of items', () => {
		// when
		const wrapper = mount(<ItemsNumber {...props} />);

		// then
		expect(wrapper.find('div#list-items-number').text()).toEqual(`${props.totalItems} items`);
	});
	it('should render total number of items + customized title', () => {
		// given
		const newProps = {
			...props,
			label: `${props.totalItems} bananas`,
		};

		// when
		const wrapper = mount(<ItemsNumber {...newProps} />);

		// then
		expect(wrapper.find('div#list-items-number').text()).toEqual(
			`${newProps.totalItems} bananas`,
		);
	});
	it('should render total number of items + number of selected items with default label', () => {
		// given
		const newProps = {
			...props,
			selected: 11,
		};

		// when
		const wrapper = mount(<ItemsNumber {...newProps} />);

		// then
		expect(wrapper.find('div#list-items-number').text()).toEqual(
			`${newProps.selected}/${newProps.totalItems} items`,
		);
	});

	it('should render total number of items + number of selected items with customized label', () => {
		// given
		const newProps = {
			...props,
			selected: 11,
			label: '42 bananas',
			labelSelected: '11/42 bananas',
		};

		// when
		const wrapper = mount(<ItemsNumber {...newProps} />);

		// then
		expect(wrapper.find('div#list-items-number').text()).toEqual(
			`${newProps.selected}/${newProps.totalItems} bananas`,
		);
	});
});
