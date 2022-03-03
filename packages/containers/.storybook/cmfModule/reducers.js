import { action } from '@storybook/addon-actions';

const TOGGLE_FLAG_TYPE = 'TOGGLE_FLAG_TYPE';
const actionLogger = action('dispatch');
function flagToggleReducer(state = {}, { type, flagId }) {
	if (type === TOGGLE_FLAG_TYPE) {
		return {
			...state,
			[flagId]: !state[flagId],
		};
	}
	return state;
}
function appReducer(state = {}, action) {
	actionLogger(action);
	return {
		flags: flagToggleReducer(state.flags, action),
	};
}

function routerReducer(state = {}, action) {
	actionLogger(action);
	return {
		locationBeforeTransitions: {
			pathname: '/storybook',
		},
	};
}
const reducer = {
	app: appReducer,
	routing: routerReducer,
};
export default reducer;
