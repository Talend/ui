import React from 'react';
import { shallow } from 'enzyme';

import DefaultBooleanCellRenderer from './DefaultBooleanCellRenderer.component';

describe('#DefaultBooleanCellRenderer', () => {
	it('should render DefaultBooleanCellRenderer', () => {
		const wrapper = shallow(<DefaultBooleanCellRenderer data={{ value: true }} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
