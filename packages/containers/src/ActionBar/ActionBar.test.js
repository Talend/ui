import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { ActionBar as Component } from 'react-talend-components';
import Container from './ActionBar.container';
import Connected, {
	mapDispatchToProps,
} from './ActionBar.connect';

describe('Component ActionBar', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Component />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});

describe('Container ActionBar', () => {
	it('should render', () => {
		const wrapper = shallow(
			<Container />
		);
		expect(wrapper).toMatchSnapshot();
	});
});

describe('Connected ActionBar', () => {
	it('should connect ActionBar', () => {
		expect(Connected.displayName).toBe(`Connect(${Container.displayName})`);
		expect(Connected.WrappedComponent).toBe(Container);
	});

	it('should map dispatch to props', () => {
		const dispatch = () => {};
		const props = mapDispatchToProps(dispatch);
		expect(typeof props).toBe('object');
	});
});
