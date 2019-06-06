import React from 'react';
import { shallow } from 'enzyme';
import Tile from '../index';

describe("tile's body", () => {
	it('should compute tile body', () => {
		// when
		const wrapper = shallow(<Tile.Body>my body</Tile.Body>);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
