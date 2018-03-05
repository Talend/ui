import React from 'react';
import { shallow } from 'enzyme';

import DefaultPinHeaderRenderer from './PinHeaderRenderer.component';

describe('#DefaultBooleanCellRenderer', () => {
	it('should render DefaultBooleanCellRenderer', () => {
		const wrapper = shallow(<DefaultPinHeaderRenderer />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
