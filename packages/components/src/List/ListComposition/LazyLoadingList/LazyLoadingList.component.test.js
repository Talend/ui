/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import LazyLoadingList from './LazyLoadingList.component';
import { ListContext } from '../context';

describe('LazyLoadingList', () => {
	const defaultContext = { collection: [], setColumns: jest.fn()  };

	it('should render lazy loading list component', () => {
		// when
		const wrapper = mount(
			<ListContext.Provider value={defaultContext}>
				<LazyLoadingList id="myLazyLoadingList" />
			</ListContext.Provider>,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
