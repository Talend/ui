import React from 'react';
import { shallow } from 'enzyme';
import Container from './ModelViewer.container';

describe('I18n', () => {
	it('should render', () => {
		const wrapper = shallow(<Container />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
