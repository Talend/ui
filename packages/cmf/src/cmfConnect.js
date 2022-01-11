/**
 * This module connect your component in the CMF environment.
 * @module react-cmf/lib/cmfConnect
 * @example
import { cmfConnect } from '@talend/react-cmf';

function MyComponent(props) {
	const onClick = (event) => {
		props.dispatchActionCreator('myaction', event, { props: props });
	};
	return <button onClick={onClick}>Edit {props.foo.name}</button>;
}

function mapStateToProps(state) {
	return {
		foo: state.cmf.collection.get('foo', { name: 'world' }),
	};
}

export default cmfConnect({
	mapStateToProps,
});
 */
import PropTypes from 'prop-types';
import React, { createElement } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect, useStore } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import actions from './actions';
import actionCreator from './actionCreator';
import component from './component';
import CONST from './constant';
import expression from './expression';
import onEvent from './onEvent';
import { initState, getStateAccessors, getStateProps } from './componentState';
import { mapStateToViewProps } from './settings';
import omit from './omit';
import { RegistryContext } from './RegistryProvider';

export function getComponentName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function getComponentId(componentId, props) {
	if (typeof componentId === 'function') {
		return componentId(props) || 'default';
	} else if (typeof componentId === 'string') {
		return componentId;
	} else if (props.componentId) {
		return props.componentId;
	}
	return 'default';
}

export function getStateToProps({
	defaultProps,
	componentId,
	ownProps,
	state,
	mapStateToProps,
	WrappedComponent,
}) {
	const props = { ...defaultProps };

	const cmfProps = getStateProps(
		state,
		getComponentName(WrappedComponent),
		getComponentId(componentId, ownProps),
	);

	Object.assign(props, cmfProps);

	const viewProps = mapStateToViewProps(
		state,
		ownProps,
		getComponentName(WrappedComponent),
		getComponentId(componentId, ownProps),
	);

	Object.assign(props, viewProps);

	let userProps = {};
	if (mapStateToProps) {
		userProps = mapStateToProps(state, { ...ownProps, ...props }, cmfProps);
	}
	Object.assign(props, userProps);
	Object.assign(props, expression.mapStateToProps(state, { ...ownProps, ...props }));
	return props;
}

export function getDispatchToProps({
	defaultState,
	dispatch,
	componentId,
	mapDispatchToProps,
	ownProps,
	WrappedComponent,
}) {
	const cmfProps = getStateAccessors(
		dispatch,
		getComponentName(WrappedComponent),
		getComponentId(componentId, ownProps),
		defaultState,
	);
	cmfProps.dispatch = dispatch;
	cmfProps.getComponent = component.get;
	cmfProps.dispatchActionCreator = (actionId, event, data, context) => {
		dispatch(actionCreator.get(context, actionId)(event, data, context));
	};

	let userProps = {};
	if (mapDispatchToProps) {
		if (process.env.NODE_ENV === 'development') {
			// eslint-disable-next-line no-console
			console.warn(`DEPRECATION WARNING: mapDispatchToProps will be removed from cmfConnect.
			Please use the injectedProps dispatchActionCreator or dispatch`);
		}
		userProps = mapDispatchToProps(dispatch, ownProps, cmfProps);
	}

	return { ...cmfProps, ...userProps };
}

/**
 * Internal: you should not have to use this
 * return the merged props which cleanup expression props
 * call mergeProps if exists after the cleanup
 * @param {object} options { mergeProps, stateProps, dispatchProps, ownProps }
 */
export function getMergeProps({ mergeProps, stateProps, dispatchProps, ownProps }) {
	if (mergeProps) {
		return mergeProps(
			expression.mergeProps(stateProps),
			expression.mergeProps(dispatchProps),
			expression.mergeProps(ownProps),
		);
	}
	return {
		...expression.mergeProps(ownProps),
		...expression.mergeProps(dispatchProps),
		...expression.mergeProps(stateProps),
	};
}

/**
 * this function wrap your component to inject CMF props
 * @example
 * The following props are injected:
 * - props.state
 * - props.setState
 * - props.initState (you should never have to call it your self)
 * - dispatch(action)
 * - dispatchActionCreator(id, event, data, [context])
 *
 * support for the following props
 * - initialState (called by props.initState)
 * - didMountActionCreator (id or array of id)
 * - willUnMountActionCreator (id or array of id)
 * - componentId (or will use uuid)
 * - keepComponentState (boolean, overrides the keepComponentState defined in container)
 * - didMountActionCreator (string called as action creator in didMount)
 * - view (string to inject the settings as props with ref support)
 * - whateverExpression (will inject `whatever` props and will remove it)
 * @example
 * options has the following shape:
{
	componentId,  // string or function(props) to compute the id in the store
	defaultState,  // the default state when the component is mount
	keepComponent,  // boolean, when the component is unmount, to keep it's state in redux store
	mapStateToProps,  // function(state, ownProps) that should return the props (same as redux)
	mapDispatchToProps,  // same as redux connect arg, you should use dispatchActionCreator instead
	mergeProps,  // same as redux connect
}
 * @param {object} options Option objects to configure the redux connect
 * @return {ReactComponent}
 */
export default function cmfConnect({
	componentId,
	defaultState,
	defaultProps,
	keepComponentState,
	mapStateToProps,
	mapDispatchToProps,
	mergeProps,
	omitCMFProps = true,
	withComponentRegistry = false,
	withDispatch = false,
	withDispatchActionCreator = false,
	withComponentId = false,
	...rest
} = {}) {
	const propsToOmit = [];
	if (omitCMFProps) {
		if (!defaultState) {
			propsToOmit.push(...CONST.INJECTED_STATE_PROPS);
		}
		if (!withComponentRegistry) {
			propsToOmit.push('getComponent');
		}
		if (!withComponentId) {
			propsToOmit.push('componentId');
		}
		if (!withDispatch) {
			propsToOmit.push('dispatch');
		}
		if (!withDispatchActionCreator) {
			propsToOmit.push('dispatchActionCreator');
		}
	}
	let displayNameWarning = true;

	return function wrapWithCMF(WrappedComponent) {
		if (!WrappedComponent.displayName && displayNameWarning) {
			displayNameWarning = false;
			// eslint-disable-next-line no-console
			console.warn(
				`${WrappedComponent.name} has no displayName. Please read https://jira.talendforge.org/browse/TUI-302`,
			);
		}
		function getState(state, id = 'default') {
			return state.cmf.components.getIn([getComponentName(WrappedComponent), id], defaultState);
		}
		function getSetStateAction(state, id, type) {
			return {
				type: type || `${getComponentName(WrappedComponent)}.setState`,
				cmf: {
					componentState: actions.components.mergeState(
						getComponentName(WrappedComponent),
						id,
						state,
					),
				},
			};
		}

		function CMFContainer(props) {
			const [instanceId] = React.useState(uuidv4());
			const registry = React.useContext(RegistryContext);
			const store = useStore();

			function dispatchActionCreator(actionCreatorId, event, data, extraContext) {
				const extendedContext = { registry, store, ...extraContext };
				props.dispatchActionCreator(actionCreatorId, event, data, extendedContext);
			}

			React.useEffect(() => {
				initState(props);
				if (props.saga) {
					dispatchActionCreator(
						'cmf.saga.start',
						{ type: 'DID_MOUNT', componentId: instanceId },
						{
							...props, // DEPRECATED
							componentId: getComponentId(componentId, props),
						},
					);
				}
				if (props.didMountActionCreator) {
					dispatchActionCreator(props.didMountActionCreator, null, props);
				}
				return () => {
					if (props.willUnmountActionCreator) {
						dispatchActionCreator(props.willUnmountActionCreator, null, props);
					}
					// if the props.keepComponentState is present we have to stick to it
					if (
						props.keepComponentState === false ||
						(props.keepComponentState === undefined && !keepComponentState)
					) {
						props.deleteState(props.initialState);
					}
					if (props.saga) {
						dispatchActionCreator(
							'cmf.saga.stop',
							{ type: 'WILL_UNMOUNT', componentId: instanceId },
							props,
						);
					}
				};
				// eslint-disable-next-line react-hooks/exhaustive-deps
			}, []);
			function getOnEventProps() {
				return Object.keys(props).reduce(
					(acc, key) => {
						// TODO check how to replace the this
						onEvent.addOnEventSupport(onEvent.DISPATCH, { props }, acc, key);
						onEvent.addOnEventSupport(onEvent.ACTION_CREATOR, { props }, acc, key);
						onEvent.addOnEventSupport(onEvent.SETSTATE, { props }, acc, key);
						return acc;
					},
					{ toOmit: [], dispatchActionCreator },
				);
			}

			if (props.renderIf === false) {
				return null;
			}
			const { toOmit, spreadCMFState, ...handlers } = getOnEventProps();

			// remove all internal props already used by the container
			delete handlers.dispatchActionCreator;
			toOmit.push(...CONST.CMF_PROPS, ...propsToOmit);
			if (props.omitRouterProps) {
				toOmit.push('omitRouterProps', ...CONST.INJECTED_ROUTER_PROPS);
			}
			let spreadedState = {};
			if ((spreadCMFState || props.spreadCMFState) && props.state) {
				spreadedState = props.state.toJS();
			}

			const newProps = {
				...omit(props, toOmit),
				...handlers,
				...spreadedState,
			};
			if (newProps.dispatchActionCreator && toOmit.indexOf('dispatchActionCreator') === -1) {
				// override to inject CMFContainer context
				newProps.dispatchActionCreator = dispatchActionCreator;
			}
			if (!newProps.state && defaultState && toOmit.indexOf('state') === -1) {
				newProps.state = defaultState;
			}
			return createElement(WrappedComponent, newProps);
		}
		CMFContainer.displayName = `CMF(${getComponentName(WrappedComponent)})`;

		CMFContainer.propTypes = {
			...cmfConnect.propTypes,
		};
		CMFContainer.WrappedComponent = WrappedComponent;
		CMFContainer.getState = getState;

		CMFContainer.setStateAction = function setStateAction(state, id = 'default', type) {
			if (typeof state !== 'function') {
				return getSetStateAction(state, id, type);
			}
			return (_, getReduxState) =>
				getSetStateAction(state(getState(getReduxState(), id)), id, type);
		};

		const Connected = connect(
			(state, ownProps) =>
				getStateToProps({
					componentId,
					defaultProps,
					defaultState,
					ownProps,
					state,
					mapStateToProps,
					WrappedComponent,
				}),
			(dispatch, ownProps) =>
				getDispatchToProps({
					defaultState,
					dispatch,
					componentId,
					mapDispatchToProps,
					ownProps,
					WrappedComponent,
				}),
			(stateProps, dispatchProps, ownProps) =>
				getMergeProps({
					mergeProps,
					stateProps,
					dispatchProps,
					ownProps,
				}),
			{ ...rest },
		)(hoistStatics(CMFContainer, WrappedComponent));
		Connected.CMFContainer = CMFContainer;
		return Connected;
	};
}

cmfConnect.INJECTED_PROPS = CONST.INJECTED_PROPS;
cmfConnect.INJECTED_STATE_PROPS = CONST.INJECTED_STATE_PROPS;
cmfConnect.INJECTED_ROUTER_PROPS = CONST.INJECTED_ROUTER_PROPS;
cmfConnect.ALL_INJECTED_PROPS = CONST.INJECTED_PROPS.concat(['getComponent', 'componentId']);
cmfConnect.omit = omit;
cmfConnect.omitAllProps = props => cmfConnect.omit(props, cmfConnect.ALL_INJECTED_PROPS);

cmfConnect.propTypes = {
	state: ImmutablePropTypes.map,
	initialState: PropTypes.oneOfType([ImmutablePropTypes.map, PropTypes.object]),
	getComponent: PropTypes.func,
	setState: PropTypes.func,
	initState: PropTypes.func,
	dispatchActionCreator: PropTypes.func,
	dispatch: PropTypes.func,
};
