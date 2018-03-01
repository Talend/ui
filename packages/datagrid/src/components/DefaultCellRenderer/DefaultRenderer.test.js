import React from 'react';
import { shallow } from 'enzyme';

import DefaultRenderer from './DefaultRenderer.component';

describe('#DefaultRenderer', () => {
	it('should render DefaultRenderer', () => {
		const wrapper = shallow(<DefaultRenderer data={{ value: true }} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
