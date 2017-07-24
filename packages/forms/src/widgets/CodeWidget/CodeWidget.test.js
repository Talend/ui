import React from 'react';
import { shallow } from 'enzyme';

import CodeWidget from './CodeWidget.component';

describe('CodeWidget', () => {
	it('should render', () => {
		const wrapper = shallow(
			<CodeWidget />
		);
		expect(wrapper).toMatchSnapshot();
	});
});
