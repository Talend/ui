import React from 'react';
import { shallow } from 'enzyme';

import UIForm from './UIForm.component';

describe('UIForm', () => {
	it('should render', () => {
		const wrapper = shallow(
			<UIForm />
		);
		expect(wrapper).toMatchSnapshot();
	});
});
