import React from 'react';
import { shallow } from 'enzyme';

import ResourcePicker from './ResourcePicker.component';

describe('ResourcePicker component', () => {
	it('should render ResourceList', () => {
		const wrapper = shallow(<ResourcePicker />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
