import React from 'react';
import { mount } from 'enzyme';
import BadgeCategory from './BadgeCategory.component';

describe('BadgeCategory', () => {
	it('should render with the label', () => {
		// given
		const label = 'my badge label';
		// when
		const wrapper = mount(<BadgeCategory label={label} />);
		// then
		expect(
			wrapper
				.find('.tc-badge-category')
				.at(0)
				.text(),
		).toBe(label);
		expect(wrapper.html()).toMatchSnapshot();
	});
});
