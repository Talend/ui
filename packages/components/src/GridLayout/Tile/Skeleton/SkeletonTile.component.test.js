import React from 'react';
import { shallow } from 'enzyme';
import SkeletonTile from './SkeletonTile.component';

describe('skeleton tile', () => {
	it('should compute skeleton tile', () => {
		// given
		// when
		const wrapper = shallow(<SkeletonTile />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
