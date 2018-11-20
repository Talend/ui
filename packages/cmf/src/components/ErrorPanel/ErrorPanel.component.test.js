import React from 'react';
import { shallow } from 'enzyme';

import Component from './ErrorPanel.component';

describe('Component ErrorPanel', () => {
	it('should render', () => {
		const wrapper = shallow(
			<Component />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
