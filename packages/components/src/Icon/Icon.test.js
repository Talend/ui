import React from 'react';
import renderer from 'react-test-renderer';

import Icon from './Icon.component';

describe('Icon', () => {
	it('should render fontawesome', () => {
		const wrapper = renderer.create(<Icon name="fa-bars" />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render from custom font', () => {
		const wrapper = renderer.create(<Icon name="icon-test" />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render from svg', () => {
		const wrapper = renderer.create(<Icon name="svg-dd" />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render from src', () => {
		const wrapper = renderer.create(<Icon src="/foo/bar.png" />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should fails if no id found', () => {
		expect(Icon).toThrowError(Error, 'Invariant Violation: no id provided');
	});

	it('should render with provided className', () => {
		const wrapper = renderer.create(<Icon name="svg-dd" className="custom-class" />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
