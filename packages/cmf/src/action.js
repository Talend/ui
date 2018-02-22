import get from 'lodash/get';
import deprecated from './deprecated';
import actionCreatorAPI from './actionCreator';

const msg = `The CMF action api is deprecated. You should use your own component.
This api is redondant and is just used to map the settings to props.
So please migrate your settings from

{
	"actions": {
		"my-action": { ... props }
	}
}

to

{
	"props": {
		"MyActionComponent#my-action": {
			...props
		}
	}
}
`;

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
	return Object.assign({}, action);
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
			getState: context.store.getState,
			router: context.router,
			registry: context.registry,
			actionInfo,
		});
	}
	return Object.assign({}, actionInfo.payload, { event, data, context });
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
	return Object.assign({}, props, resolvedActions);
}

const registerActionCreator = deprecated(
	(id, actionCreator, context) => actionCreatorAPI.register(id, actionCreator, context),
	'stop use api.action.registerActionCreator. please use api.actionCreator.register',
);

const getActionCreatorFunction = deprecated(
	(context, id) => actionCreatorAPI.get(context, id),
	'stop use api.action.getActionCreatorFunction. please use api.actionCreator.get',
);

export default {
	getActionsById: deprecated(getActionsById, msg),
	getActionCreatorFunction,
	getActionInfo: deprecated(getActionInfo, msg),
	getActionObject: deprecated(getActionObject, msg),
	getContentTypeActions: deprecated(getContentTypeActions, msg),
	getOnProps: deprecated(getOnProps, msg),
	mapDispatchToProps: deprecated(mapDispatchToProps, msg),
	registerActionCreator,
};
