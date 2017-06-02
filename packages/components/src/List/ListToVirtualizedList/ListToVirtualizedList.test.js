import React from 'react';
import { shallow } from 'enzyme';

import ListToVirtualizedList from './ListToVirtualizedList.component';

describe('ListToVirtualizedList', () => {
	it('should render', () => {
		const wrapper = shallow(
			<ListToVirtualizedList />
		);
		expect(wrapper).toMatchSnapshot();
	});
});
