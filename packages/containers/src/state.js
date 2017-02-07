import { PropTypes } from 'react';
import { actions } from 'react-cmf';

export function getStateAccessors(dispatch, name, id, DEFAULT_STATE) {
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
	};
}

export function getStateProps(state, name, id) {
	return {
		state: state.cmf.components.getIn([name, id]),
	};
}

export function stateWillMount(props) {
	if (!props.state && props.initState) {
		props.initState(props.initialState);
	}
}

export const statePropTypes = {
	state: PropTypes.object,
	initialState: PropTypes.object,
	updateState: PropTypes.func,
	initState: PropTypes.func,
};
