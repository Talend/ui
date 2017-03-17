import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import mock from '../src/mock';

import cmfConnect, {
	getComponentName,
	getComponentId,
	getStateToProps,
	getDispatchToProps,
} from '../src/cmfConnect';

describe('cmfConnect.getComponentName', () => {
	it('should return displayName', () => {
		expect(getComponentName({ displayName: 'test' }))
			.toBe('test');
	});
	it('should return name if no displayName', () => {
		expect(getComponentName({ name: 'test' }))
			.toBe('test');
	});
	it('should return Component if no name and no displayName', () => {
		expect(getComponentName({}))
			.toBe('Component');
	});
});

describe('cmfConnect.getComponentId', () => {
	it('should call if it is a function', () => {
		const componentId = props => props.id;
		expect(getComponentId(componentId, { id: 'test' }))
			.toBe('test');
	});
	it('should return if it is a string', () => {
		const componentId = 'test';
		expect(getComponentId(componentId))
			.toBe('test');
	});
	it('should return props.componentId if not componentId provided', () => {
		expect(getComponentId(null, { componentId: 'test' }))
			.toBe('test');
		expect(getComponentId(undefined, { componentId: 'test' }))
			.toBe('test');
	});
});


describe('cmfConnect.getStateToProps', () => {
	it('should call getStateProps', () => {
		const state = mock.state();
		state.cmf.components = fromJS({
			TestComponent: {
				testId: {
					foo: 'bar',
				},
			},
		});
		const props = getStateToProps({
			componentId: 'testId',
			ownProps: {},
			state,
			WrappedComponent: { displayName: 'TestComponent' },
		});
		expect(props.state.get('foo')).toBe('bar');
	});
});

describe('cmfConnect.getDispatchToProps', () => {
	it('should call getStateAccessors', () => {
		const dispatch = jest.fn();
		const mapDispatchToProps = jest.fn();
		const ownProps = {};
		const props = getDispatchToProps({
			componentId: 'testId',
			ownProps,
			dispatch,
			mapDispatchToProps,
			WrappedComponent: { displayName: 'TestComponent' },
		});
		expect(props.dispatch).toBe(dispatch);
		expect(typeof props.dispatchActionCreator).toBe('function');
		expect(mapDispatchToProps.mock.calls[0][0]).toBe(dispatch);
		expect(mapDispatchToProps.mock.calls[0][1]).toBe(ownProps);
		const cmfProps = mapDispatchToProps.mock.calls[0][2];
		expect(props.initState).toBe(cmfProps.initState);
		expect(props.updateState).toBe(cmfProps.updateState);
		expect(props.deleteState).toBe(cmfProps.deleteState);
		expect(props.dispatchActionCreator).toBe(cmfProps.dispatchActionCreator);
	});
});

describe('cmfConnect', () => {
	it('should create a connected component', () => {
		const TestComponent = jest.fn();
		TestComponent.displayName = 'TestComponent';
		const CMFConnected = cmfConnect({})(TestComponent);
		expect(CMFConnected.displayName).toBe('Connect(CMF(TestComponent))');
		expect(CMFConnected.WrappedComponent).toBe(TestComponent);
		const wrapper = shallow(
			<CMFConnected />,
			{ context: mock.context() },
		);
		expect(wrapper.props()).toMatchSnapshot();
	});
	it('should support no context in dispatchActionCreator', () => {
		const TestComponent = jest.fn();
		TestComponent.displayName = 'TestComponent';
		const CMFConnected = cmfConnect({})(TestComponent);
		const props = {
			dispatchActionCreator: jest.fn(),
		};
		const context = mock.context();
		const instance = new CMFConnected.CMFContainer(props, context);
		const event = {};
		const data = {};
		instance.dispatchActionCreator('myactionCreator', event, data);
		expect(props.dispatchActionCreator).toHaveBeenCalled();
		const call = props.dispatchActionCreator.mock.calls[0];
		expect(call[0]).toBe('myactionCreator');
		expect(call[1]).toBe(event);
		expect(call[2]).toBe(data);
		expect(call[3]).toBe(instance.context);
	});
	it('should componentDidMount initState and dispatchActionCreator', () => {
		const TestComponent = jest.fn();
		TestComponent.displayName = 'TestComponent';
		const STATE = new Map();
		const CMFConnected = cmfConnect({})(TestComponent);
		const props = {
			didMountActionCreator: 'hello',
			dispatchActionCreator: jest.fn(),
			initState: jest.fn(),
			initialState: STATE,
			foo: 'bar',
		};
		const context = mock.context();
		const instance = new CMFConnected.CMFContainer(props, context);
		instance.componentDidMount();
		expect(props.dispatchActionCreator).toHaveBeenCalled();
		const call = props.dispatchActionCreator.mock.calls[0];
		expect(call[0]).toBe('hello');
		expect(call[1]).toBe(null);
		expect(call[2]).toBe(props);
		expect(call[3]).toBe(instance.context);

		expect(props.initState).toHaveBeenCalled();
		expect(props.initState.mock.calls[0][0]).toBe(props.initialState);
	});
	it('should componentWillUnMount dispatchActionCreator', () => {
		const TestComponent = jest.fn();
		TestComponent.displayName = 'TestComponent';
		const CMFConnected = cmfConnect({})(TestComponent);
		const props = {
			willUnmountActionCreator: 'bye',
			dispatchActionCreator: jest.fn(),
			deleteState: jest.fn(),
			foo: 'bar',
		};
		const context = mock.context();
		const instance = new CMFConnected.CMFContainer(props, context);
		instance.componentWillUnmount();
		expect(props.dispatchActionCreator).toHaveBeenCalled();
		const call = props.dispatchActionCreator.mock.calls[0];
		expect(call[0]).toBe('bye');
		expect(call[1]).toBe(null);
		expect(call[2]).toBe(props);
		expect(call[3]).toBe(instance.context);

		expect(props.deleteState).toHaveBeenCalled();
		expect(props.deleteState.mock.calls[0][0]).toBe();
	});
});
