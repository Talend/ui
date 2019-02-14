import React from 'react';
import { shallow } from 'enzyme';
import ColumnDisplayer, {
	ColumnOrder,
	OrderDisplay,
	ColumnVisibility,
} from './ColumnDisplayer.component';

describe('ColumnVisibility', () => {
	const onChange = jest.fn();
	const value = true;
	it('should render when locked', () => {
		// given
		const props = {
			locked: true,
			onChange,
			value,
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
		};
		// when
		const wrapper = shallow(<ColumnVisibility {...props} />);
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
