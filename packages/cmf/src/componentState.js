import { PropTypes } from 'react';
import { Map } from 'immutable';
import actions from './actions';

export function getStateAccessors(dispatch, name, id, DEFAULT_STATE = new Map()) {
	return {
		updateState(state) {
			console.warn('DEPRECATION WARNING: please use props.setState');
			dispatch(
				actions.componentsActions.mergeComponentState(
					name,
					id,
					state,
				),
			);
		},
		setState(state) {
			dispatch(
				actions.componentsActions.mergeComponentState(
					name,
					id,
					state,
				),
			);
		},
		initState(initialState) {
			const state = DEFAULT_STATE.merge(initialState);
			dispatch(
				actions.componentsActions.addComponentState(
					name,
					id,
					state,
				),
			);
		},
		deleteState() {
			dispatch(
				actions.componentsActions.removeComponentState(
					name,
					id,
				),
			);
		},
	};
}

export function getStateProps(state, name, id) {
	return {
		state: state.cmf.components.getIn([name, id]),
	};
}

export function initState(props) {
	if (!props.state && props.initState) {
		props.initState(props.initialState);
	}
}

export const statePropTypes = {
	state: PropTypes.object,
	initialState: PropTypes.object,
	setState: PropTypes.func,
	initState: PropTypes.func,
};

export default {
	propTypes: statePropTypes,
	init: initState,
	getProps: getStateProps,
	getAccessors: getStateAccessors,
};
