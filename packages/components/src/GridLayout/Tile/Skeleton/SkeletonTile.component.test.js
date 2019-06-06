import React from 'react';
import { shallow } from 'enzyme';
import Tile from '../index';

describe('skeleton tile', () => {
	it('should compute skeleton tile', () => {
		// given
		// when
		const wrapper = shallow(<Tile.Skeleton />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
