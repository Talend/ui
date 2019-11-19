import React from 'react';
import { mount } from 'enzyme';
import BadgeIcon from './BadgeIcon.component';

describe('BadgeIcon', () => {
	it('should default render', () => {
		// given
		const name = 'my icon name';
		// when
		const wrapper = mount(<BadgeIcon name={name} />);
		// then
		expect(wrapper.html()).toMatchSnapshot();
	});
});
