import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import ColumnOrder, { OrderDisplay } from './ColumnOrder.component';
import { WSAVERNOTSUPPORTED } from 'constants';

const t = jest.fn((_, translationValue) => translationValue.defaultValue);

describe('ColumnOrder', () => {
	it('should render in non edit mode', () => {
		// given
		const props = {
			length: 3,
			order: 1,
			locked: true,
			value: 1,
			onBlur: jest.fn(),
			onKeyPress: jest.fn(),
			t,
		};
		// when
		const wrapper = mount(<ColumnOrder {...props} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render in edit mode', () => {
		// given
		const props = {
			length: 3,
			order: 1,
			locked: false,
			value: 1,
			onBlur: jest.fn(),
			onKeyPress: jest.fn(),
			forceEditMode: true,
			t,
		};
		// when
		const wrapper = mount(<ColumnOrder {...props} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('ColoumnOrder event and hook', () => {
	it('should change the current value', () => {
		// given
		const props = {
			length: 3,
			order: 1,
			locked: false,
			value: 1,
			onBlur: jest.fn(),
			onKeyPress: jest.fn(),
			t,
		};
		// when
		const wrapper = mount(<ColumnOrder {...props} />);
		expect(wrapper.find('button').text()).toEqual('1/ 3');
		wrapper.find('button').simulate('click');
		wrapper.find('input').simulate('change', { target: { value: 15 } });
		// then
		expect(wrapper.find('input').prop('value')).toBe(15);
	});
});

describe('OrderDisplay', () => {
	it('should return', () => {
		// given
		const props = {
			order: 1,
			length: 10,
		};
		// when
		const wrapper = shallow(<OrderDisplay {...props} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
