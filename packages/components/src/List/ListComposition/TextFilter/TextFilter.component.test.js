/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';

import toJsonWithoutI18n from '../../../../test/props-without-i18n';
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
		expect(toJsonWithoutI18n(wrapper)).toMatchSnapshot();
	});

	it('should render text filter component with defined docked state', () => {
		// when
		const wrapper = mount(
			<ListContext.Provider value={defaultContext}>
				<TextFilter id="myTextFilter" docked />
			</ListContext.Provider>,
		);

		// then
		expect(toJsonWithoutI18n(wrapper)).toMatchSnapshot();
	});
});
