import registry from './registry';
import CONST from './constant';

/**
 * return a function from the registry
 * @param  {object} context
 * @param  {string} id the id of the action creator
 * @return {function}
 */
function get(context, id) {
	const creator = context.registry[`${CONST.REGISTRY_ACTION_CREATOR_PREFIX}:${id}`];
	if (!creator) {
		throw new Error(`actionCreator not found in the registry: ${id}`);
	}
	return creator;
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
function register(id, actionCreator, context) {
	if (actionCreator === undefined) {
		throw new Error(
			`CMF: you can't register an undefined value for the following action creator: '${id}'.
			You may have an import error in your code. Check the stack trace and your bootstrap config imports.
			https://github.com/Talend/ui/tree/master/packages/cmf/src/bootstrap.md`,
		);
	}
	registry.addToRegistry(`${CONST.REGISTRY_ACTION_CREATOR_PREFIX}:${id}`, actionCreator, context);
}

/**
 * This function allow to register an object with some action creators
 * @param {object} actionCreators map of action creators
 * @param {object} context optional context to get the registry
 */
const registerMany = registry.getRegisterMany(register);

export default {
	get,
	register,
	registerMany,
};
