import React from 'react';
import { shallow } from 'enzyme';

import Icon from './Icon.component';

describe('Icon', () => {
	it('should render fontawesome', () => {
		const wrapper = shallow(<Icon name="fa-bars" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render from custom font', () => {
		const wrapper = shallow(<Icon name="icon-test" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render from svg', () => {
		const wrapper = shallow(<Icon name="svg-dd" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render from src', () => {
		const wrapper = shallow(<Icon name="src-/foo/bar.png" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should fails if no id found', () => {
		expect(Icon).toThrowError(Error, 'Invariant Violation: no id provided');
	});

	it('should render with provided className', () => {
		const wrapper = shallow(<Icon name="svg-dd" className="custom-class" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should support extra props', () => {
		const wrapper = shallow(<Icon name="svg-dd" className="custom-class" data-custom="hello" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
