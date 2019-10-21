import React from 'react';
import { shallow } from 'enzyme';
import ActionButton from '@talend/react-components/lib/Actions/ActionButton';
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
		const props = {
			actionId: 'menu:article',
			extra: 'foo',
			onClick: () => {},
		};
		const context = mock.context();
		const wrapper = shallow(<ContainerActionButton {...props} />, {
			context,
		});
		expect(wrapper.getElement()).toMatchSnapshot();
		expect(wrapper.getElement().props).toEqual(props);
		expect(wrapper.find(ActionButton).length).toBe(1);
	});

	it('should render without onClick', () => {
		const props = {
			actionId: 'menu:article',
			extra: 'foo',
		};
		const context = mock.context();
		const wrapper = shallow(<ContainerActionButton {...props} />, {
			context,
		});
		expect(wrapper.getElement().props).toEqual(props);
	});

	it('should dispatch one action when it clicks', () => {
		const dispatch = jest.fn();
		const event = {};
		const data = {};
		const props = {
			actionId: 'menu:article',
			dispatch,
			extra: 'foo',
			payload: {
				type: 'ACTION',
			},
			model: {
				id: 42,
			},
		};
		const context = mock.context();
		const wrapper = shallow(<ContainerActionButton {...props} />, {
			context,
		});

		wrapper.prop('onClick')(event, data);
		expect(dispatch).toHaveBeenCalledWith({
			model: props.model,
			...props.payload,
		});
	});

	it('should dispatch one actioncreator when it clicks', () => {
		const dispatchActionCreator = jest.fn();
		const event = {};
		const data = {};
		const props = {
			actionId: 'menu:article',
			dispatchActionCreator,
			extra: 'foo',
			actionCreator: 'foo',
		};
		const context = mock.context();
		const wrapper = shallow(<ContainerActionButton {...props} />, {
			context,
		});

		wrapper.prop('onClick')(event, data);
		expect(dispatchActionCreator).toHaveBeenCalledWith(props.actionCreator, event, data);
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
