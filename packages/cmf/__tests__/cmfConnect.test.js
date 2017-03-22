import React from 'react';
import { fromJS, Map } from 'immutable';
import { shallow, mount } from 'enzyme';
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

	it('should remove the component state when unmount', () => {
		// given
		const TestComponent = () => {
			return <div></div>;
		};
		TestComponent.displayName = 'TestComponent';
		const CMFConnected = cmfConnect({})(TestComponent);
		expect(CMFConnected.displayName).toBe('Connect(CMF(TestComponent))');
		expect(CMFConnected.WrappedComponent).toBe(TestComponent);
		const context = mock.context();
		context.store.dispatch = jest.fn();
		const firstCall = {
			componentName: "TestComponent",
			initialComponentState: new Map(),
			key: "default",
			type: "REACT_CMF.COMPONENT_ADD_STATE"
		};

		const secondCall = {
			componentName: "TestComponent",
			key: "default",
			type: "REACT_CMF.COMPONENT_REMOVE_STATE"
		};

		const wrapper = mount(
			<CMFConnected />,
			{
				context,
				childContextTypes: {
					registry: React.PropTypes.object,
				},
			},
		);

		// when
		wrapper.unmount();

		// then
		expect(context.store.dispatch.mock.calls[0][0]).toEqual(firstCall);
		expect(context.store.dispatch.mock.calls[1][0]).toEqual(secondCall);
	});

	it('should not remove the component state when unmount and cmfConnect keepComponentState is true', () => {
		// given
		const TestComponent = () => {
			return <div></div>;
		};
		TestComponent.displayName = 'TestComponent';
		const CMFConnected = cmfConnect({ keepComponentState: true })(TestComponent);
		expect(CMFConnected.displayName).toBe('Connect(CMF(TestComponent))');
		expect(CMFConnected.WrappedComponent).toBe(TestComponent);
		const context = mock.context();
		context.store.dispatch = jest.fn();
		const firstCall = {
			componentName: "TestComponent",
			initialComponentState: new Map(),
			key: "default",
			type: "REACT_CMF.COMPONENT_ADD_STATE"
		};

		const wrapper = mount(
			<CMFConnected />,
			{
				context,
				childContextTypes: {
					registry: React.PropTypes.object,
				},
			},
		);

		// when
		wrapper.unmount();

		// then
		expect(context.store.dispatch.mock.calls.length).toBe(1);
		expect(context.store.dispatch.mock.calls[0][0]).toEqual(firstCall);
	});

	it('should not remove the component state when unmount and props keepComponentState is true', () => {
		// given
		const TestComponent = () => {
			return <div></div>;
		};
		TestComponent.displayName = 'TestComponent';
		const CMFConnected = cmfConnect({})(TestComponent);
		expect(CMFConnected.displayName).toBe('Connect(CMF(TestComponent))');
		expect(CMFConnected.WrappedComponent).toBe(TestComponent);
		const context = mock.context();
		context.store.dispatch = jest.fn();
		const firstCall = {
			componentName: "TestComponent",
			initialComponentState: new Map(),
			key: "default",
			type: "REACT_CMF.COMPONENT_ADD_STATE"
		};

		const wrapper = mount(
			<CMFConnected keepComponentState={true} />,
			{
				context,
				childContextTypes: {
					registry: React.PropTypes.object,
				},
			},
		);

		// when
		wrapper.unmount();

		// then
		expect(context.store.dispatch.mock.calls.length).toBe(1);
		expect(context.store.dispatch.mock.calls[0][0]).toEqual(firstCall);
	});

	it('should remove the component state when unmount and props keepComponentState is false', () => {
		// given
		const TestComponent = () => {
			return <div></div>;
		};
		TestComponent.displayName = 'TestComponent';
		const CMFConnected = cmfConnect({})(TestComponent);
		expect(CMFConnected.displayName).toBe('Connect(CMF(TestComponent))');
		expect(CMFConnected.WrappedComponent).toBe(TestComponent);
		const context = mock.context();
		context.store.dispatch = jest.fn();
		const firstCall = {
			componentName: "TestComponent",
			initialComponentState: new Map(),
			key: "default",
			type: "REACT_CMF.COMPONENT_ADD_STATE"
		};

		const secondCall = {
			componentName: "TestComponent",
			key: "default",
			type: "REACT_CMF.COMPONENT_REMOVE_STATE"
		};

		const wrapper = mount(
			<CMFConnected keepComponentState={false} />,
			{
				context,
				childContextTypes: {
					registry: React.PropTypes.object,
				},
			},
		);

		// when
		wrapper.unmount();

		// then
		expect(context.store.dispatch.mock.calls[0][0]).toEqual(firstCall);
		expect(context.store.dispatch.mock.calls[1][0]).toEqual(secondCall);
	});
});
