import React from 'react';
import { mount } from 'enzyme';
import Skeleton from './Skeleton.component';

describe('Skeleton', () => {
	function t(msgid, options = {}) {
		if (options.type) {
			return options.defaultValue.replace('{{type}}', options.type);
		}
		return options.defaultValue || msgid;
	}
	it('should render span with aria label', () => {
		const wrapper = mount(<Skeleton type="text" t={t} />);
		const element = wrapper.find('.tc-skeleton');
		expect(element.type()).toBe('span');
		expect(element.props()['aria-label']).toBe('text (loading)');
	});
	it('should use style to apply with/height', () => {
		const wrapper = mount(<Skeleton type="text" t={t} width={80} height={30} />);
		expect(wrapper.find('.tc-skeleton').props().style).toEqual({ height: 30, width: 80 });
	});
	it('should use className to apply size', () => {
		const wrapper = mount(<Skeleton type="text" t={t} size={Skeleton.SIZES.small} />);
		expect(wrapper.find('.tc-skeleton-text-small')).not.toBeUndefined();
	});
	it('should render icon for type=icon', () => {
		const wrapper = mount(<Skeleton type="icon" name="test-icon" t={t} />);
		expect(wrapper.find('Icon')).not.toBeUndefined();
	});
});
