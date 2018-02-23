import React from 'react';
import { shallow } from 'enzyme';

import DefaultDateCellRenderer from './DefaultDateCellRenderer.component';

describe('#DefaultDateCellRenderer', () => {
	it('should render DefaultDateCellRenderer', () => {
		const wrapper = shallow(<DefaultDateCellRenderer data={{ value: '14/02/2018' }} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
