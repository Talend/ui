import React from 'react';
import { shallow } from 'enzyme';

import DefaultIntCellRenderer from './DefaultIntCellRenderer.component';

describe('#DefaultDateCellRenderer', () => {
	it('should render DefaultDateCellRenderer', () => {
		const wrapper = shallow(<DefaultIntCellRenderer data={{ value: 42.42 }} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
