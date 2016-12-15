import { PropTypes } from 'react';
import { actions } from 'react-cmf';

export function getStateAccessors(dispatch, name, id, DEFAULT_STATE) {
	return {
		updateState(state) {
			dispatch(
				actions.componentsActions.mergeComponentState(
					name,
					id,
					state
				)
			);
		},
		initState() {
			dispatch(
				actions.componentsActions.addComponentState(
					name,
					id,
					DEFAULT_STATE
				)
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
		props.initState();
	}
}

export const statePropTypes = {
	state: PropTypes.object,
	updateState: PropTypes.func,
	initState: PropTypes.func,
};
