import React from 'react';
import { shallow } from 'enzyme';

import ViewLayout from './ViewLayout.component';

describe('ViewLayout', () => {
	it('should render a ViewLayout', () => {
		const header = {
			leftNode: <span>left item</span>,
			middleNode: <span>middle item</span>,
			rightNode: <span>right item</span>,
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
