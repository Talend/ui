import React from 'react';
import { shallow } from 'enzyme';
import Component from './ModelViewer.component';

describe('ModelViewer', () => {
	it('should render the ModelViewer', () => {
		const wrapper = shallow(<Component />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
