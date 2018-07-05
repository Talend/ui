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
import bsonObjectid from 'bson-objectid';
import actions from './actions';
import actionCreator from './actionCreator';
import component from './component';
import CONST from './constant';
import expression from './expression';
import onEvent from './onEvent';
import { initState, getStateAccessors, getStateProps } from './componentState';
import { mapStateToViewProps } from './settings';

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
	const props = Object.assign({}, defaultProps);

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
	...rest
}) {
	return function wrapWithCMF(WrappedComponent) {
		if (!WrappedComponent.displayName) {
			invariant(true, `${WrappedComponent.name} has no displayName`);
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
		class CMFContainer extends React.Component {
			static displayName = `CMF(${getComponentName(WrappedComponent)})`;
			static propTypes = {
				...WrappedComponent.propTypes,
				...cmfConnect.propTypes,
			};
			static contextTypes = {
				store: PropTypes.object,
				registry: PropTypes.object,
				router: PropTypes.object,
			};
			static WrappedComponent = WrappedComponent;
			static getState = getState;
			static setStateAction = function setStateAction(state, id = 'default', type) {
				if (typeof state !== 'function') {
					return getSetStateAction(state, id, type);
				}
				return (_, getReduxState) =>
					getSetStateAction(state(getState(getReduxState(), id)), id, type);
			};

			constructor(props, context) {
				super(props, context);
				this.dispatchActionCreator = this.dispatchActionCreator.bind(this);
				this.getOnEventProps = this.getOnEventProps.bind(this);
				this.id = bsonObjectid().toString();
			}

			componentDidMount() {
				initState(this.props);
				if (this.props.saga) {
					this.dispatchActionCreator(
						'cmf.saga.start',
						{ type: 'DID_MOUNT', componentId: this.id },
						this.props,
					);
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
					this.props.deleteState(this.props.initialState);
				}
				if (this.props.saga) {
					this.dispatchActionCreator(
						'cmf.saga.stop',
						{ type: 'WILL_UNMOUNT', componentId: this.id },
						this.props,
					);
				}
			}

			getOnEventProps() {
				return Object.keys(this.props).reduce(
					(props, key) => {
						onEvent.addOnEventSupport(onEvent.DISPATCH, this, props, key);
						onEvent.addOnEventSupport(onEvent.ACTION_CREATOR, this, props, key);
						onEvent.addOnEventSupport(onEvent.SETSTATE, this, props, key);
						return props;
					},
					{ toOmit: [] },
				);
			}

			dispatchActionCreator(actionCreatorId, event, data, context) {
				const extendedContext = Object.assign({}, this.context, context);
				this.props.dispatchActionCreator(actionCreatorId, event, data, extendedContext);
			}

			render() {
				if (this.props.renderIf === false) {
					return null;
				}
				const { toOmit, spreadCMFState, ...handlers } = this.getOnEventProps();
				let spreadedState = {};
				if ((spreadCMFState || this.props.spreadCMFState) && this.props.state) {
					spreadedState = this.props.state.toJS();
				}
				const props = {
					...omit(this.props, toOmit),
					...handlers,
					...spreadedState,
					dispatchActionCreator: this.dispatchActionCreator,
				};
				if (!props.state && defaultState) {
					props.state = defaultState;
				}
				// remove all internal props already used by the container
				CONST.CMF_PROPS.forEach(key => {
					delete props[key];
				});
				return createElement(WrappedComponent, props);
			}
		}
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

cmfConnect.propTypes = {
	state: ImmutablePropTypes.map,
	initialState: ImmutablePropTypes.map,
	getComponent: PropTypes.func,
	setState: PropTypes.func,
	initState: PropTypes.func,
	dispatchActionCreator: PropTypes.func,
	dispatch: PropTypes.func,
};
