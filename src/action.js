import registry from './registry';

/**
 * get the global actions registred in the settings
 * @param  {object} context
 * @return {object} actions with key === action id
 */
function getActionsById(context) {
  const state = context.store.getState();
  if (state) {
    if (state.settings) {
      return state.settings.actions;
    }
  }
  return {};
}

/**
 * return actions registred for a given content type
 * @param  {object} context
 * @param  {string} contentType
 * @param  {string} category
 * @return {array} actions
 */
function getContentTypeActions(context, contentType, category) {
  const state = context.store.getState();
  const ct = state.settings.contentTypes[contentType];
  if (ct) {
    if (ct.actions) {
      if (ct.actions[category]) {
        return ct.actions[category];
      }
    }
  }
  return [];
}

/**
 * return a function from the registry
 * @param  {object} context
 * @param  {string} id      the id of the action creator
 * @return {function}
 */
function getActionCreatorFunction(context, id) {
  const creator = context.registry[`actionCreator:${id}`];
  if (!creator) {
    throw new Error(`actionCreator not found in the registry: ${id}`);
  }
  return creator;
}

/**
 * Return information available about this action
 * @param  {object} context
 * @param  {string} id
 * @return {object}
 */
function getActionInfo(context, id) {
  const action = getActionsById(context)[id];
  if (!action) {
    throw new Error(`action not found id: ${id}`);
  }
  return action;
}

/**
 * Return the action object ready to be dispatched
 * This is supposed to be used outside of content type
 * @param  {object} context
 * @param  {string} id
 * @param  {object} event event which have trigger this action
 * @param  {object} data data attached to the action
 * @return {object} redux ready action object with .event, .data, .context
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
  return Object.assign({}, action, { event, data, context });
}

/**
 * create a map dispatchable action function expecting event object, props, and context information
 * merge this map with non event properties
 * @param  {[type]} dispatch [description]
 * @param  {[type]} props    [props object containing maybe on(event) with string
 *                           or action creator function]
 * @return {[type]}          [description]
 * @throws if an action is unknow in configuration, throw
 */
function mapDispatchToProps(dispatch, props) {
  const resolvedActions = {};
  for (const name in props) {
    if (props.hasOwnProperty(name) && /^on.+/.test(name)) {
      resolvedActions[name] = (event, data, context) => {
        let action = props[name];
        if (typeof action === 'string') {
          action = getActionObject(context, action, event, data);
        }
        dispatch(action);
      };
    }
  }
  return Object.assign({}, props, resolvedActions);
}

/**
 * register your action creator. The action creator is a function with
 * the following arguments:
 * - event which trigger this action
 * - data attached to the action (could contains anything)
 * - context of the current react app (could contains registry, getState, ...)
 * @param  {string} id
 * @param  {function} actionCreator (event, data, context)
 */
function registerActionCreator(id, actionCreator) {
  registry.addToRegistry(`actionCreator:${id}`, actionCreator);
}

export default {
  getActionsById,
  getActionCreatorFunction,
  getActionInfo,
  getActionObject,
  getContentTypeActions,
  mapDispatchToProps,
  registerActionCreator,
};
