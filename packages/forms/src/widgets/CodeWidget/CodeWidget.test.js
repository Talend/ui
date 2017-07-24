import React from 'react';
import { shallow } from 'enzyme';

import CodeWidget, {
	AceCodeWidget,
	TextareaCodeWidget,
} from './CodeWidget.component';

describe('CodeWidget', () => {
	it('should be AceCodeWidget', () => {
		expect(CodeWidget).toBe(AceCodeWidget);
	});

	it('should render ReactAce', () => {
		const wrapper = shallow(
			<CodeWidget />
		);
		expect(wrapper.root.node).toMatchSnapshot();
	});
});
