import React from 'react';
import { mount, shallow } from 'enzyme';
import dateMock from '../../../../../../../mocks/dateMock';

import YearPicker from './YearPicker.component';

describe('YearPicker', () => {
	afterEach(() => {
		dateMock.restore();
	});

	it('should render', () => {
		// given
		dateMock.mock(new Date(2015, 11, 31));

		// when
		const wrapper = shallow(<YearPicker selectedYear={2012} onSelect={jest.fn()} />).shallow();

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should default render with current year in middle when "selectedYear" prop is not provided', () => {
		// given
		dateMock.mock(new Date(2025, 1, 20));

		// when
		const wrapper = shallow(<YearPicker onSelect={jest.fn()} />).shallow();

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should callback with the year picked', () => {
		// given
		const firstSelectableYear = 2011;
		const selectedYear = 2014;
		const onSelect = jest.fn();
		const wrapper = shallow(
			<YearPicker selectedYear={selectedYear} onSelect={onSelect} />,
		).shallow();
		expect(onSelect).not.toBeCalled();

		const event = { target: {} };

		// when
		wrapper.find('.tc-date-picker-year').at(0).simulate('click', event);

		expect(onSelect).toBeCalledWith(event, firstSelectableYear);
	});

	it('should scroll up by 1 year', () => {
		// given
		const wrapper = mount(<YearPicker selectedYear={2012} onSelect={jest.fn()} />);
		expect(wrapper.find('.tc-date-picker-year').at(0).text()).toBe('2009');

		// when
		wrapper.find('button.tc-date-picker-scroll-up').simulate('click');

		// then
		expect(wrapper.find('.tc-date-picker-year').at(0).text()).toBe('2008');
	});

	it('should scroll down by 1 year', () => {
		// given
		const wrapper = mount(<YearPicker selectedYear={2012} onSelect={jest.fn()} />);
		expect(wrapper.find('.tc-date-picker-year').at(0).text()).toBe('2009');

		// when
		wrapper.find('button.tc-date-picker-scroll-down').simulate('click');

		// then
		expect(wrapper.find('.tc-date-picker-year').at(0).text()).toBe('2010');
	});

	it('should scroll down via mouse', () => {
		// given
		const wrapper = mount(<YearPicker selectedYear={2012} onSelect={jest.fn()} />);
		expect(wrapper.find('.tc-date-picker-year').at(0).text()).toBe('2009');

		const event = { deltaY: 600.00131424, preventDefault: jest.fn() };

		// when
		wrapper.find('ol').simulate('wheel', event);

		// then
		expect(wrapper.find('.tc-date-picker-year').at(0).text()).toBe('2012');
	});

	it('should scroll up via mouse', () => {
		// given
		const wrapper = mount(<YearPicker selectedYear={2012} onSelect={jest.fn()} />);
		expect(wrapper.find('.tc-date-picker-year').at(0).text()).toBe('2009');

		const event = { deltaY: -600.00131424, preventDefault: jest.fn() };

		// when
		wrapper.find('ol').simulate('wheel', event);

		// then
		expect(wrapper.find('.tc-date-picker-year').at(0).text()).toBe('2006');
	});

	it('should scroll slowly via mouse', () => {
		// given
		const wrapper = mount(<YearPicker selectedYear={2012} onSelect={jest.fn()} />);
		expect(wrapper.find('.tc-date-picker-year').at(0).text()).toBe('2009');

		const event = { deltaY: 4.00131424, preventDefault: jest.fn() };

		// when
		wrapper.find('ol').simulate('wheel', event);

		// then
		expect(wrapper.find('.tc-date-picker-year').at(0).text()).toBe('2010');
	});

	it('should scroll fastly via mouse', () => {
		// given
		const wrapper = mount(<YearPicker selectedYear={2012} onSelect={jest.fn()} />);
		expect(wrapper.find('.tc-date-picker-year').at(0).text()).toBe('2009');

		const event = { deltaY: 800.00131424, preventDefault: jest.fn() };

		// when
		wrapper.find('ol').simulate('wheel', event);

		// then
		expect(wrapper.find('.tc-date-picker-year').at(0).text()).toBe('2012');
	});
});
