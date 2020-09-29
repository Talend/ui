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
	it('should pass the props label to the button', () => {
		// given
		const onClick = jest.fn();
		const props = {
			label: 'My custom label',
			id: 'my-id',
			onClick,
			t: getDefaultT(),
		};
		// when
		const wrapper = mount(<BadgeDelete {...props} />);
		// then
		expect(wrapper.find('button').prop('aria-label')).toBe('My custom label');
	});
	it('should pass the props dataFeature to the button', () => {
		// given
		const onClick = jest.fn();
		const props = {
			id: 'my-id',
			dataFeature: 'feature-delete',
			onClick,
			t: getDefaultT(),
		};
		// when
		const wrapper = mount(<BadgeDelete {...props} />);
		// then
		expect(wrapper.find('button').prop('data-feature')).toBe('feature-delete');
	});
});
