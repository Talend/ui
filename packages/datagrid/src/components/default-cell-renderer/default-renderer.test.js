import React from 'react';
import { shallow } from 'enzyme';

import DefaultRenderer from './default-renderer.component';

describe('#DefaultRenderer', () => {
	it('should render DefaultBooleanCellRenderer', () => {
		const wrapper = shallow(<DefaultRenderer data={{ value: true }} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
