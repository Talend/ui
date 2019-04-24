/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import TextFilter from './TextFilter.component';
import { ListContext } from '../context';
import getDefaultT from '../../../translate';

describe('TextFilter', () => {
	const defaultContext = {
		textFilter: '',
		setTextFilter: jest.fn(),
		t: getDefaultT(),
	};

	it('should render text filter component', () => {
		// when
		const wrapper = mount(
			<ListContext.Provider value={defaultContext}>
				<TextFilter id="myTextFilter" />
			</ListContext.Provider>,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should render text filter component with defined docked state', () => {
		// when
		const wrapper = mount(
			<ListContext.Provider value={defaultContext}>
				<TextFilter id="myTextFilter" docked />
			</ListContext.Provider>,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
