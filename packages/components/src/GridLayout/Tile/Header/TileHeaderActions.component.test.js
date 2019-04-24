import React from 'react';
import { shallow } from 'enzyme';

import Tile from '../index';

describe('Tile Header actions', () => {
	it('should render right actions', () => {
		// given
		const addItemClick = jest.fn();
		const removedItemClick = jest.fn();
		const addItemAction = {
			label: 'Add item',
			icon: 'talend-user-circle',
			id: 'test',
			onClick: addItemClick,
		};
		const removeItemAction = {
			label: 'remove item',
			icon: 'talend-user-circle',
			id: 'test1',
			onClick: removedItemClick,
		};
		// when
		const wrapper = shallow(
			<Tile.HeaderActions right actions={[addItemAction, removeItemAction]}/>
		);
		wrapper.find('ActionIconToggle').at(0).simulate('click', { stopPropagation: () => {} });

		// then
		expect(wrapper.find('.tc-tile-header-right').length).toBe(1);
		expect(wrapper.find('.tc-tile-header-left').length).toBe(0);
		expect(wrapper.find('ActionIconToggle').length).toBe(2);
		expect(addItemClick).toHaveBeenCalled();
		expect(removedItemClick).not.toHaveBeenCalled();
	});
});
