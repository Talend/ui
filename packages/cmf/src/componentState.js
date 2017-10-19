import PropTypes from 'prop-types';
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

function getAction({ name, id, operation, componentState }) {
	return {
		id,
		type: `${name}.${operation}`,
		cmf: { componentState },
	};
}

export function getStateAccessors(dispatch, name, id, DEFAULT_STATE) {
	const dispatchAction = (operation, componentState) => {
		dispatch(getAction({
			id,
			name,
			componentState,
			operation,
		}));
	};

	const accessors = {
		setState(state) {
			if (!DEFAULT_STATE) {
				invariant(
					process.env.NODE_ENV === 'production',
					'you must provide a defaultState to use setState',
				);
			}
			dispatch((_, getState) => {
				let newState = state;
				if (typeof newState === 'function') {
					newState = state(getStateProps(getState(), name, id));
				}
				const componentState = actions.components.mergeState(name, id, newState);
				dispatchAction('setState', componentState);
			});
		},
		initState(initialState) {
			if (DEFAULT_STATE) {
				const state = DEFAULT_STATE.merge(initialState);
				const componentState = actions.components.addState(name, id, state);
				dispatchAction('initState', componentState);
			}
		},
		deleteState() {
			if (DEFAULT_STATE) {
				const componentState = actions.components.removeState(name, id);
				dispatchAction('deleteState', componentState);
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
