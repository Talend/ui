import React from 'react';
import { mount } from 'enzyme';
import BadgeDelete from './BadgeDelete.component';
import getDefaultT from '../../../translate';

describe('BadgeDelete', () => {
	it('should render', () => {
		// given
		const onClick = jest.fn();
		const props = {
			id: 'my-id',
			onClick,
			t: getDefaultT(),
		};
		// when
		const wrapper = mount(<BadgeDelete {...props} />);
		// then
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should trigger on click function', () => {
		// given
		const onClick = jest.fn();
		const props = {
			id: 'my-id',
			onClick,
			t: getDefaultT(),
		};
		// when
		const wrapper = mount(<BadgeDelete {...props} />);
		// then
		wrapper.find('button').simulate('click');
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
