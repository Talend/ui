import React from 'react';
import { shallow } from 'enzyme';
import mock from '@talend/react-cmf/lib/mock';

import Component from './SelectObject.component';
import Container from './SelectObject.container';
import Connected, { mapStateToProps } from './SelectObject.connect';

describe('Component SelectObject', () => {
	it('should render', () => {
		const context = mock.context();
		const wrapper = shallow(<Component name="Hello world" />, { context });
		expect(wrapper.getNode()).toMatchSnapshot();
	});
});

describe('Container SelectObject', () => {
	it('should render', () => {
		const context = mock.context();
		const wrapper = shallow(<Container />, { context });
		expect(wrapper.getNode()).toMatchSnapshot();
	});
});

describe('Connected SelectObject', () => {
	it('should connect SelectObject', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
	it('should map state to props', () => {
		const state = mock.state();
		const props = mapStateToProps(state, {});
		expect(typeof props).toBe('object');
	});
});
