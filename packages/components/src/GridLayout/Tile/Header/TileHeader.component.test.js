import React from 'react';
import { shallow } from 'enzyme';

import Tile from '../index';

describe('Tile Header', () => {
	it('should render header with action on the right', () => {
		// given
		// when
		const wrapper = shallow(
			<Tile.Header>
				<span>Test</span>
			</Tile.Header>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
