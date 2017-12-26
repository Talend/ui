import React from 'react';
import { shallow } from 'enzyme';

import NoRows from './NoRows.component';

describe('NoRows', () => {
	it('should show no result', () => {
		const wrapper = shallow(<NoRows />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should show custom label', () => {
		const wrapper = shallow(<NoRows emptyListLabel="No users" />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
