import React from 'react';
import { shallow } from 'enzyme';

import ViewHeader from './ViewHeader.component';

describe('ViewHeader', () => {
	it('should render a ViewHeader', () => {
		const props = {
			leftItem: <span>left item</span>,
			middleItem: <span>middle item</span>,
			rightItem: <span>right item</span>,
		};

		// when
		const wrapper = shallow(<ViewHeader {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
