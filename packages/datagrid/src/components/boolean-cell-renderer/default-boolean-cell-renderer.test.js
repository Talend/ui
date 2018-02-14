import React from 'react';
import { shallow } from 'enzyme';

import DefaultBooleanCellRenderer from './default-boolean-cell-renderer.component';

describe('#DefaultBooleanCellRenderer', () => {
	it('should render DefaultBooleanCellRenderer', () => {
		const wrapper = shallow(<DefaultBooleanCellRenderer data={{ value: true }} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
