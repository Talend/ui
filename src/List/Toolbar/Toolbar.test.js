import React from 'react';
import { shallow } from 'enzyme';

import Toolbar from './Toolbar.component';

const props = {
	onSelectDisplayMode: jest.fn(),
	onSelectSortBy: jest.fn(),
	onFilter: jest.fn(),
	sortBy: [
		{ id: 'id', name: 'Name', selected: true },
		{ id: 'name', name: 'Name' },
	],
	sortDesc: true,
};

describe('Toolbar', () => {
	it('should let me click the add btn', () => {
		const tprops = Object.assign({}, props);
		tprops.onClickAdd = jest.fn();
		const wrapper = shallow(
			<Toolbar {...tprops} />
		);
		wrapper.find('.navbar-btn[bsStyle="success"]').simulate('click');
		expect(tprops.onClickAdd).toBeCalled();
	});
});
