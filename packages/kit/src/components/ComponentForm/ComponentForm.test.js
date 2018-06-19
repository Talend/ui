import React from 'react';
import { shallow } from 'enzyme';

import ComponentForm from './ComponentForm.component';

describe('ComponentForm', () => {
	it('should render', () => {
		const wrapper = shallow(<ComponentForm />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
