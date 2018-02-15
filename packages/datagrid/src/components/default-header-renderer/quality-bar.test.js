import React from 'react';
import { shallow } from 'enzyme';

import QualityBar from './quality-bar.component';

describe('#DefaultBooleanCellRenderer', () => {
	it('should render DefaultBooleanCellRenderer', () => {
		const wrapper = shallow(<QualityBar invalid={33} empty={33} valid={34} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
