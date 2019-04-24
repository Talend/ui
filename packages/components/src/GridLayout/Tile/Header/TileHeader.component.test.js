import React from 'react';
import { shallow } from 'enzyme';

import Tile from '../index';

describe('Tile Header', () => {
	it('should render header with action on the right', () => {
		// given
		const addItemClick = jest.fn();
		const addItemAction = {
			label: 'Add item',
			icon: 'talend-user-circle',
			id: 'test',
			onClick: addItemClick,
		};
		// when
		const wrapper = shallow(
			<Tile.Header>
				<span>Test</span>
				<Tile.HeaderActions actions={[addItemAction]}/>
			</Tile.Header>
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
