import get from 'lodash/get';
import registry from './registry';

/**
 * @module react-cmf/lib/action
 */

const ACTION_CREATOR_PREFIX = 'actionCreator';

/**
 * get the global actions registered in the settings
 * @param  {object} context
 * @return {object} actions with key === action id
 */
function getActionsById(context) {
	const state = context.store.getState();
	return get(state, 'cmf.settings.actions', {});
}

/**
 * return actions registered for a given content type
 * @param  {object} context
 * @param  {String} contentType
 * @param  {String} category
 * @return {Array} actions
 */
function getContentTypeActions(context, contentType, category) {
	const state = context.store.getState();
	return get(
		state,
		`cmf.settings.contentTypes[${contentType}.actions[${category}]`,
		[],
	);
}

/**
 * return a function from the registry
 * @param  {object} context
 * @param  {string} id the id of the action creator
 * @return {function}
 */
function getActionCreatorFunction(context, id) {
	const creator = context.registry[`${ACTION_CREATOR_PREFIX}:${id}`];
	if (!creator) {
		throw new Error(`actionCreator not found in the registry: ${id}`);
	}
	return creator;
}

/**
 * Return information available about this action
 * @param  {object} context
 * @param  {String} id
 * @return {object}
 */
function getActionInfo(context, id) {
	const action = getActionsById(context)[id];
	if (!action) {
		throw new Error(`action not found id: ${id}`);
	}
	return Object.assign({}, action);
}

/**
 * Return the action object ready to be dispatched
 * This is supposed to be used outside of content type
 * @param  {object} context
 * @param  {String} id
 * @param  {object} event event which have trigger this action
 * @param  {object} data data attached to the action
 */
function getActionObject(context, id, event, data) {
	const action = getActionInfo(context, id);
	if (action.actionCreator) {
		const actionCreator = getActionCreatorFunction(context, action.actionCreator);
		return actionCreator(event, data, {
			getState: context.store.getState,
			router: context.router,
			registry: context.registry,
			action,
		});
	}
	return Object.assign({}, action.payload, { event, data, context });
}

/**
 * return every props name that start with 'on'
 * @param  {object} props react props
 * @return {Array}       of string
 */
function getOnProps(props) {
	return Object.keys(props).filter(name => (
		{}.hasOwnProperty.call(props, name) &&
		/^on.+/.test(name)
	));
}

/**
 * create a map dispatchable action function expecting event object, props, and context information
 * merge this map with non event properties
 * @param  {Function} dispatch the dispatch function
 * @param  {object} props    props object containing maybe on(event) with string
 *                           or action creator function]
 * @return {object}          the connected object
 * @throws if an action is unknown in configuration, throw
 */
function mapDispatchToProps(dispatch, props) {
	const resolvedActions = {};
	getOnProps(props).forEach((name) => {
		resolvedActions[name] = (event, data, context) => {
			let action = props[name];
			if (typeof action === 'string') {
				action = getActionObject(context, action, event, data);
			}
			dispatch(action);
		};
	});
	return Object.assign({}, props, resolvedActions);
}

/**
 * register your action creator. The action creator is a function with
 * the following arguments:
 * - event which trigger this action
 * - data attached to the action (could contains anything)
 * - context of the current react app (could contains registry, getState, ...)
 * @param  {String} id
 * @param  {Function} actionCreator (event, data, context)
 */
function registerActionCreator(id, actionCreator) {
	registry.addToRegistry(`${ACTION_CREATOR_PREFIX}:${id}`, actionCreator);
}

export default {
	getActionsById,
	getActionCreatorFunction,
	getActionInfo,
	getActionObject,
	getContentTypeActions,
	getOnProps,
	mapDispatchToProps,
	registerActionCreator,
};
