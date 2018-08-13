import React from 'react';
import { shallow } from 'enzyme';
import Item from './Item.component';

const item = {
	label: 'toto',
	onChange: jest.fn(),
};

describe('Item', () => {
	it('should trigger callback on item click', () => {
		// given
		const wrapper = shallow(<Item item={item} />);
		const checkbox = wrapper
			.dive()
			.shallow()
			.find('[type="checkbox"]');
		const event = { target: {} };

		// when
		checkbox.at(0).simulate('change', event);

		// then
		expect(item.onChange).toBeCalledWith(event, item, undefined);
	});
});
