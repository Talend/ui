import React from 'react';
import { mount } from 'enzyme';
import BadgeLabel from './BadgeLabel.component';

describe('BadgeLabel', () => {
	it('should default render', () => {
		// given
		const label = 'my label';
		// when
		const wrapper = mount(<BadgeLabel label={label} />);
		// then
		expect(
			wrapper
				.find('.tc-badge-label-text')
				.at(0)
				.text(),
		).toBe(label);
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should render with category', () => {
		// given
		const label = 'my label';
		const category = 'my category';
		// when
		const wrapper = mount(<BadgeLabel label={label} category={category} />);
		// then
		expect(
			wrapper
				.find('.tc-badge-label-text-with-categ')
				.at(0)
				.text(),
		).toBe(label);
	});
	it('should render with children', () => {
		// given
		const label = 'my label';
		const childText = 'Composition is the key to use React correctly';
		// when
		const wrapper = mount(
			<BadgeLabel label={label}>
				<div id="my child">{childText}</div>
			</BadgeLabel>,
		);
		// then
		expect(wrapper.find('div[id="my child"]').text()).toEqual(childText);
	});
});
