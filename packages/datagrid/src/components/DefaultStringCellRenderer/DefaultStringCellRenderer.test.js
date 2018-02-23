import React from 'react';
import { shallow } from 'enzyme';

import DefaultStringCellRenderer from './DefaultStringCellRenderer.component';

describe('#DefaultDateCellRenderer', () => {
	it('should render DefaultDateCellRenderer', () => {
		const wrapper = shallow(<DefaultStringCellRenderer data={{ value: 'value' }} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
