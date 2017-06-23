import { PropTypes } from 'react';
import invariant from 'invariant';
import actions from './actions';

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

export function applyCallback(callback, name, id) {
	return (dispatch, getState) => {
		const newState = callback(getStateProps(getState(), name, id));
		dispatch(actions.componentsActions.mergeComponentState(name, id, newState));
	};
}

export function getStateAccessors(dispatch, name, id, DEFAULT_STATE) {
	const accessors = {
		setState(state) {
			if (!DEFAULT_STATE) {
				invariant(
					process.env.NODE_ENV === 'production',
					'you must provide a defaultState to use setState',
				);
			}
			if (typeof state === 'function') {
				dispatch(applyCallback(state, name, id));
			} else {
				dispatch(actions.componentsActions.mergeComponentState(name, id, state));
			}
		},
		initState(initialState) {
			if (DEFAULT_STATE) {
				const state = DEFAULT_STATE.merge(initialState);
				dispatch(actions.componentsActions.addComponentState(name, id, state));
			}
		},
		deleteState() {
			if (DEFAULT_STATE) {
				dispatch(actions.componentsActions.removeComponentState(name, id));
			}
		},
	};
	accessors.updateState = function updateState(state) {
		console.warn('DEPRECATION WARNING: please use props.setState');
		accessors.setState(state);
	};
	return accessors;
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
