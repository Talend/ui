import React from 'react';
import { shallow } from 'enzyme';
import { api } from '@talend/react-cmf';
import mock from '@talend/react-cmf/lib/mock';

import Action, { mapStateToProps, mergeProps } from './Action.connect';

describe('Action', () => {
	it('should render from name props keeping extra props', () => {
		const context = mock.context();
		const wrapper = shallow(
			<Action name="menu:article" extra="foo" />,
			{ context }
		);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
});

describe('Action.mapStateToProps', () => {
	it('should do nothing if no actionId and no name', () => {
		const props = mapStateToProps({}, {});
		expect(props).toEqual({});
	});
	xit('should resolve action info', () => {
		const registry = api.registry.getRegistry();
		registry['actionCreator:menu:article'] = { label: 'hello' };
		const props = mapStateToProps({}, { actionId: 'menu:article' });
		expect(props).toEqual({ label: 'hello' });
	});
});

describe('Action.mergeProps', () => {
	it('should merge props', () => {
		const props = mergeProps({ foo: 'foo' }, { bar: 'bar' }, { baz: 'baz', foo: 'boo' });
		expect(props.foo).toBe('foo');
		expect(props.bar).toBe('bar');
		expect(props.baz).toBe('baz');
	});
});
