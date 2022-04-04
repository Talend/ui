import React from 'react';
import renderer from 'react-test-renderer';
import Item from './Item.component';

const selectedItem = {
	label: 'toto',
	checked: true,
};

describe('Item', () => {
	it('should display a selected item', () => {
		// given
		const props = {
			id: '0-item',
			item: selectedItem,
			dataTest: 'item',
		};

		// when
		const wrapper = renderer.create(<Item {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
