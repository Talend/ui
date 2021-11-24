import React from 'react';
import { shallow } from 'enzyme';
import Grid from './index';

describe('Grid tiles', () => {
	it('should compute tile with default skeleton', () => {
		// given
		// when
		const wrapper = shallow(<Grid isLoading />);

		// then
		expect(wrapper.getElement().props.children.length).toBe(3);
		expect(wrapper.getElement().props.children[0].key).toBe('skel1');
	});
	it('should compute tile custom skeleton', () => {
		// given
		const defaultConfiguration = [
			{ key: 'skel4', 'data-grid': { w: 2, h: 2, x: 0, y: 0, i: 'skel4' } },
		];
		// when
		const wrapper = shallow(<Grid isLoading skeletonConfiguration={defaultConfiguration} />);

		// then
		expect(wrapper.getElement().props.children.length).toBe(1);
		expect(wrapper.getElement().props.children[0].key).toBe('skel4');
	});
});
