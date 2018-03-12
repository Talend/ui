/**
 * This module connect your component in the CMF environment.
 * @module react-cmf/lib/cmfConnect
 * @example
import { cmfConnect } from '@talend/react-cmf';

class MyComponent extends React.Component {
	static displayName = 'MyComponent';
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}
	onClick(event) {
		return this.props.dispatchActionCreator('myaction', event, { props: this.props });
	}
	render() {
		return <button onClick={this.onClick}>Edit {this.props.foo.name}</button>;
	}
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
import invariant from 'invariant';
import PropTypes from 'prop-types';
import React, { createElement } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import omit from 'lodash/omit';
import api from './api';
import deprecated from './deprecated';
import CONSTANT from './constant';

import { statePropTypes, initState, getStateAccessors, getStateProps } from './componentState';
import { mapStateToViewProps } from './settings';

let newState;

function serializeEvent(event) {
	if (event.persist) {
		event.persist();
	}
	return event;
}

export const CMF_PROPS = [
	'didMountActionCreator', // componentDidMount action creator id in registry
	'keepComponentState', // redux state management on unmount
	'view', // view component id in registry
	'saga',
	'willUnMountActionCreator', // componentWillUnmount action creator id in registry
];

export const INJECTED_PROPS = [
	'setState',
	'deleteState',
	'updateState',
	'componentId',
	'state',
	'initState',
	'getCollection',
	'dispatch',
	'dispatchActionCreator',
];

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

function oldGetCollection(id) {
	return newState.cmf.collections.get(id);
}

const getCollection = deprecated(
	oldGetCollection,
	`This function will be deprecated,
	since it permit store access outside cmfConnect mapStateToProps function
	and maybe not executed if cmf connect do not detect ref change to props
	given to the component using this function
	Please bind your collection update to your component using mapStateToProps`,
);

export function getStateToProps({
	componentId,
	ownProps,
	state,
	mapStateToProps,
	WrappedComponent,
}) {
	newState = state;
	const cmfProps = getStateProps(
		state,
		getComponentName(WrappedComponent),
		getComponentId(componentId, ownProps),
	);

	cmfProps.getCollection = getCollection;

	const viewProps = mapStateToViewProps(
		state,
		ownProps,
		getComponentName(WrappedComponent),
		getComponentId(componentId, ownProps),
	);

	let userProps = {};
	if (mapStateToProps) {
		userProps = mapStateToProps(state, { ...ownProps, ...viewProps }, cmfProps);
	}

	const props = {
		...cmfProps,
		...viewProps,
		...userProps,
	};
	return {
		...props,
		...api.expression.mapStateToProps(state, { ...ownProps, ...props }),
	};
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
	cmfProps.getComponent = api.component.get;
	cmfProps.dispatchActionCreator = (actionId, event, data, context) => {
		dispatch(api.actionCreator.get(context, actionId)(event, data, context));
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
			api.expression.mergeProps(stateProps),
			api.expression.mergeProps(dispatchProps),
			api.expression.mergeProps(ownProps),
		);
	}
	return {
		...api.expression.mergeProps(ownProps),
		...api.expression.mergeProps(dispatchProps),
		...api.expression.mergeProps(stateProps),
	};
}

/**
 * this function wrap your component to inject CMF props
 * @example
 * The following props are injected:
 * - props.state
 * - props.setState
 * - props.initState (you should never have to call it your self)
 * - props.getCollection
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
	keepComponentState,
	mapStateToProps,
	mapDispatchToProps,
	mergeProps,
	...rest
}) {
	return function wrapWithCMF(WrappedComponent) {
		if (!WrappedComponent.displayName) {
			invariant(true, `${WrappedComponent.name} has no displayName`);
		}
		class CMFContainer extends React.Component {
			static displayName = `CMF(${getComponentName(WrappedComponent)})`;
			static propTypes = {
				...WrappedComponent.propTypes,
				...statePropTypes,
			};
			static contextTypes = {
				store: PropTypes.object,
				registry: PropTypes.object,
				router: PropTypes.object,
			};
			static WrappedComponent = WrappedComponent;

			constructor(props, context) {
				super(props, context);
				this.dispatchActionCreator = this.dispatchActionCreator.bind(this);
				this.onEvent = this.onEvent.bind(this);
				this.onEventDispatch = this.onEventDispatch.bind(this);
			}

			componentDidMount() {
				initState(this.props);
				if (this.props.saga) {
					this.dispatchActionCreator('cmf.saga.start', { type: 'DID_MOUNT' }, this.props);
				}
				if (this.props.didMountActionCreator) {
					this.dispatchActionCreator(this.props.didMountActionCreator, null, this.props);
				}
			}

			componentWillUnmount() {
				if (this.props.willUnmountActionCreator) {
					this.dispatchActionCreator(this.props.willUnmountActionCreator, null, this.props);
				}
				// if the props.keepComponentState is present we have to stick to it
				if (
					this.props.keepComponentState === false ||
					(this.props.keepComponentState === undefined && !keepComponentState)
				) {
					this.props.deleteState();
				}
				if (this.props.saga) {
					this.dispatchActionCreator('cmf.saga.stop', { type: 'WILL_UNMOUNT' }, this.props);
				}
			}

			onEvent() {
				return Object.keys(this.props).reduce(this.onEventDispatch, { toOmit: [] });
			}

			onEventDispatch(props, key) {
				if (CONSTANT.IS_HANDLER_DISPATCH_REGEX.test(key)) {
					const handlerKey = key.replace(CONSTANT.IS_HANDLER_DISPATCH, '');
					props.toOmit.push(key);
					// eslint-disable-next-line no-param-reassign
					props[handlerKey] = (event, data) => {
						const payload = Object.assign(
							{
								event: serializeEvent(event),
								data,
							},
							this.props[key],
						);
						this.props.dispatch(payload);
						if (this.props[handlerKey]) {
							this.props[handlerKey](event, data);
						}
					};
				} else if (CONSTANT.IS_HANDLER_ACTION_CREATOR_REGEX.test(key)) {
					props.toOmit.push(key);
					const handlerKey = key.replace(CONSTANT.IS_HANDLER_ACTION_CREATOR, '');
					let actionCreator = this.props[key];
					if (typeof this.props[key] === 'object') {
						actionCreator = this.props[key].id;
					}
					// eslint-disable-next-line no-param-reassign
					props[handlerKey] = (event, data) => {
						this.dispatchActionCreator(actionCreator, serializeEvent(event), {
							props: this.props,
							...data,
							...(this.props[key].data || {}),
						});
						if (this.props[handlerKey]) {
							this.props[handlerKey](event, data);
						}
					};
				}
				return props;
			}

			dispatchActionCreator(actionCreatorId, event, data, context) {
				const extendedContext = Object.assign({}, this.context, context);
				this.props.dispatchActionCreator(actionCreatorId, event, data, extendedContext);
			}

			render() {
				const { toOmit, ...handlers } = this.onEvent();
				const props = {
					...omit(this.props, toOmit),
					...handlers,
					dispatchActionCreator: this.dispatchActionCreator,
				};
				if (!props.state && defaultState) {
					props.state = defaultState;
				}

				// remove all internal props already used by the container
				CMF_PROPS.forEach(key => {
					delete props[key];
				});
				return createElement(WrappedComponent, props);
			}
		}
		const Connected = connect(
			(state, ownProps) =>
				getStateToProps({
					componentId,
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

cmfConnect.INJECTED_PROPS = INJECTED_PROPS;

cmfConnect.propTypes = {
	state: ImmutablePropTypes.map,
	initialState: ImmutablePropTypes.map,
	getComponent: PropTypes.func,
	setState: PropTypes.func,
	initState: PropTypes.func,
	dispatchActionCreator: PropTypes.func,
	dispatch: PropTypes.func,
};
