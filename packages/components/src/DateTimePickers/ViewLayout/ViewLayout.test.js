import React from 'react';
import { shallow } from 'enzyme';

import ViewLayout from './ViewLayout.component';

describe('ViewLayout', () => {
	it('should render a ViewLayout', () => {
		const header = {
			leftItem: <span>left item</span>,
			middleItem: <span>middle item</span>,
			rightItem: <span>right item</span>,
		};

		const bodyNode = (
			<whateverBodyNode />
		);

		// when
		const wrapper = shallow(<ViewLayout header={header} bodyNode={bodyNode} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
