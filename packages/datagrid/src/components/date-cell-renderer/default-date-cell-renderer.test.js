import React from 'react';
import { shallow } from 'enzyme';

import DefaultDateCellRenderer from './default-date-cell-renderer.component';

describe('#DefaultDateCellRenderer', () => {
	it('should render DefaultDateCellRenderer', () => {
		const wrapper = shallow(<DefaultDateCellRenderer data={{ value: '14/02/2018' }} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
