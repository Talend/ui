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
		t: getDefaultT(),
	};

	describe('ItemsNumber', () => {
		it('should render total number of items', () => {
			// when
			const wrapper = mount(
				<ListContext.Provider value={defaultContext}>
					<ItemsNumber {...props} />
				</ListContext.Provider>,
			);

			// then
			expect(wrapper.find('div#list-items-number').text()).toEqual(`${props.totalItems} items`);
		});
		it('should render total number of items + customized title', () => {
			// given
			const newProps = {
				...props,
				label: 'bananas',
			};

			// when
			const wrapper = mount(
				<ListContext.Provider value={defaultContext}>
					<ItemsNumber {...newProps} label="bananas" />
				</ListContext.Provider>,
			);

			// then
			expect(wrapper.find('div#list-items-number').text()).toEqual(`${newProps.totalItems} ${newProps.label}`);
		});
		it('should render total number of items + number of selected items', () => {
			// given
			const newProps = {
				...props,
				selected: 11,
			};

			// when
			const wrapper = mount(
				<ListContext.Provider value={defaultContext}>
					<ItemsNumber {...newProps} selected="11" />
				</ListContext.Provider>,
			);

			// then
			expect(wrapper.find('div#list-items-number').text()).toEqual(`${newProps.selected}/${newProps.totalItems} items`);
		});
	});
});
