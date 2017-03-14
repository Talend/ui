import { PropTypes } from 'react';
import { Map } from 'immutable';
import { actions } from 'react-cmf';

export function getStateAccessors(dispatch, name, id, DEFAULT_STATE = new Map()) {
	return {
		updateState(state) {
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

// BBB
export function stateWillMount(props) {
	console.log(  // eslint-disable-line no-console
		`DEPRECATION Warning: you should use initState
		in componentDidMount instead.
		https://github.com/facebook/react/issues/7671`);
	initState(props);
}

export const statePropTypes = {
	state: PropTypes.object,
	initialState: PropTypes.object,
	updateState: PropTypes.func,
	initState: PropTypes.func,
};

export default {
	propTypes: statePropTypes,
	init: initState,
	getProps: getStateProps,
	getAccessors: getStateAccessors,
};
