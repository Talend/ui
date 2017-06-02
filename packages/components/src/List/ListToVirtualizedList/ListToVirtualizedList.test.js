import React from 'react';
import { shallow } from 'enzyme';

import ListToVirtualizedList from './ListToVirtualizedList.component';

describe('ListToVirtualizedList', () => {
	it('should render', () => {
		const props = {
			id: 'mylistid',
			items: [{ id: 3 }],
			columns: [{ key: 'id', label: 'Id' }],
			titleProps: {

			},
		};
		const wrapper = shallow(
			<ListToVirtualizedList {...props} />
		);
		expect(wrapper.root.node).toMatchSnapshot();
	});
});
