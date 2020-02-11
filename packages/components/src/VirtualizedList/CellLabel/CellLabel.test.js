import React from 'react';
import { shallow } from 'enzyme';

import CellLabel from './CellLabel.component';

describe('CellLabel', () => {
	it('should render label', () => {
		// when
		const wrapper = shallow(<CellLabel cellData="label" rowIndex={25} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
