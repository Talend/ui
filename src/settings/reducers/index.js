import { Map, fromJS } from 'immutable';
import * as ACTIONS from '../actions';

const defaultState = {
  initialized: false,
  contentTypes: {},
  actions: {},
  views: {},
  routes: {},
  collections: new Map(),
  components: new Map(),
};

export function settingsReducer(state = defaultState, action) {
  switch (action.type) {
  case ACTIONS.REQUEST_OK:
    return Object.assign({}, state, {
      initialized: true,
    }, action.settings);
  case ACTIONS.COLLECTION_ADD_OR_REPLACE:
    return Object.assign({}, state, {
      collections: state.collections.set(action.collectionId, fromJS(action.data)),
    });
  case ACTIONS.COLLECTION_REMOVE:
    return Object.assign({}, state, {
      collections: state.collections.delete(action.collectionId),
    });
  case ACTIONS.COMPONENT_ADD_STATE:
    if (action.initialComponentState) {
      return Object.assign({}, state, {
        components: state.components.setIn(
        [action.componentName, action.key],
        fromJS(action.initialComponentState)
      ),
      });
    }
    return Object.assign({}, state, {
      components: state.components.setIn(
        [action.componentName, action.key],
        new Map()
      ),
    });

  case ACTIONS.COMPONENT_MERGE_STATE:
    return Object.assign({}, state, {
      components: state.components.mergeIn(
        [action.componentName, action.key],
        fromJS(action.componentState)
      ),
    });
  case ACTIONS.COMPONENT_REMOVE_STATE:
    return Object.assign({}, state, {
      components: state.components.deleteIn([action.componentName, action.key]),
    });
  default:
    return state;
  }
}
