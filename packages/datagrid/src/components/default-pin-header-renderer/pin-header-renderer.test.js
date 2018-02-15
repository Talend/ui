import React from 'react';
import { shallow } from 'enzyme';

import DefaultPinHeaderRenderer from './pin-header-renderer.component';

describe('#DefaultBooleanCellRenderer', () => {
	it('should render DefaultBooleanCellRenderer', () => {
		const wrapper = shallow(<DefaultPinHeaderRenderer />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
