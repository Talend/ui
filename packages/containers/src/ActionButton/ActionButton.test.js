import React from 'react';
import { shallow } from 'enzyme';
import { ActionButton } from '@talend/react-components';
import mock from '@talend/react-cmf/lib/mock';

import Connected, {
	mapStateToProps,
	mergeProps,
	ContainerActionButton,
} from './ActionButton.connect';

describe('Connect(CMF(Container(ActionButton)))', () => {
	it('should connect Container(ActionButton)', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${ContainerActionButton.displayName}))`);
		expect(Connected.WrappedComponent).toBe(ContainerActionButton);
	});
});

describe('CMF(Container(ActionButton))', () => {
	it('should map state to props', () => {
		const state = {
			cmf: {
				settings: {
					actions: {
						foo: { id: 'foo', label: 'Foo!' },
					},
				},
			},
		};
		const props = mapStateToProps(state, { actionId: 'foo' });
		expect(typeof props).toBe('object');
		expect(props.label).toBe('Foo!');
		expect(props.id).toBe('foo');
	});
	it('should render', () => {
		const context = mock.context();
		const wrapper = shallow(<ContainerActionButton actionId="menu:article" extra="foo" />, { context });
		expect(wrapper.getNode()).toMatchSnapshot();
		expect(wrapper.find(ActionButton).length).toBe(1);
	});

	it('should inject a component overlay', () => {
		const state = {
			cmf: {
				settings: {
					actions: {
						foo: {
							id: 'foo',
							label: 'Foo!',
							overlayComponent: 'ComponentOverlay',
							overlayComponentProps: {
								customProps: 'customProps',
							},
						},
					},
				},
			},
		};
		const props = mapStateToProps(state, { actionId: 'foo' });
		expect(props).toMatchSnapshot();
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
