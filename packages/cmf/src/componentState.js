import PropTypes from 'prop-types';
import Immutable from 'immutable';
import actions from './actions';

/**
 * This module provide props.setState and props.state into
 * cmfConnected component. It exposes CMF propTypes
 * @module react-cmf/lib/componentState
 * @see module:react-cmf/lib/cmfConnect
 * @example
import { cmfConnect, componentState } from '@talend/react-cmf';

class MyComponent extends React.Component {
	static propTypes = {
		...componentState.propTypes,
	};
	render() {
		// ...
	}
}
export default cmfConnect({})(MyComponent);
 */

export function getStateProps(state, name, id = 'default') {
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
		dispatch(
			getAction({
				id,
				name,
				componentState,
				operation,
			}),
		);
	};

	const accessors = {
		setState(state) {
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
			let state;
			if (DEFAULT_STATE) {
				state = DEFAULT_STATE.merge(initialState);
			} else if (initialState) {
				state = Immutable.Map.isMap(initialState) ? initialState : Immutable.fromJS(initialState);
			}
			if (state) {
				const componentState = actions.components.addState(name, id, state);
				dispatchAction('initState', componentState);
			}
		},
		deleteState(initialState) {
			if (DEFAULT_STATE || initialState) {
				const componentState = actions.components.removeState(name, id);
				dispatchAction('deleteState', componentState);
			}
		},
	};
	accessors.updateState = function updateState(state) {
		// eslint-disable-next-line no-console
		console.warn('DEPRECATION WARNING: please use props.setState');
		accessors.setState(state);
	};
	return accessors;
}

// DEPRECATION Warning: Please use cmfConnect.propTypes
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
