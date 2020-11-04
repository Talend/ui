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
		setFilteredColumns: jest.fn(),
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
		const event = { target: { value: 'my-filter-value' } };

		// when
		let wrapper;
		act(() => {
			wrapper = mount(
				<ListContext.Provider value={context}>
					<TextFilter id="myTextFilter" initialDocked debounceTimeout={0} />
				</ListContext.Provider>,
			);

			wrapper.find('button#myTextFilter').simulate('click');
		});
		wrapper.update();
		wrapper.find('input').at(0).simulate('change', event);

		// then
		expect(context.setTextFilter).toHaveBeenCalledWith('my-filter-value');
	});

	it('should deal with columns on which apply filter', () => {
		// when
		mount(
			<ListContext.Provider value={defaultContext}>
				<TextFilter id="myTextFilter" applyOn={['foo']} />
			</ListContext.Provider>,
		);

		// then
		expect(defaultContext.setFilteredColumns).toHaveBeenCalledWith(['foo']);
	});

	it('should call the toggle callback when they are provided (controlled mode)', () => {
		// given
		const onToggle = jest.fn();

		// when
		let wrapper;
		act(() => {
			wrapper = mount(
				<ListContext.Provider value={defaultContext}>
					<TextFilter id="myTextFilter" initialDocked onToggle={onToggle} />
				</ListContext.Provider>,
			);

			wrapper.find('button#myTextFilter').simulate('click');
		});
		wrapper.update();

		// then
		expect(onToggle).toHaveBeenCalled();
	});

	it('should call the callback on change (controlled mode)', () => {
		// given
		const onChange = jest.fn();
		const event = { target: { value: 'my-filter-value' } };
		const wrapper = mount(
			<ListContext.Provider value={defaultContext}>
				<TextFilter
					id="myTextFilter"
					initialDocked={false}
					onChange={onChange}
					debounceTimeout={0}
					value="lol"
				/>
			</ListContext.Provider>,
		);

		// when
		wrapper.find('input').at(0).simulate('change', event);

		// then
		expect(onChange).toHaveBeenCalledWith(expect.anything(), 'my-filter-value');
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

			wrapper.find('button#myTextFilter').simulate('click');
		});
		wrapper.update();

		// then
		expect(wrapper.find('button#myTextFilter').length).toBe(0);
		expect(wrapper.find('input').length).toBe(1);
		expect(wrapper.find('input').at(0).prop('value')).toBe('my-filter-value');

		// when
		act(() => {
			wrapper.find('input').simulate('blur'); // blur with no input value toggles the search
		});
		wrapper.update();

		// then
		expect(wrapper.find('button#myTextFilter').length).toBe(0);
		expect(wrapper.find('input').length).toBe(1);
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
			wrapper.find('button#myTextFilter').simulate('click');
		});
		wrapper.update();

		// then
		expect(wrapper.find('button#myTextFilter').length).toBe(0);
		expect(wrapper.find('input').length).toBe(1);

		// when
		act(() => {
			wrapper.find('input').simulate('blur'); // blur with no input value toggles the search
		});
		wrapper.update();

		// then
		expect(wrapper.find('button#myTextFilter').length).toBe(1);
		expect(wrapper.find('input').length).toBe(0);
	});
});
