import { Map, fromJS } from 'immutable';
import ACTIONS from '../actions';

export const defaultState = new Map();

export function componentsReducer(state = defaultState, action) {
	switch (action.type) {
	case ACTIONS.componentsActions.COMPONENT_ADD_STATE:
		if (action.initialComponentState) {
			return state.setIn(
				[action.componentName, action.key],
				fromJS(action.initialComponentState)
			);
		}
		return state.setIn(
			[action.componentName, action.key],
			new Map()
		);
	case ACTIONS.componentsActions.COMPONENT_MERGE_STATE:
		return state.mergeIn(
			[action.componentName, action.key],
			fromJS(action.componentState)
		);
	case ACTIONS.componentsActions.COMPONENT_REMOVE_STATE:
		return state.deleteIn([action.componentName, action.key]);
	default:
		return state;
	}
}

export default componentsReducer;
