import React from 'react';
import { shallow, mount } from 'enzyme';
import Tile from './index';

describe('Grid tiles', () => {
	it('should compute tile', () => {
		// given
		// when
		const wrapper = mount(<Tile.Container>my container</Tile.Container>);

		// then
		expect(wrapper.find('Tile').getElement()).toMatchSnapshot();
		// expect(wrapper.getElement()).toHaveLength(1);
	});
});
