import React, { PropTypes, createElement } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { api } from 'react-cmf';
import { connect } from 'react-redux';

import {
	statePropTypes,
	initState,
	getStateAccessors,
	getStateProps,
} from './componentState';

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
	componentId,
	ownProps,
	state,
	mapStateToProps,
	WrappedComponent,
}) {
	const cmfProps = getStateProps(
		state,
		getComponentName(WrappedComponent),
		getComponentId(componentId, ownProps),
	);
	cmfProps.getCollection = function getCollection(id) {
		return state.cmf.collections.get(id);
	};

	let userProps = {};
	if (mapStateToProps) {
		userProps = mapStateToProps(state, ownProps, cmfProps);
	}

	return { ...cmfProps, ...userProps };
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
	cmfProps.dispatchActionCreator = (actionId, event, data, context) => {
		dispatch(
			api.action.getActionCreatorFunction(
				context,
				actionId,
			)(event, data, context)
		);
	};

	let userProps = {};
	if (mapDispatchToProps) {
		userProps = mapDispatchToProps(dispatch, ownProps, cmfProps);
	}

	return { ...cmfProps, ...userProps };
}

/**
 * this function wrap your component to inject the following:
 * - props.state
 * - props.updateState
 * - props.initState (call it un didMount)
 * - props.getCollection
 * - dispatch(action)
 * - dispatchActionCreator(id, event, data, context)
 *
 * support for the following props
 * - initialState (called by props.initState)
 * - didMountActionCreator (id or array of id)
 * - willUnMountActionCreator (id or array of id)
 * - componentId (or will use uuid)
 * @return {ReactComponent}
 */
export default function cmfConnect({
		componentId,
		defaultState,
		keepComponentState,
		mapStateToProps,
		mapDispatchToProps,
		mergeProps,
		...rest,
	}) {
	return function wrapWithCMF(WrappedComponent) {
		class CMFContainer extends React.Component {
			static displayName = `CMF(${WrappedComponent.displayName})`;
			static propTypes = Object.assign(
				{},
				...WrappedComponent.propTypes || {},
				...statePropTypes
			);
			static contextTypes = {
				store: PropTypes.object,
				registry: PropTypes.object,
				router: PropTypes.object,
			};
			static WrappedComponent = WrappedComponent;

			componentDidMount() {
				initState(this.props);
				if (this.props.didMountActionCreator) {
					this.props.dispatchActionCreator(
						this.props.didMountActionCreator,
						null,
						this.props,
						this.context,
					);
				}
			}

			componentWillUnmount() {
				if (this.props.willUnmountActionCreator) {
					this.props.dispatchActionCreator(
						this.props.willUnmountActionCreator,
						null,
						this.props,
						this.context
					);
				}
				if (!keepComponentState) {
					this.props.deleteState();
				}
			}

			render() {
				const props = Object.assign({
					state: defaultState,
				}, this.props);
				return createElement(
					WrappedComponent,
					props,
				);
			}
		}
		return connect(
			(state, ownProps) => getStateToProps({
				componentId,
				ownProps,
				state,
				mapStateToProps,
				WrappedComponent,
			}),
			(dispatch, ownProps) => getDispatchToProps({
				defaultState,
				dispatch,
				componentId,
				mapDispatchToProps,
				ownProps,
				WrappedComponent,
			}),
			mergeProps,
			{ ...rest },
		)(hoistStatics(CMFContainer, WrappedComponent));
	};
}
