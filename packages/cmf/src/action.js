import get from 'lodash/get';
import deprecated from './deprecated';
import actionCreatorAPI from './actionCreator';

/**
 * This module is DEPRECATED and will be removed in future version.
 * it provide low level api to register and handle action in a CMF App.
 * @module react-cmf/lib/action
 * @see module:react-cmf/lib/Dispatcher
 */

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
	return get(state, `cmf.settings.contentTypes[${contentType}.actions[${category}]`, []);
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
	return { ...action };
}

/**
 * Return the action object ready to be dispatched
 * This is supposed to be used outside of content type
 * @param  {object} context
 * @param  {String|Object} action or the action
 * @param  {object} event event which have trigger this action
 * @param  {object} data data attached to the action
 */
function getActionObject(context, action, event, data) {
	let actionInfo;
	if (typeof action === 'string') {
		actionInfo = getActionInfo(context, action);
	} else {
		actionInfo = action;
	}
	if (actionInfo.actionCreator) {
		const actionCreator = actionCreatorAPI.get(context, actionInfo.actionCreator);
		return actionCreator(event, data, {
			store: context.store,
			getState: context.store.getState,
			registry: context.registry,
			actionInfo,
		});
	}
	return { ...actionInfo.payload, event, data, context };
}

/**
 * return every props name that start with 'on'
 * @param  {object} props react props
 * @return {Array}       of string
 */
function getOnProps(props) {
	return Object.keys(props).filter(
		name => ({}.hasOwnProperty.call(props, name) && /^on.+/.test(name)),
	);
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
	getOnProps(props).forEach(name => {
		resolvedActions[name] = (event, data, context) => {
			let action = props[name];
			if (typeof action === 'string') {
				action = getActionObject(context, action, event, data);
			}
			dispatch(action);
		};
	});
	return { ...props, ...resolvedActions };
}

const registerActionCreator = deprecated(
	(id, actionCreator, context) => actionCreatorAPI.register(id, actionCreator, context),
	'stop use cmf.action.registerActionCreator. please use cmf.actionCreator.register',
);

const getActionCreatorFunction = deprecated(
	(context, id) => actionCreatorAPI.get(context, id),
	'stop use cmf.action.getActionCreatorFunction. please use cmf.actionCreator.get',
);

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
