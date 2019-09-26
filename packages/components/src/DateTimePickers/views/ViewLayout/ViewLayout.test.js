import React from 'react';
import { shallow } from 'enzyme';

import ViewLayout from './ViewLayout.component';

describe('ViewLayout', () => {
	it('should render a ViewLayout', () => {
		const header = {
			leftElement: <span>left item</span>,
			middleElement: <span>middle item</span>,
			rightElement: <span>right item</span>,
		};

		const bodyElement = <whateverBodyElement />;

		// when
		const wrapper = shallow(<ViewLayout header={header} bodyElement={bodyElement} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
