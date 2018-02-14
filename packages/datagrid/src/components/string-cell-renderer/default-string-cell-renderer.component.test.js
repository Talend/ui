import React from 'react';
import { shallow } from 'enzyme';

import DefaultStringCellRenderer from './default-string-cell-renderer.component';

describe('#DefaultDateCellRenderer', () => {
	it('should render DefaultDateCellRenderer', () => {
		const wrapper = shallow(<DefaultStringCellRenderer data={{ value: 'value' }} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
