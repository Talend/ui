/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

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

	it('should handle text filter changes (uncontrolled mode)', () => {
		// given
		const context = {
			...defaultContext,
			textFilter: '',
			setTextFilter: jest.fn(),
		};

		// when
		let wrapper;
		act(() => {
			wrapper = mount(
				<ListContext.Provider value={context}>
					<TextFilter id="myTextFilter" initialDocked />
				</ListContext.Provider>,
			);

			wrapper
				.find('FilterBar')
				.at(0)
				.prop('onToggle')();
			wrapper
				.find('FilterBar')
				.at(0)
				.prop('onFilter')({}, 'my-filter-value');
		});
		wrapper.update();

		// then
		expect(
			wrapper
				.find('FilterBar')
				.at(0)
				.prop('docked'),
		).toBe(false);
		expect(context.setTextFilter).toHaveBeenCalledWith('my-filter-value');
	});

	it('should call the change callbacks when they are provided (controlled mode)', () => {
		// given
		const onChange = jest.fn();
		const onToggle = jest.fn();

		// when
		let wrapper;
		act(() => {
			wrapper = mount(
				<ListContext.Provider value={defaultContext}>
					<TextFilter id="myTextFilter" onChange={onChange} onToggle={onToggle} />
				</ListContext.Provider>,
			);

			wrapper
				.find('FilterBar')
				.at(0)
				.prop('onToggle')();
			wrapper
				.find('FilterBar')
				.at(0)
				.prop('onFilter')({}, 'my-filter-value');
		});

		// then
		expect(onToggle).toHaveBeenCalled();
		expect(onChange).toHaveBeenCalledWith({}, 'my-filter-value');
	});

	it('should not be docked when text filter is not empty', () => {
		// given
		const context = {
			...defaultContext,
			textFilter: 'my-filter-value',
			setTextFilter: jest.fn(),
		};

		// when
		let wrapper;
		act(() => {
			wrapper = mount(
				<ListContext.Provider value={context}>
					<TextFilter id="myTextFilter" initialDocked />
				</ListContext.Provider>,
			);

			wrapper
				.find('FilterBar')
				.at(0)
				.prop('onToggle')();
		});
		wrapper.update();

		// then
		expect(
			wrapper
				.find('FilterBar')
				.at(0)
				.prop('docked'),
		).toBe(false);
		expect(
			wrapper
				.find('FilterBar')
				.at(0)
				.prop('value'),
		).toBe('my-filter-value');

		// when
		act(() => {
			wrapper
				.find('FilterBar')
				.at(0)
				.prop('onToggle')();
		});
		wrapper.update();

		// then
		expect(
			wrapper
				.find('FilterBar')
				.at(0)
				.prop('docked'),
		).toBe(false);
	});

	it('should be docked when text filter is empty', () => {
		// given
		const context = {
			...defaultContext,
			textFilter: '',
			setTextFilter: jest.fn(),
		};

		// when
		let wrapper;
		act(() => {
			wrapper = mount(
				<ListContext.Provider value={context}>
					<TextFilter id="myTextFilter" initialDocked />
				</ListContext.Provider>,
			);

			wrapper
				.find('FilterBar')
				.at(0)
				.prop('onToggle')();
		});
		wrapper.update();

		// then
		expect(
			wrapper
				.find('FilterBar')
				.at(0)
				.prop('docked'),
		).toBe(false);

		// when
		act(() => {
			wrapper
				.find('FilterBar')
				.at(0)
				.prop('onToggle')();
		});
		wrapper.update();

		// then
		expect(
			wrapper
				.find('FilterBar')
				.at(0)
				.prop('docked'),
		).toBe(true);
	});
});
