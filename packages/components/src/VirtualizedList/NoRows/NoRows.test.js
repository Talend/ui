import React from 'react';
import { shallow } from 'enzyme';

import NoRows from './NoRows.component';

describe('NoRows', () => {
	it('should show no result', () => {
		const wrapper = shallow(<NoRows />);

		expect(wrapper.node).toMatchSnapshot();
	});
});
