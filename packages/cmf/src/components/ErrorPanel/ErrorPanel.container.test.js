import React from 'react';
import { shallow } from 'enzyme';

import Component from './ErrorPanel.component';
import Container from './ErrorPanel.container';

describe('Container ErrorPanel', () => {
	it('should render ErrorPanel with props', () => {
		const wrapper = shallow(<Container />);
		expect(wrapper.find(Component).length).toBe(1);
		const props = wrapper.props();
		expect(props.hidden).toBe(true);
		expect(props.onClickDetails).toBe(wrapper.instance().onClickDetails);
	});
});
