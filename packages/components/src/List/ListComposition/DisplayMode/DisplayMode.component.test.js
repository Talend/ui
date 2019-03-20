/* eslint-disable react/prop-types */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import DisplayMode from './DisplayMode.component';
import { ListContext } from '../context';
import getDefaultT from '../../../translate';

describe('List DisplayMode', () => {
	it('should render default', () => {
		// given
		const contextValue = { propagateDisplayMode: jest.fn(), t: getDefaultT() };

		// when
		const wrapper = mount(
			<ListContext.Provider value={contextValue}>
				<DisplayMode id="myDisplayMode" />
			</ListContext.Provider>,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should render custom display modes', () => {
		// given
		const contextValue = {
			displayMode: 'table',
			displayModes: jest.fn(),
			t: getDefaultT(),
		};

		// when
		const wrapper = mount(
			<ListContext.Provider value={contextValue}>
				<DisplayMode id="myDisplayMode" displayModes={['lol', 'mdr']} />
			</ListContext.Provider>,
		);

		// then
		expect(wrapper.find('a[role="menuitem"]').map(item => item.text())).toEqual(['lol', 'mdr']);
	});

	describe('uncontrolled mode', () => {
		it('should render initial value', () => {
			// given
			const contextValue = { propagateDisplayMode: jest.fn(), t: getDefaultT() };

			// when
			const wrapper = mount(
				<ListContext.Provider value={contextValue}>
					<DisplayMode id="myDisplayMode" initialDisplayMode="large" />
				</ListContext.Provider>,
			);

			// then
			expect(wrapper.find('a.dropdown-toggle').prop('aria-label')).toBe(
				'Change display mode. Current display mode: large.',
			);
		});

		it('should change and propagate display mode', () => {
			// given
			const contextValue = { propagateDisplayMode: jest.fn(), t: getDefaultT() };

			const wrapper = mount(
				<ListContext.Provider value={contextValue}>
					<DisplayMode id="myDisplayMode" />
				</ListContext.Provider>,
			);

			const event = { target: {} };
			expect(contextValue.propagateDisplayMode).not.toBeCalled();

			// when: react-bootstrap use value-event instead of event-value
			act(() => {
				wrapper.find('MenuItem#myDisplayMode-large').prop('onSelect')('large', event);
			});

			// then
			expect(contextValue.propagateDisplayMode).toBeCalledWith(event, 'large');
		});
	});

	describe('controlled mode', () => {
		it('should render selected display mode', () => {
			// given
			const contextValue = { propagateDisplayMode: jest.fn(), t: getDefaultT() };

			// when
			const wrapper = mount(
				<ListContext.Provider value={contextValue}>
					<DisplayMode id="myDisplayMode" selectedDisplayMode="large" />
				</ListContext.Provider>,
			);

			// then
			expect(wrapper.find('a.dropdown-toggle').prop('aria-label')).toBe(
				'Change display mode. Current display mode: large.',
			);
		});

		it('should call props.onChange with new display mode', () => {
			// given
			const contextValue = { propagateDisplayMode: jest.fn(), t: getDefaultT() };
			const onChange = jest.fn();

			const wrapper = mount(
				<ListContext.Provider value={contextValue}>
					<DisplayMode id="myDisplayMode" onChange={onChange} />
				</ListContext.Provider>,
			);

			const event = { target: {} };
			expect(contextValue.propagateDisplayMode).not.toBeCalled();

			// when: react-bootstrap use value-event instead of event-value
			act(() => {
				wrapper.find('MenuItem#myDisplayMode-large').prop('onSelect')('large', event);
			});

			// then
			expect(contextValue.propagateDisplayMode).not.toBeCalled();
			expect(onChange).toBeCalledWith(event, 'large');
		});
	});
});
