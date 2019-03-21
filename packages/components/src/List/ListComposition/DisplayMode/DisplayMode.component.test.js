/* eslint-disable react/prop-types */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import DisplayMode from './DisplayMode.component';
import { ListContext } from '../context';
import getDefaultT from '../../../translate';

describe('List DisplayMode', () => {
	it('should render', () => {
		// given
		const contextValue = { displayMode: 'table', setDisplayMode: jest.fn(), t: getDefaultT() };

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
			setDisplayMode: jest.fn(),
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
		it('should propagate initial value', () => {
			// given
			const contextValue = { setDisplayMode: jest.fn(), t: getDefaultT() };

			// when
			act(() => {
				mount(
					<ListContext.Provider value={contextValue}>
						<DisplayMode id="myDisplayMode" initialDisplayMode="large" />
					</ListContext.Provider>,
				);
			});

			// then
			expect(contextValue.setDisplayMode).toBeCalledWith('large');
		});

		it('should propagate display mode', () => {
			// given
			const contextValue = { setDisplayMode: jest.fn(), t: getDefaultT() };

			let wrapper;
			act(() => {
				wrapper = mount(
					<ListContext.Provider value={contextValue}>
						<DisplayMode id="myDisplayMode" />
					</ListContext.Provider>,
				);
			});

			const event = { target: {} };
			expect(contextValue.setDisplayMode.mock.calls.length).toBe(1);

			// when: react-bootstrap use value-event instead of event-value
			act(() => {
				wrapper.find('MenuItem#myDisplayMode-large').prop('onSelect')('large', event);
			});

			// then
			expect(contextValue.setDisplayMode.mock.calls.length).toBe(2);
			expect(contextValue.setDisplayMode.mock.calls[1]).toEqual(['large']);
		});
	});

	describe('controlled mode', () => {
		it('should render selected display mode', () => {
			// given
			const contextValue = { displayMode: 'table', setDisplayMode: jest.fn(), t: getDefaultT() };

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
			const contextValue = { displayMode: 'table', setDisplayMode: jest.fn(), t: getDefaultT() };
			const onChange = jest.fn();

			const wrapper = mount(
				<ListContext.Provider value={contextValue}>
					<DisplayMode id="myDisplayMode" selectedDisplayMode="large" onChange={onChange} />
				</ListContext.Provider>,
			);

			const event = { target: {} };
			expect(contextValue.setDisplayMode).not.toBeCalled();

			// when: react-bootstrap use value-event instead of event-value
			act(() => {
				wrapper.find('MenuItem#myDisplayMode-large').prop('onSelect')('large', event);
			});

			// then
			expect(contextValue.setDisplayMode).not.toBeCalled();
			expect(onChange).toBeCalledWith(event, 'large');
		});
	});
});
