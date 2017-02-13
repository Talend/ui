/**
 * @module react-cmf/lib/reducers/componentsReducers
 */
import { Map, fromJS } from 'immutable';
import invariant from 'invariant';
import ACTIONS from '../actions';

export const defaultState = new Map();

/**
 * @param  {object} state  initial state
 * @param  {object} action the executed action
 * @return {object}        the new state
 */
export function componentsReducers(state = defaultState, action) {
	switch (action.type) {
	case ACTIONS.componentsActions.COMPONENT_ADD_STATE:
		if (state.getIn([action.componentName, action.key])) {
			invariant(
				false,
				`Can't set up your component ${action.componentName} on
				key ${action.key} since this association already exist`,
			);
		}
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
		if (!state.getIn([action.componentName, action.key])) {
			invariant(false, `The component state can't be merged since the
			${action.componentName}, ${action.key} association doesn't exist.`);
		}

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

export default componentsReducers;
