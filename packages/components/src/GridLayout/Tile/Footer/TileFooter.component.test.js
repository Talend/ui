import React from 'react';
import { shallow } from 'enzyme';

import Tile from '../index';

describe('Tile Footer', () => {
	it('should render footer with action on the right', () => {
		// given
		// when
		const wrapper = shallow(
			<Tile.Footer>
				<span>Test</span>
			</Tile.Footer>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
