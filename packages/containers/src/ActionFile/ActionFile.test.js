import React from 'react';
import { shallow } from 'enzyme';
import ActionFile from '@talend/react-components/lib/Actions/ActionFile';
import mock from '@talend/react-cmf/lib/mock';

import Connected, { mapStateToProps, mergeProps, ContainerActionFile } from './ActionFile.connect';

describe('Connected ActionFile', () => {
	it('should connect ActionFile', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${ContainerActionFile.displayName}))`);
		expect(Connected.WrappedComponent).toBe(ContainerActionFile);
	});
	it('should map state to props', () => {
		const state = {};
		const props = mapStateToProps(state, {});
		expect(typeof props).toBe('object');
	});
	it('should render', () => {
		const context = mock.context();
		const wrapper = shallow(<ActionFile id="42" actionId="menu:article" extra="foo" />, {
			context,
		});
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('ActionFile.mergeProps', () => {
	it('should merge props', () => {
		const props = mergeProps({ foo: 'foo' }, { bar: 'bar' }, { baz: 'baz', foo: 'boo' });
		expect(props.foo).toBe('foo');
		expect(props.bar).toBe('bar');
		expect(props.baz).toBe('baz');
	});
});
