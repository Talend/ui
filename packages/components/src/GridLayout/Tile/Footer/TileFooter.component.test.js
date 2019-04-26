import React from 'react';
import { shallow, mount } from 'enzyme';
import Tile from '../index';

describe('tile\'s footer', () => {
	it('should compute tile footer', () => {
		// given
		// when
		const wrapper = shallow(
			<Tile.Footer>
				my container
			</Tile.Footer>
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
		// expect(wrapper.getElement()).toHaveLength(1);
	});
});
