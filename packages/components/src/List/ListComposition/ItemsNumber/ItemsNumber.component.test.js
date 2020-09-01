import React from 'react';
import { mount } from 'enzyme';
import { ListContext } from '../context';

import getDefaultT from '../../../translate';
import ItemsNumber from './ItemsNumber.component';

describe('ItemsNumber', () => {
	const props = {
		id: 'list-items-number',
		totalItems: 42,
	};

	const defaultContext = {
		sortParams: {},
		setSortParams: jest.fn(),
		t: getDefaultT(),
	};

	describe('ItemsNumber', () => {
		it('should render total number of items', () => {
			// when
			const wrapper = mount(
				<ListContext.Provider value={defaultContext}>
					<ItemsNumber {...props} />
				</ListContext.Provider>);
	
			// then
			expect(wrapper.html()).toMatchSnapshot();
		});
		it('should render total number of items + customized title', () => {
			// when
			const wrapper = mount(
				<ListContext.Provider value={defaultContext}>
					<ItemsNumber {...props} label="bananas" />
				</ListContext.Provider>);
	
			// then
			expect(wrapper.html()).toMatchSnapshot();
		});
		it('should render total number of items + number of selected items', () => {
			// when
			const wrapper = mount(
				<ListContext.Provider value={defaultContext}>
					<ItemsNumber {...props} selected="11" />
				</ListContext.Provider>);
	
			// then
			expect(wrapper.html()).toMatchSnapshot();
		});
	});
});
