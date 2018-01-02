import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import NoRows from './NoRows.component';

describe('NoRows', () => {
	it('should show no result', () => {
		const wrapper = mount(<NoRows />);

		expect(toJson(wrapper.find('NoRows'))).toMatchSnapshot();
	});
});
