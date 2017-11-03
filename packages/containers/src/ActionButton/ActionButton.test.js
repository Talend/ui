import React from 'react';
import { shallow } from 'enzyme';
import { ActionButton } from '@talend/react-components';
import mock from '@talend/react-cmf/lib/mock';

import Connected, { mapStateToProps, mergeProps, ContainerActionButton } from './ActionButton.connect';

describe('Connected ActionButton', () => {
	it('should connect ActionButton', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${ContainerActionButton.displayName}))`);
		expect(Connected.WrappedComponent).toBe(ContainerActionButton);
	});
	it('should map state to props', () => {
		const state = {};
		const props = mapStateToProps(state, {});
		expect(typeof props).toBe('object');
	});
	it('should render', () => {
		const context = mock.context();
		const wrapper = shallow(
			<ActionButton actionId="menu:article" extra="foo" />,
			{ context }
		);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
});

describe('ActionButton.mergeProps', () => {
	it('should merge props', () => {
		const props = mergeProps({ foo: 'foo' }, { bar: 'bar' }, { baz: 'baz', foo: 'boo' });
		expect(props.foo).toBe('foo');
		expect(props.bar).toBe('bar');
		expect(props.baz).toBe('baz');
	});
});
