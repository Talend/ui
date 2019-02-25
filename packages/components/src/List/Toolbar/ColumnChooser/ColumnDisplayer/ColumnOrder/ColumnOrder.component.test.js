import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import ColumnOrder, { OrderDisplay } from './ColumnOrder.component';

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
			t,
		};
		// when
		const wrapper = mount(<ColumnOrder {...props} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
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
