import React from 'react';
import { shallow } from 'enzyme';
import ColumnDisplayer, { ColumnVisibility } from './ColumnDisplayer.component';

const t = jest.fn((_, translationValue) => translationValue.defaultValue);

describe('ColumnVisibility', () => {
	const onChange = jest.fn();
	const value = true;
	it('should render when locked', () => {
		// given
		const props = {
			locked: true,
			onChange,
			value,
			t,
		};
		// when
		const wrapper = shallow(<ColumnVisibility {...props} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render the checkbox', () => {
		// given
		const props = {
			locked: false,
			onChange,
			value,
			t,
		};
		// when
		const wrapper = shallow(<ColumnVisibility {...props} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('ColumnDisplayer', () => {
	it('should render', () => {
		// given
		const props = {
			label: 'myLabel',
			hidden: false,
			locked: false,
			order: 1,
			length: 3,
			onChangeVisibility: jest.fn(),
			onBlurOrder: jest.fn(),
			onKeyPressOrder: jest.fn(),
			t,
		};
		// when
		const wrapper = shallow(<ColumnDisplayer {...props} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
