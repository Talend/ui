/**
 * @jest-environment jsdom
 */

import React from 'react';
import PropTypes from 'prop-types';
import { fromJS, Map } from 'immutable';
import { fireEvent, render, screen } from '@testing-library/react';

import expression from '../src/expression';
import { mock } from '../src';
import { mapStateToViewProps } from '../src/settings';

import cmfConnect, {
	getComponentName,
	getComponentId,
	getStateToProps,
	getDispatchToProps,
	getMergeProps,
} from '../src/cmfConnect';
import component from '../src/component';

describe('cmfConnect', () => {
	describe('#getComponentName', () => {
		it('should return displayName', () => {
			expect(getComponentName({ displayName: 'test' })).toBe('test');
		});

		it('should return name if no displayName', () => {
			expect(getComponentName({ name: 'test' })).toBe('test');
		});

		it('should return Component if no name and no displayName', () => {
			expect(getComponentName({})).toBe('Component');
		});
	});

	describe('#getComponentId', () => {
		it('should call if it is a function', () => {
			const componentId = props => props.id;
			expect(getComponentId(componentId, { id: 'test' })).toBe('test');
		});

		it('should return if it is a string', () => {
			const componentId = 'test';
			expect(getComponentId(componentId)).toBe('test');
		});

		it('should return props.componentId if not componentId provided', () => {
			expect(getComponentId(null, { componentId: 'test' })).toBe('test');
			expect(getComponentId(undefined, { componentId: 'test' })).toBe('test');
		});
	});

	describe('#getStateToProps', () => {
		it('should call getStateProps', () => {
			const state = mock.store.state();
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
			const state = mock.store.state();
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
			const state = mock.store.state();
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
			const state = mock.store.state();
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
			const state = mock.store.state();
			const mapStateToProps = jest.fn();
			const ownProps = { view: 'simple' };
			getStateToProps({
				state,
				ownProps,
				mapStateToProps,
				WrappedComponent: { displayName: 'TestComponent' },
			});
			expect(mapStateToProps).toHaveBeenCalled();
			expect(mapStateToProps.mock.calls[0][0]).toBe(state);
			expect(mapStateToProps.mock.calls[0][1]).toMatchObject({ view: 'simple', name: 'my app' });
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
			expect(props.getComponent).toBe(component.get);
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
		const Button = ({ onClick, label, ...props }) => {
			return (
				<button onClick={onClick} data-progress={props.inProgress}>
					{label}
				</button>
			);
		};
		Button.propTypes = {
			onClick: PropTypes.func,
			label: PropTypes.string,
			inProgress: PropTypes.bool,
		};
		Button.displayName = 'Button';
		const CMFConnectedButton = cmfConnect({})(Button);
		it('should create a connected component even without params', () => {
			const TestComponent = jest.fn();
			TestComponent.displayName = 'TestComponent';
			mapStateToViewProps.cache.clear();
			const CMFConnected = cmfConnect()(TestComponent);
			expect(CMFConnected.displayName).toBe('Connect(CMF(TestComponent))');
			expect(CMFConnected.WrappedComponent).toBe(TestComponent);
		});

		it('should create a connected component', () => {
			const TestComponent = jest.fn(props => <div {...props} />);
			TestComponent.displayName = 'TestComponent';
			mapStateToViewProps.cache.clear();
			const CMFConnected = cmfConnect({})(TestComponent);
			expect(CMFConnected.displayName).toBe('Connect(CMF(TestComponent))');
			expect(CMFConnected.WrappedComponent).toBe(TestComponent);
			render(
				<mock.Provider>
					<CMFConnected />
				</mock.Provider>,
			);
			expect(TestComponent).toBeCalled();
		});

		it('should expose getState static function to get the state', () => {
			expect(typeof CMFConnectedButton.getState).toBe('function');
			const state = mock.store.state();
			state.cmf.components = fromJS({
				Button: {
					default: { foo: 'bar' },
					other: { foo: 'baz' },
				},
			});
			expect(CMFConnectedButton.getState(state).get('foo')).toBe('bar');
			expect(CMFConnectedButton.getState(state, 'other').get('foo')).toBe('baz');
		});
		it('should expose setStateAction static function to get the redux action to setState', () => {
			expect(typeof CMFConnectedButton.setStateAction).toBe('function');
			const state = new Map({ foo: 'bar' });
			let action = CMFConnectedButton.setStateAction(state);
			expect(action).toEqual({
				type: 'Button.setState',
				cmf: {
					componentState: {
						componentName: 'Button',
						componentState: state,
						key: 'default',
						type: 'REACT_CMF.COMPONENT_MERGE_STATE',
					},
				},
			});
			action = CMFConnectedButton.setStateAction(state, 'foo', 'MY_ACTION');
			expect(action.type).toBe('MY_ACTION');
			expect(action.cmf.componentState.key).toBe('foo');
		});

		it('should expose setStateAction static function to get the redux action to setState', () => {
			expect(typeof CMFConnectedButton.setStateAction).toBe('function');
			const state = mock.store.state();
			state.cmf.components = fromJS({
				Button: {
					default: { foo: 'foo' },
					other: { foo: 'baz' },
				},
			});
			let actionCreator = CMFConnectedButton.setStateAction(prevState =>
				prevState.set('foo', 'bar'),
			);
			expect(typeof actionCreator).toBe('function');
			let action = actionCreator(null, () => state);
			expect(action).toMatchObject({
				type: 'Button.setState',
				cmf: {
					componentState: {
						componentName: 'Button',
						key: 'default',
						type: 'REACT_CMF.COMPONENT_MERGE_STATE',
					},
				},
			});
			expect(action.cmf.componentState.componentState.get('foo')).toBe('bar');
			actionCreator = CMFConnectedButton.setStateAction(
				prevState => prevState.set('foo', 'baz'),
				'other',
				'MY_ACTION',
			);
			action = actionCreator(null, () => state);
			expect(action.type).toBe('MY_ACTION');
			expect(action.cmf.componentState.key).toBe('other');
			expect(action.cmf.componentState.componentState.get('foo')).toBe('baz');
		});
		it('should support no context in dispatchActionCreator', () => {
			const event = {};
			const data = {};
			const TestComponent = props => {
				return (
					<button
						className="test-component"
						onClick={() => {
							props.dispatchActionCreator('myactionCreator', event, data);
						}}
					>
						Click me I am famous
					</button>
				);
			};
			TestComponent.displayName = 'TestComponent';
			TestComponent.propTypes = {
				dispatchActionCreator: PropTypes.func,
			};
			const CMFConnected = cmfConnect({
				withDispatchActionCreator: true,
			})(TestComponent);
			const props = {
				dispatchActionCreator: jest.fn(),
				deleteState: jest.fn(),
			};
			const context = mock.store.context();
			render(
				<mock.Provider {...context}>
					<CMFConnected.CMFContainer {...props} />
				</mock.Provider>,
			);
			fireEvent.click(screen.getByRole('button'));
			expect(props.dispatchActionCreator).toHaveBeenCalled();
			const call = props.dispatchActionCreator.mock.calls[0];
			expect(call[0]).toBe('myactionCreator');
			expect(call[1]).toBe(event);
			expect(call[2]).toBe(data);
			expect(call[3].registry).toBe(context.registry);
			expect(call[3].store).toMatchObject(context.store);
		});

		it('should pass defaultState when there is no component state in store', () => {
			const TestComponent = props => <button className={props.state.get('toto')}>Click me</button>;
			TestComponent.displayName = 'MyComponentWithoutStateInStore';
			TestComponent.propTypes = {
				state: PropTypes.any,
			};
			const defaultState = new Map({ toto: 'lol' });
			const CMFConnected = cmfConnect({ defaultState })(TestComponent);

			render(
				<mock.Provider>
					<CMFConnected />
				</mock.Provider>,
			);
			expect(screen.getByRole('button')).toHaveClass('lol');
		});

		it('should componentDidMount initState and dispatchActionCreator after the saga', () => {
			const TestComponent = jest.fn(() => null);
			TestComponent.displayName = 'TestComponent';
			const STATE = new Map();
			const CMFConnected = cmfConnect({})(TestComponent);
			const props = {
				didMountActionCreator: 'hello',
				deleteState: jest.fn(),
				dispatchActionCreator: jest.fn(),
				initState: jest.fn(),
				initialState: STATE,
				foo: 'bar',
				saga: 'saga',
			};
			const context = mock.store.context();
			render(
				<mock.Provider {...context}>
					<CMFConnected.CMFContainer {...props} />
				</mock.Provider>,
			);
			expect(props.dispatchActionCreator).toHaveBeenCalled();
			const callSagaActionCreator = props.dispatchActionCreator.mock.calls[0];
			const callDidMountActionCreator = props.dispatchActionCreator.mock.calls[1];
			expect(callSagaActionCreator[0]).toBe('cmf.saga.start');
			expect(callSagaActionCreator[1]).toEqual({
				componentId: '42',
				type: 'DID_MOUNT',
			});
			expect(callDidMountActionCreator[0]).toBe('hello');
			expect(callDidMountActionCreator[1]).toBe(null);
			expect(callDidMountActionCreator[2]).toEqual(props);
			expect(callDidMountActionCreator[3].registry).toBe(context.registry);
			expect(callDidMountActionCreator[3].store).toMatchObject(context.store);

			expect(props.initState).toHaveBeenCalled();
			expect(props.initState.mock.calls[0][0]).toBe(props.initialState);
		});

		it('should componentDidMount support saga', () => {
			const TestComponent = jest.fn(() => null);
			TestComponent.displayName = 'TestComponent';
			const CMFConnected = cmfConnect({})(TestComponent);
			const props = {
				saga: 'hello',
				dispatchActionCreator: jest.fn(),
				deleteState: jest.fn(),
			};
			const context = mock.store.context();
			render(
				<mock.Provider {...context}>
					<CMFConnected.CMFContainer {...props} />
				</mock.Provider>,
			);
			expect(props.dispatchActionCreator).toHaveBeenCalledWith(
				'cmf.saga.start',
				{ type: 'DID_MOUNT', componentId: '42' },
				expect.objectContaining({
					componentId: 'default',
					saga: 'hello',
				}),
				expect.objectContaining({
					store: context.store,
					registry: context.registry,
				}),
			);
		});

		it('should componentWillUnmount support saga', () => {
			const TestComponent = jest.fn(() => null);
			TestComponent.displayName = 'TestComponent';
			const CMFConnected = cmfConnect({})(TestComponent);
			const props = {
				saga: 'hello',
				dispatchActionCreator: jest.fn(),
				deleteState: jest.fn(),
			};
			const context = mock.store.context();
			const { unmount } = render(
				<mock.Provider {...context}>
					<CMFConnected.CMFContainer {...props} />
				</mock.Provider>,
			);
			unmount();
			expect(props.dispatchActionCreator).toHaveBeenCalledWith(
				'cmf.saga.stop',
				{ type: 'WILL_UNMOUNT', componentId: '42' },
				props,
				expect.objectContaining({
					store: context.store,
					registry: context.registry,
				}),
			);
		});

		it('should componentWillUnMount dispatchActionCreator', () => {
			const TestComponent = jest.fn(() => null);
			TestComponent.displayName = 'TestComponent';
			const CMFConnected = cmfConnect({})(TestComponent);
			const props = {
				willUnmountActionCreator: 'bye',
				dispatchActionCreator: jest.fn(),
				deleteState: jest.fn(),
				foo: 'bar',
			};
			const context = mock.store.context();
			context.registry = {
				'actionCreator:bye': jest.fn(),
			};
			const { unmount } = render(
				<mock.Provider {...context}>
					<CMFConnected.CMFContainer {...props} />
				</mock.Provider>,
			);
			unmount();
			expect(props.dispatchActionCreator).toHaveBeenCalled();
			const call = props.dispatchActionCreator.mock.calls[0];
			expect(call[0]).toBe('bye');
			expect(call[1]).toBe(null);
			expect(call[2]).toEqual(props);
			expect(call[3].registry).toBe(context.registry);
			expect(call[3].store).toBe(context.store);

			expect(props.deleteState).toHaveBeenCalled();
			expect(props.deleteState.mock.calls[0][0]).toBe();
		});

		it('should remove the component state when unmount', () => {
			// given
			const TestComponent = () => <div />;
			TestComponent.displayName = 'TestComponent';
			const CMFConnected = cmfConnect({
				defaultState: new Map(),
			})(TestComponent);
			expect(CMFConnected.displayName).toBe('Connect(CMF(TestComponent))');
			expect(CMFConnected.WrappedComponent).toBe(TestComponent);
			const context = mock.store.context();
			context.store.dispatch = jest.fn();

			const { unmount } = render(
				<mock.Provider {...context}>
					<CMFConnected />
				</mock.Provider>,
			);

			// when
			unmount();

			// then
			expect(context.store.dispatch.mock.calls[0][0]).toMatchSnapshot();
			expect(context.store.dispatch.mock.calls[1][0]).toMatchSnapshot();
		});

		it('should not remove the component state when unmount and cmfConnect keepComponentState is true', () => {
			// given
			const TestComponent = () => <div />;
			TestComponent.displayName = 'TestComponent';
			const CMFConnected = cmfConnect({
				defaultState: new Map(),
				keepComponentState: true,
			})(TestComponent);
			expect(CMFConnected.displayName).toBe('Connect(CMF(TestComponent))');
			expect(CMFConnected.WrappedComponent).toBe(TestComponent);
			const context = mock.store.context();
			context.store.dispatch = jest.fn();

			const { unmount } = render(
				<mock.Provider {...context}>
					<CMFConnected />
				</mock.Provider>,
			);

			// when
			unmount();

			// then
			expect(context.store.dispatch.mock.calls.length).toBe(1);
			expect(context.store.dispatch.mock.calls[0][0]).toMatchSnapshot();
		});

		it('should not remove the component state when unmount and props keepComponentState is true', () => {
			// given
			const TestComponent = () => <div />;
			TestComponent.displayName = 'TestComponent';
			const CMFConnected = cmfConnect({
				defaultState: new Map(),
			})(TestComponent);
			expect(CMFConnected.displayName).toBe('Connect(CMF(TestComponent))');
			expect(CMFConnected.WrappedComponent).toBe(TestComponent);
			const context = mock.store.context();
			context.store.dispatch = jest.fn();

			const { unmount } = render(
				<mock.Provider {...context}>
					<CMFConnected keepComponentState />
				</mock.Provider>,
			);

			// when
			unmount();

			// then
			expect(context.store.dispatch.mock.calls.length).toBe(1);
			expect(context.store.dispatch.mock.calls[0][0]).toMatchSnapshot();
		});

		it('should remove the component state when unmount and props keepComponentState is false', () => {
			// given
			const TestComponent = () => <div />;
			TestComponent.displayName = 'TestComponent';
			const CMFConnected = cmfConnect({
				defaultState: new Map(),
			})(TestComponent);
			expect(CMFConnected.displayName).toBe('Connect(CMF(TestComponent))');
			expect(CMFConnected.WrappedComponent).toBe(TestComponent);
			const context = mock.store.context();
			context.store.dispatch = jest.fn();

			const { unmount } = render(
				<mock.Provider {...context}>
					<CMFConnected keepComponentState={false} />
				</mock.Provider>,
			);

			// when
			unmount();

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
			const TestComponent = props => <button data-props={JSON.stringify(props)}>Hello</button>;
			TestComponent.displayName = 'TestComponent';
			const CMFConnected = cmfConnect({})(TestComponent);
			const context = mock.store.context();
			context.store.dispatch = jest.fn();

			render(
				<mock.Provider {...context}>
					<CMFConnected {...iProps} />
				</mock.Provider>,
			);
			const props = JSON.parse(screen.getByRole('button').dataset.props);

			// then
			expect(props.didMountActionCreator).not.toBeDefined();
			expect(props.keepComponentState).not.toBeDefined();
			expect(props.view).not.toBeDefined();
			expect(props.willUnMountActionCreator).not.toBeDefined();
			expect(props.nonInternalProp).toBe('lol');
		});

		it('should expose displayName', () => {
			const ArrowComponent = () => <div />;
			ArrowComponent.displayName = 'ArrowComponent';
			function FunctionComponent() {
				return <div />;
			}
			FunctionComponent.displayName = 'FunctionComponent';

			// eslint-disable-next-line react/prefer-stateless-function
			class ClassComponent extends React.Component {
				static displayName = 'ClassComponent';
			}

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
			const context = mock.store.context();
			context.store.dispatch = jest.fn();

			render(
				<mock.Provider {...context}>
					<CMFConnectedButton onClickDispatch={onClickDispatch} />
				</mock.Provider>,
			);
			const btn = screen.getByRole('button');
			fireEvent.click(btn);

			expect(context.store.dispatch).toHaveBeenCalledWith({
				type: 'MY_BUTTON_CLICKED',
				event: {},
			});
		});
		it('should transform onEventActionCreator props to onEvent handler', () => {
			const onClickActionCreator = 'myactionCreator';
			const context = mock.store.context();
			context.store.dispatch = jest.fn();
			context.registry = {
				'actionCreator:myactionCreator': event => ({ type: 'FETCH_STUFF', event }),
			};

			render(
				<mock.Provider {...context}>
					<CMFConnectedButton onClickActionCreator={onClickActionCreator} />
				</mock.Provider>,
			);
			const btn = screen.getByRole('button');
			expect(context.store.dispatch).not.toHaveBeenCalled();
			fireEvent.click(btn);
			expect(context.store.dispatch).toHaveBeenCalledWith({
				type: 'FETCH_STUFF',
				event: {},
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
			const context = mock.store.context();
			context.store.dispatch = jest.fn();
			context.registry = {
				'actionCreator:myfetch': (event, data) => ({
					type: 'FETCH_CONFIGURED',
					event,
					data,
				}),
			};

			render(
				<mock.Provider {...context}>
					<CMFConnectedButton onClickActionCreator={onClickActionCreator} />
				</mock.Provider>,
			);
			const btn = screen.getByRole('button');
			expect(context.store.dispatch).not.toHaveBeenCalled();
			fireEvent.click(btn);
			expect(context.store.dispatch.mock.calls[0][0]).toMatchObject({
				type: 'FETCH_CONFIGURED',
				event: {},
				data: onClickActionCreator.data,
			});
		});
		it('should transform onEventSetState props to onEvent handler', () => {
			const config = {
				disabled: true,
			};
			const context = mock.store.context();
			context.store.dispatch = jest.fn();

			render(
				<mock.Provider {...context}>
					<CMFConnectedButton onClickSetState={config} initialState={new Map()} spreadCMFState />
				</mock.Provider>,
			);
			const btn = screen.getByRole('button');
			fireEvent.click(btn, { type: 'click' });
			expect(context.store.dispatch).toHaveBeenCalled();
			expect(context.store.dispatch.mock.calls[0][0]).toMatchObject({
				id: 'default',
				type: 'Button.initState',
				cmf: {
					componentState: {
						initialComponentState: expect.anything(),
						componentName: 'Button',
						key: 'default',
						type: 'REACT_CMF.COMPONENT_ADD_STATE',
					},
				},
			});
		});

		it('should spread cmf state when onEventSetState is set', () => {
			const context = mock.store.context();
			const state = mock.store.state();
			context.store.getState = () => {
				return {
					cmf: {
						...state.cmf,
						components: fromJS({
							Button: {
								default: {
									inProgress: false,
								},
							},
						}),
					},
				};
			};
			context.store.dispatch = jest.fn();

			render(
				<mock.Provider {...context}>
					<CMFConnectedButton onClickSetState={{ inProgress: true }} initialState={new Map()} />
				</mock.Provider>,
			);
			const btn = screen.getByRole('button');
			expect(btn.dataset.progress).toBe('false');
			expect(context.store.dispatch).not.toBeCalled();
			fireEvent.click(btn, { type: 'click' });
			expect(context.store.dispatch).toBeCalled();
			const handler = context.store.dispatch.mock.calls[0][0];
			handler();
			const action = context.store.dispatch.mock.calls[1][0];
			expect(action).toEqual({
				id: 'default',
				type: 'Button.setState',
				cmf: {
					componentState: {
						componentName: 'Button',
						componentState: {
							inProgress: true,
						},
						key: 'default',
						type: 'REACT_CMF.COMPONENT_MERGE_STATE',
					},
				},
			});
		});

		it('should check that component will not be rendered if renderIf equals false', () => {
			const context = mock.store.context();
			const CMFConnected = cmfConnect({})(Button);
			render(
				<mock.Provider>
					<CMFConnected store={context.store} label="text" renderIf={false} />
				</mock.Provider>,
			);
			expect(() => screen.getByRole('button')).toThrow();
		});

		it('should not spread propTypes and defaultProps of wrappedComponent to the CMFContainer', () => {
			const ComponentToWrap = ({ onClick, labelBase, labelSuffix }) => (
				<button onClick={onClick}>
					{labelBase}-{labelSuffix}
				</button>
			);
			ComponentToWrap.propTypes = {
				onClick: PropTypes.func,
				labelBase: PropTypes.string.isRequired,
				labelSuffix: PropTypes.string,
			};
			ComponentToWrap.defaultProps = {
				onClick() {},
			};
			ComponentToWrap.displayName = 'ComponentToWrap';
			const CMFConnected = cmfConnect({})(ComponentToWrap);

			const CMFContainer = CMFConnected.CMFContainer;
			expect(CMFContainer.propTypes.labelBase).toBeUndefined();
			expect(CMFContainer.propTypes.labelSuffix).toBeUndefined();
			expect(CMFContainer.defaultProps).toBeUndefined();
		});
	});
	describe('#omitCMFProps', () => {
		it('should cmfConnect({ omitCMFProps: false }) keep compatibility', () => {
			const store = mock.store.store();
			const TestComponent = props => (
				<button data-props={JSON.stringify(Object.keys(props))}>click me</button>
			);
			TestComponent.displayName = 'TestComponent';
			const WithCMFProps = cmfConnect({ omitCMFProps: false })(TestComponent);
			render(
				<mock.Provider>
					<WithCMFProps store={store} className="foo" id="bar" />
				</mock.Provider>,
			);
			const btn = screen.getByRole('button');

			expect(JSON.parse(btn.dataset.props)).toEqual([
				'store',
				'className',
				'id',
				'setState',
				'initState',
				'deleteState',
				'updateState',
				'dispatch',
				'getComponent',
				'dispatchActionCreator',
				'state',
			]);
		});
		it('should cmfConnect({ omitCMFProps: true, withComponentRegistry: true }) add getComponent', () => {
			const lastRender = {};
			const TestComponent = props => {
				lastRender.props = props;
				return <div />;
			};
			TestComponent.displayName = 'TestComponent';
			const WithoutCMFProps = cmfConnect({ omitCMFProps: true, withComponentRegistry: true })(
				TestComponent,
			);
			const store = mock.store.store();
			render(
				<mock.Provider>
					<WithoutCMFProps store={store} className="foo" id="bar" />
				</mock.Provider>,
			);

			expect(lastRender.props).toEqual({
				className: 'foo',
				id: 'bar',
				getComponent: component.get,
				store,
			});
		});
	});
});
