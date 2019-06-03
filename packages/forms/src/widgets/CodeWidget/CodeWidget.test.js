import React from 'react';
import { shallow, mount } from 'enzyme';

import CodeWidget from './CodeWidget.component';

describe('CodeWidget', () => {
	xit('should be AceCodeWidget', () => {
		expect(CodeWidget.displayName).toBe('AceCodeWidget');
	});

	xit('should render ReactAce', () => {
		const wrapper = shallow(<CodeWidget />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	xit('should check config props', () => {
		const wrapper = shallow(<CodeWidget options={{ height: '250px' }} />);
		expect(wrapper.props().height).toEqual('250px');
	});

	xit('should support formContext.codeWidgetProps customization', () => {
		const formContext = {
			codeWidgetProps: { foo: 'bar' },
		};
		const wrapper = shallow(<CodeWidget formContext={formContext} />);
		expect(wrapper.props().foo).toBe('bar');
	});

	xit('should call formContext.codeWidgetOnLoad', () => {
		const formContext = {
			codeWidgetOnLoad: jest.fn(),
		};
		mount(<CodeWidget formContext={formContext} />);
		expect(formContext.codeWidgetOnLoad).toHaveBeenCalled();
	});
});
