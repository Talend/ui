/* eslint no-console: ["error", { allow: ["warn"] }] */
/**
 * @module react-cmf/lib/reducers/componentsReducers
 */
import get from 'lodash/get';
import { Map, fromJS } from 'immutable';
import invariant from 'invariant';
import CONSTANTS from '../constant';

export const defaultState = new Map();

/**
 * given the state and action, determine if another component try to bind to a specific
 * component name space state and warn the user about this behaviour
 * @param {Object} state the CMF application state
 * @param {Object} action a redux action
 */
export function warnIfAnotherComponentBind(state, action) {
	if (process.env.NODE_ENV !== 'production') {
		if (state.getIn([action.componentName, action.key])) {
			console.warn(`Beware component ${action.componentName} try to recreate an existing
 State namespace ${action.key}, meaning that the original one will be overloaded`);
		}
	}
}

/**
 * given the state and action, determine if a component at unmount try to delete
 * a state namespace that doesn't exist anymore and warn the user about this behavior
 * @param {Object} state the CMF application state
 * @param {Object} action a redux action
 */
export function warnIfRemovingStateDoesntExist(state, action) {
	if (process.env.NODE_ENV !== 'production') {
		if (!state.getIn([action.componentName, action.key])) {
			console.warn(`Beware the component ${action.componentName} try to remove a non existing
 State namespace ${action.key}, it isn't a normal behavior execpt if two component are binded
 to this specific namespace`);
		}
	}
}

/**
 * given the state and action, determine if a component try to update a state namespace that
 * doesn't exist, throw an errror at dev time since such a behavior may lead to unintended bug
 * or runtime errors later on app execution.
 * @param {Object} state the CMF application state
 * @param {Object} action a redux action
 */
export function errorIfMergingStateDoesntExist(state, action) {
	if (!state.getIn([action.componentName, action.key])) {
		invariant(
			process.env.NODE_ENV === 'production',
			`Error, the component ${action.componentName} try to mutate a non existing
 State namespace ${action.key}, this namespace may be not yet created or already removed.`,
		);
	}
}

/**
 * Reducer on charge to manage component remote state.
 * @param  {object} state  initial state
 * @param  {object} action the executed action
 * @return {object}        the new state
 */
export function componentsReducers(state = defaultState, action) {
	switch (action.type) {
		case CONSTANTS.COMPONENT_ADD_STATE:
			warnIfAnotherComponentBind(state, action);
			if (action.initialComponentState) {
				return state.setIn(
					[action.componentName, action.key],
					fromJS(action.initialComponentState),
				);
			}
			return state.setIn([action.componentName, action.key], new Map());
		case CONSTANTS.COMPONENT_MERGE_STATE:
			errorIfMergingStateDoesntExist(state, action);

			return state.mergeIn([action.componentName, action.key], fromJS(action.componentState));
		case CONSTANTS.COMPONENT_REMOVE_STATE:
			warnIfRemovingStateDoesntExist(state, action);
			return state.deleteIn([action.componentName, action.key]);
		default: {
			const subAction = get(action, 'cmf.componentState');
			if (subAction) {
				return componentsReducers(state, subAction);
			}
			return state;
		}
	}
}

export default componentsReducers;
