import * as ACTIONS from './actions';

const defaultState = {};

export function appReducer(state = defaultState, action) {
	switch (action.type) {
	case ACTIONS.MY_ACTION: {
		return Object.assign({}, state);
	}
	default: {
		return state;
	}
	}
}
