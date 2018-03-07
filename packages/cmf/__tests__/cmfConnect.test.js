import React from 'react';
import { fromJS, Map } from 'immutable';
import { shallow, mount } from 'enzyme';
import expression from '../src/expression';
import mock from '../src/mock';
import { mapStateToViewProps } from '../src/settings';

import cmfConnect, {
	getComponentName,
	getComponentId,
	getStateToProps,
	getDispatchToProps,
	getMergeProps,
} from '../src/cmfConnect';

import api from '../src/api';

describe('cmfConnect', () => {
	describe('#getComponentName', () => {
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

	describe('#getComponentId', () => {
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

	describe('#getStateToProps', () => {
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

		it('should inject view settings using props.view', () => {
			const state = mock.state();
			state.cmf.components = fromJS({});
			const props = getStateToProps({
				componentId: 'testId',
				ownProps: { view: 'homepage' },
				state,
				WrappedComponent: { displayName: 'TestComponent' },
			});
			expect(props.sidemenu.actions.length).toBe(2);
		});

		it('should inject view settings using displayName and componentId', () => {
			const state = mock.state();
			state.cmf.components = fromJS({});
			state.cmf.settings.props['TestComponent#default'] = { foo: 'from-displayName' };
			state.cmf.settings.props['TestComponent#props-id'] = { foo: 'from-props-componentId' };
			state.cmf.settings.props['TestComponent#connect-id'] = { foo: 'from-connect-componentId' };
			let props = getStateToProps({
				componentId: 'connect-id',
				ownProps: {},
				state,
				WrappedComponent: { displayName: 'TestComponent' },
			});
			expect(props.foo).toBe('from-connect-componentId');

			props = getStateToProps({
				ownProps: { componentId: 'props-id' },
				state,
				WrappedComponent: { displayName: 'TestComponent' },
			});
			expect(props.foo).toBe('from-props-componentId');

			props = getStateToProps({
				ownProps: {},
				state,
				WrappedComponent: { displayName: 'TestComponent' },
			});
			expect(props.foo).toBe('from-displayName');
			delete state.cmf.settings.props['TestComponent#default'];
			delete state.cmf.settings.props['TestComponent#props-id'];
			delete state.cmf.settings.props['TestComponent#connect-id'];
		});
		it('should evaluate expression using all props', () => {
			const state = mock.state();
			state.cmf.components = fromJS({});
			expression.register('hasModel', ({ payload }) => payload.model !== undefined);
			const props = getStateToProps({
				ownProps: {
					model: { foo: 'bar' },
				},
				state,
				WrappedComponent: { displayName: 'TestComponent' },
				mapStateToProps: () => ({ availableExpression: 'hasModel' }),
			});
			expect(props.available).toBe(true);
			expect(props.model).toBeUndefined();
		});
		it('should pass view settings together with own props when calling mapStateToProps', () => {
			const state = mock.state();
			const mapStateToProps = jest.fn();
			const ownProps = { view: 'simple' };
			const props = getStateToProps({
				state,
				ownProps,
				mapStateToProps,
				WrappedComponent: { displayName: 'TestComponent' },
			});
			expect(mapStateToProps).toHaveBeenCalledWith(
					state,
					{ view: 'simple', name: 'my app' },
					expect.anything(),
			);
			delete state.cmf.settings.props['TestComponent#connect-id'];
		});
	});

	describe('#getMergeProps', () => {
		it('should mergeProps in order', () => {
			const props = getMergeProps({
				stateProps: { id: 'stateProps', stateProps: true },
				dispatchProps: { id: 'dispatchProps', dispatchProps: true },
				ownProps: { id: 'ownProps', ownProps: true },
			});
			expect(props.id).toBe('stateProps');
			expect(props.ownProps).toBe(true);
			expect(props.dispatchProps).toBe(true);
			expect(props.stateProps).toBe(true);
		});
		it('should mergeProps called', () => {
			const stateProps = { id: 'stateProps', stateProps: true };
			const dispatchProps = { id: 'dispatchProps', dispatchProps: true };
			const ownProps = { id: 'ownProps', ownProps: true };
			const mergeProps = jest.fn();
			getMergeProps({
				mergeProps,
				stateProps,
				dispatchProps,
				ownProps,
			});
			expect(mergeProps).toHaveBeenCalledWith(stateProps, dispatchProps, ownProps);
		});
	});

	describe('#getDispatchToProps', () => {
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
			expect(props.getComponent).toBe(api.component.get);
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

	describe('Higher Order Component', () => {
		const Button = ({ onClick, label }) => (<button onClick={onClick} >{label}</button>);
		const CMFConnectedButton = cmfConnect({})(Button);
		it('should create a connected component', () => {
			const TestComponent = jest.fn();
			TestComponent.displayName = 'TestComponent';
			mapStateToViewProps.cache.clear();
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
			const TestComponent = props => (<div className="test-component" {...props} />);
			TestComponent.displayName = 'TestComponent';
			const CMFConnected = cmfConnect({})(TestComponent);
			const props = {
				dispatchActionCreator: jest.fn(),
			};
			const context = mock.context();
			const wrapper = mount(
				<CMFConnected.CMFContainer {...props} />
				, { context });
			const injectedProps = wrapper.find(TestComponent).props();
			expect(injectedProps.dispatchActionCreator).not.toBe(props.dispatchActionCreator);
			// const instance = new CMFConnected.CMFContainer(props, context);
			const event = {};
			const data = {};
			injectedProps.dispatchActionCreator('myactionCreator', event, data);
			expect(props.dispatchActionCreator).toHaveBeenCalled();
			const call = props.dispatchActionCreator.mock.calls[0];
			expect(call[0]).toBe('myactionCreator');
			expect(call[1]).toBe(event);
			expect(call[2]).toBe(data);
			expect(call[3].registry).toBe(context.registry);
			expect(call[3].store).toBe(context.store);
		});

		it('should pass defaultState when there is no component state in store', () => {
			const TestComponent = () => (<div />);
			TestComponent.displayName = 'MyComponentWithoutStateInStore';
			const defaultState = new Map({ toto: 'lol' });
			const CMFConnected = cmfConnect({ defaultState })(TestComponent);

			const wrapper = mount(
				<CMFConnected />,
				{
					context: mock.context(),
					childContextTypes: {
						registry: React.PropTypes.object,
					},
				},
			);

			expect(wrapper.find(TestComponent).props().state).toBe(defaultState);
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
			expect(call[3].registry).toBe(instance.context.registry);
			expect(call[3].store).toBe(instance.context.store);

			expect(props.initState).toHaveBeenCalled();
			expect(props.initState.mock.calls[0][0]).toBe(props.initialState);
		});

		it('should componentDidMount support saga', () => {
			const TestComponent = jest.fn();
			TestComponent.displayName = 'TestComponent';
			const CMFConnected = cmfConnect({})(TestComponent);
			const props = {
				saga: 'hello',
				dispatchActionCreator: jest.fn(),
			};
			const context = mock.context();
			const instance = new CMFConnected.CMFContainer(props, context);
			instance.componentDidMount();
			expect(props.dispatchActionCreator).toHaveBeenCalledWith(
				'cmf.saga.start',
				{ type: 'DID_MOUNT' },
				instance.props,
				instance.context
			);
		});

		it('should componentWillUnmount support saga', () => {
			const TestComponent = jest.fn();
			TestComponent.displayName = 'TestComponent';
			const CMFConnected = cmfConnect({})(TestComponent);
			const props = {
				saga: 'hello',
				dispatchActionCreator: jest.fn(),
				deleteState: jest.fn(),
			};
			const context = mock.context();
			const instance = new CMFConnected.CMFContainer(props, context);
			instance.componentWillUnmount();
			expect(props.dispatchActionCreator).toHaveBeenCalledWith(
				'cmf.saga.stop',
				{ type: 'WILL_UNMOUNT' },
				instance.props,
				instance.context
			);
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
			expect(call[3].registry).toBe(instance.context.registry);
			expect(call[3].store).toBe(instance.context.store);

			expect(props.deleteState).toHaveBeenCalled();
			expect(props.deleteState.mock.calls[0][0]).toBe();
		});

		it('should remove the component state when unmount', () => {
			// given
			const TestComponent = () => (<div />);
			TestComponent.displayName = 'TestComponent';
			const CMFConnected = cmfConnect({
				defaultState: new Map(),
			})(TestComponent);
			expect(CMFConnected.displayName).toBe('Connect(CMF(TestComponent))');
			expect(CMFConnected.WrappedComponent).toBe(TestComponent);
			const context = mock.context();
			context.store.dispatch = jest.fn();

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
			expect(context.store.dispatch.mock.calls[0][0]).toMatchSnapshot();
			expect(context.store.dispatch.mock.calls[1][0]).toMatchSnapshot();
		});

		it('should not remove the component state when unmount and cmfConnect keepComponentState is true', () => {
			// given
			const TestComponent = () => (<div />);
			TestComponent.displayName = 'TestComponent';
			const CMFConnected = cmfConnect({
				defaultState: new Map(),
				keepComponentState: true,
			})(TestComponent);
			expect(CMFConnected.displayName).toBe('Connect(CMF(TestComponent))');
			expect(CMFConnected.WrappedComponent).toBe(TestComponent);
			const context = mock.context();
			context.store.dispatch = jest.fn();

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
			expect(context.store.dispatch.mock.calls[0][0]).toMatchSnapshot();
		});

		it('should not remove the component state when unmount and props keepComponentState is true', () => {
			// given
			const TestComponent = () => (<div />);
			TestComponent.displayName = 'TestComponent';
			const CMFConnected = cmfConnect({
				defaultState: new Map(),
			})(TestComponent);
			expect(CMFConnected.displayName).toBe('Connect(CMF(TestComponent))');
			expect(CMFConnected.WrappedComponent).toBe(TestComponent);
			const context = mock.context();
			context.store.dispatch = jest.fn();

			const wrapper = mount(
				<CMFConnected keepComponentState />,
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
			expect(context.store.dispatch.mock.calls[0][0]).toMatchSnapshot();
		});

		it('should remove the component state when unmount and props keepComponentState is false', () => {
			// given
			const TestComponent = () => (<div />);
			TestComponent.displayName = 'TestComponent';
			const CMFConnected = cmfConnect({
				defaultState: new Map(),
			})(TestComponent);
			expect(CMFConnected.displayName).toBe('Connect(CMF(TestComponent))');
			expect(CMFConnected.WrappedComponent).toBe(TestComponent);
			const context = mock.context();
			context.store.dispatch = jest.fn();

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
			expect(context.store.dispatch.mock.calls[0][0]).toMatchSnapshot();
			expect(context.store.dispatch.mock.calls[1][0]).toMatchSnapshot();
		});

		it('should remove internal props', () => {
			const iProps = {
				didMountActionCreator: 'myactionCreator',
				keepComponentState: true,
				view: 'myComponent',
				willUnMountActionCreator: 'myactionCreator',
				nonInternalProp: 'lol',
			};
			// given
			const TestComponent = () => (<div />);
			TestComponent.displayName = 'TestComponent';
			const CMFConnected = cmfConnect({})(TestComponent);
			const context = mock.context();
			context.store.dispatch = jest.fn();

			const wrapper = mount(
				<CMFConnected {...iProps} />,
				{
					context,
					childContextTypes: {
						registry: React.PropTypes.object,
					},
				},
			);
			const props = wrapper.find(TestComponent).props();

			// then
			expect(props.didMountActionCreator).not.toBeDefined();
			expect(props.keepComponentState).not.toBeDefined();
			expect(props.view).not.toBeDefined();
			expect(props.willUnMountActionCreator).not.toBeDefined();
			expect(props.nonInternalProp).toBe('lol');
		});

		it('should expose displayName', () => {
			const ArrowComponent = () => (<div />);
			function FunctionComponent() {
				return <div />;
			}
			class ClassComponent extends React.Component {}
			const CMFConnectedArrow = cmfConnect({})(ArrowComponent);
			const CMFConnectedFunction = cmfConnect({})(FunctionComponent);
			const CMFConnectedClass = cmfConnect({})(ClassComponent);
			expect(CMFConnectedArrow.displayName).toBe('Connect(CMF(ArrowComponent))');
			expect(CMFConnectedFunction.displayName).toBe('Connect(CMF(FunctionComponent))');
			expect(CMFConnectedClass.displayName).toBe('Connect(CMF(ClassComponent))');
		});
		it('should transform onEventDispatch props to onEvent handler', () => {
			const onClickDispatch = {
				type: 'MY_BUTTON_CLICKED',
			};
			const context = mock.context();
			context.store.dispatch = jest.fn();

			const wrapper = mount(
				<CMFConnectedButton
					onClickDispatch={onClickDispatch}
				/>,
				{
					context,
					childContextTypes: {
						registry: React.PropTypes.object,
					},
				}
			);
			const props = wrapper.find(Button).props();
			expect(props.onClickDispatch).toBeUndefined();
			expect(props.onClick).toBeDefined();
			expect(context.store.dispatch).not.toHaveBeenCalled();
			props.onClick({ type: 'click' });
			expect(context.store.dispatch).toHaveBeenCalledWith({
				type: 'MY_BUTTON_CLICKED',
				event: {
					type: 'click',
				},
			});
		});
		it('should transform onEventActionCreator props to onEvent handler', () => {
			const onClickActionCreator = 'myactionCreator';
			const context = mock.context();
			context.store.dispatch = jest.fn();
			context.registry = {
				'actionCreator:myactionCreator': event => ({ type: 'FETCH_STUFF', event }),
			};

			const wrapper = mount(
				<CMFConnectedButton
					onClickActionCreator={onClickActionCreator}
				/>,
				{
					context,
					childContextTypes: {
						registry: React.PropTypes.object,
					},
				}
			);
			const props = wrapper.find(Button).props();
			expect(props.onClick).toBeDefined();
			expect(props.onClickActionCreator).toBeUndefined();
			expect(context.store.dispatch).not.toHaveBeenCalled();
			props.onClick({ type: 'click' });
			expect(context.store.dispatch).toHaveBeenCalledWith({
				type: 'FETCH_STUFF',
				event: {
					type: 'click',
				},
			});
		});
		it('should support onEventActionCreator props as object', () => {
			const onClickActionCreator = {
				id: 'myfetch',
				data: {
					url: '/api/foo',
					cmf: { collectionId: 'foo' },
				},
			};
			const context = mock.context();
			context.store.dispatch = jest.fn();
			context.registry = {
				'actionCreator:myfetch': (event, data) => ({
					type: 'FETCH_CONFIGURED',
					event,
					data,
				}),
			};

			const wrapper = mount(
				<CMFConnectedButton
					onClickActionCreator={onClickActionCreator}
				/>,
				{
					context,
					childContextTypes: {
						registry: React.PropTypes.object,
					},
				}
			);
			const props = wrapper.find(Button).props();
			expect(props.onClick).toBeDefined();
			expect(context.store.dispatch).not.toHaveBeenCalled();
			const event = { type: 'click' };
			props.onClick(event);
			expect(context.store.dispatch.mock.calls[0][0]).toMatchObject({
				type: 'FETCH_CONFIGURED',
				event,
				data: onClickActionCreator.data,
			});
		});
	});
});
