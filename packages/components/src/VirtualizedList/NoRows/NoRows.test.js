import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { NoRowsComponent } from './NoRows.component';

describe('NoRows', () => {
	it('should show no result', () => {
		const wrapper = mount(<NoRowsComponent />);

		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
