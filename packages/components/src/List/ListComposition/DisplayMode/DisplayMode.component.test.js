/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import DisplayMode from './DisplayMode.component';
import { ListContext } from '../context';

describe('List DisplayMode', () => {
	it('should render', () => {
		// given
		const contextValue = {
			displayMode: 'table',
			onDisplayModeChange: jest.fn(),
		};

		// when
		const wrapper = mount(
			<ListContext.Provider value={contextValue}>
				<DisplayMode.WrappedComponent id="myDisplayMode" />
			</ListContext.Provider>,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should change display mode', () => {
		// given
		const contextValue = {
			displayMode: 'table',
			onDisplayModeChange: jest.fn(),
		};

		const wrapper = mount(
			<ListContext.Provider value={contextValue}>
				<DisplayMode.WrappedComponent id="myDisplayMode" />
			</ListContext.Provider>,
		);

		const event = { target: {} };
		expect(contextValue.onDisplayModeChange).not.toBeCalled();

		// when: react-bootstrap use value-event instead of event-value
		wrapper.find('MenuItem#myDisplayMode-large').prop('onSelect')('large', event);

		// then
		expect(contextValue.onDisplayModeChange).toBeCalledWith(event, 'large');
	});
});
