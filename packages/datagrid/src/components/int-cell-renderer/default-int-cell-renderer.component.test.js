import React from 'react';
import { shallow } from 'enzyme';

import DefaultIntCellRenderer from './default-int-cell-renderer.component';

describe('#DefaultDateCellRenderer', () => {
	it('should render DefaultDateCellRenderer', () => {
		const wrapper = shallow(<DefaultIntCellRenderer data={{ value: 42.42 }} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
