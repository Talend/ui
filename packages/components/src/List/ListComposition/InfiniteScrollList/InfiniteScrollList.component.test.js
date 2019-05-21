/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import InfiniteScrollList from './InfiniteScrollList.component';
import { ListContext } from '../context';

describe('InfiniteScrollList', () => {
	const defaultContext = { collection: [] };

	it('should render infinite scroll list component', () => {
		// when
		const wrapper = mount(
			<ListContext.Provider value={defaultContext}>
				<InfiniteScrollList id="myInfiniteScrollList" />
			</ListContext.Provider>,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
