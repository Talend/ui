import React, { PropTypes, createElement } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { api } from 'react-cmf';
import { connect } from 'react-redux';

import {
	statePropTypes,
	initState,
	getStateAccessors,
	getStateProps,
} from './state';

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
	let props = getStateProps(
		state,
		getComponentName(WrappedComponent),
		getComponentId(componentId, ownProps),
	);
	if (mapStateToProps) {
		props = Object.assign(props, mapStateToProps(state, ownProps));
	}
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
	let props = getStateAccessors(
		dispatch,
		getComponentName(WrappedComponent),
		getComponentId(componentId, ownProps),
		defaultState,
	);
	props.dispatch = dispatch;
	if (mapDispatchToProps) {
		props = Object.assign(props, mapDispatchToProps(dispatch, ownProps));
	}
	props.dispatchActionCreator = (actionId, event, data, context) => {
		dispatch(
			api.action.getActionCreatorFunction(
				context,
				actionId,
			)(event, data, context)
		);
	};

	return props;
}

/**
 * this function wrap your component to inject the following:
 * - props.state
 * - props.updateState
 * - props.initState (call it un didMount)
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
		...rest
	}) {
	return function wrapWithCMF(WrappedComponent) {
		class CMFContainer extends React.Component {
			static displayName = `CMFConnect(${WrappedComponent.displayName})`;
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

			componentDidMount() {
				initState(this.props);
				if (this.props.didMountActionCreator) {
					this.props.dispatch(
						api.action.getActionCreatorFunction(
							this.context, this.props.didMountActionCreator
						)(null, this.props, this.context)
					);
				}
			}

			componentWillUnmount() {
				if (this.props.willUnmountActionCreator) {
					this.props.dispatch(
						api.action.getActionCreatorFunction(
							this.context, this.props.didMountActionCreator
						)(null, this.props, this.context)
					);
				}
				if (!keepComponentState) {
					this.props.updateState();
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
			...rest,
		)(hoistStatics(CMFContainer, WrappedComponent));
	};
}
