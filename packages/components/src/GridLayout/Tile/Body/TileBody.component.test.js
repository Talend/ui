import React from 'react';
import { shallow, mount } from 'enzyme';
import Tile from '../index';

describe('tile\'s body', () => {
	it('should compute tile body', () => {
		// given
		// when
		const wrapper = shallow(
			<Tile.Body>
				my body
			</Tile.Body>
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
		// expect(wrapper.getElement()).toHaveLength(1);
	});
});
