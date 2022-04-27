/* eslint-disable react/prop-types */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import ListDisplayMode, { DisplayModeIcon } from './ListDisplayMode.component';
import { ListContext } from '../context';
import getDefaultT from '../../../translate';

describe('List DisplayMode', () => {
	it('should render', () => {
		// given
		const contextValue = { displayMode: 'table', setDisplayMode: jest.fn(), t: getDefaultT() };

		// when
		const wrapper = mount(
			<ListContext.Provider value={contextValue}>
				<ListDisplayMode id="myDisplayMode" />
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
				<ListDisplayMode id="myDisplayMode">
					<DisplayModeIcon
						displayMode="custom1"
						displayModeOption="custom2"
						icon="iconCustom1"
						id="myId"
						label="myCustomLabel1"
						onSelect={jest.fn()}
					/>
					<DisplayModeIcon
						displayMode="custom2"
						displayModeOption="custom2"
						icon="iconCustom2"
						id="myId"
						label="myCustomLabel2"
						onSelect={jest.fn()}
					/>
				</ListDisplayMode>
			</ListContext.Provider>,
		);

		// then
		expect(wrapper.find('ButtonIconToggle#myId-custom1 .CoralButtonIconToggle').text()).toEqual(
			'myCustomLabel1',
		);
		expect(wrapper.find('ButtonIconToggle#myId-custom2 .CoralButtonIconToggle').text()).toEqual(
			'myCustomLabel2',
		);
	});

	describe('uncontrolled mode', () => {
		it('should propagate initial value', () => {
			// given
			const contextValue = { setDisplayMode: jest.fn(), t: getDefaultT() };

			// when
			const wrapper = mount(
				<ListContext.Provider initialDisplayMode="large" value={contextValue}>
					<ListDisplayMode id="myDisplayMode" />
				</ListContext.Provider>,
			);

			// then
			expect(wrapper.find('ButtonIconToggle .CoralButtonIconToggle').at(0).text()).toBe(
				'Set Table as current display mode.',
			);
		});

		it('should propagate display mode', () => {
			// given
			const contextValue = { setDisplayMode: jest.fn(), t: getDefaultT() };

			const wrapper = mount(
				<ListContext.Provider value={contextValue}>
					<ListDisplayMode id="myDisplayMode" />
				</ListContext.Provider>,
			);

			const event = { target: {} };
			act(() => {
				wrapper.find('ButtonIconToggle#myDisplayMode-large').prop('onClick')(event, 'large');
			});

			// then
			expect(contextValue.setDisplayMode).toHaveBeenNthCalledWith(1, 'large');
		});
	});

	describe('controlled mode', () => {
		it('should render selected display mode', () => {
			// given
			const contextValue = { displayMode: 'table', setDisplayMode: jest.fn(), t: getDefaultT() };

			// when
			const wrapper = mount(
				<ListContext.Provider value={contextValue}>
					<ListDisplayMode id="myDisplayMode" selectedDisplayMode="large" />
				</ListContext.Provider>,
			);

			// then
			const buttonLarge = wrapper.find(
				'ButtonIconToggle#myDisplayMode-large .CoralButtonIconToggle',
			);
			expect(buttonLarge.text()).toBe('Set Expanded as current display mode.');
			expect(buttonLarge.prop('isActive')).toBe(true);
		});

		it('should call props.onChange with new display mode', () => {
			// given
			const contextValue = { displayMode: 'table', setDisplayMode: jest.fn(), t: getDefaultT() };
			const onChange = jest.fn();

			const wrapper = mount(
				<ListContext.Provider value={contextValue}>
					<ListDisplayMode id="myDisplayMode" selectedDisplayMode="large" onChange={onChange} />
				</ListContext.Provider>,
			);

			const event = { target: {} };
			expect(contextValue.setDisplayMode).not.toBeCalled();

			// when: react-bootstrap use value-event instead of event-value
			act(() => {
				wrapper.find('ButtonIconToggle#myDisplayMode-large').prop('onClick')(event, 'large');
			});

			// then
			expect(contextValue.setDisplayMode).not.toBeCalled();
			expect(onChange).toBeCalledWith(event, 'large');
		});
	});
});
