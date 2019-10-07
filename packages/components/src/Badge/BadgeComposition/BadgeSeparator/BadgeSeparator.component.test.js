import React from 'react';
import { mount } from 'enzyme';
import BadgeSeparator from './BadgeSeparator.component';

describe('BadgeSeparator', () => {
	it('should default render', () => {
		// given nothing
		// when
		const wrapper = mount(<BadgeSeparator />);
		// then
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should render with icon separator class', () => {
		// given
		const iconSeparator = true;
		// when
		const wrapper = mount(<BadgeSeparator iconSeparator={iconSeparator} />);
		// then
		expect(wrapper.find('span').prop('className')).toEqual(
			'tc-badge-separator theme-tc-badge-separator tc-badge-separator-icon theme-tc-badge-separator-icon',
		);
	});
});
