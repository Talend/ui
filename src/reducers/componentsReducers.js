import { Map, fromJS } from 'immutable';
import ACTIONS from '../actions';

const defaultState = new Map();

export function componentsReducer(state = defaultState, action) {
  switch (action.type) {
  case ACTIONS.componentsActions.COMPONENT_ADD_STATE:
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
  case ACTIONS.componentsActions.COMPONENT_MERGE_STATE:
    return Object.assign({}, state, {
      components: state.components.mergeIn(
          [action.componentName, action.key],
          fromJS(action.componentState)
        ),
    });
  case ACTIONS.componentsActions.COMPONENT_REMOVE_STATE:
    return Object.assign({}, state, {
      components: state.components.deleteIn([action.componentName, action.key]),
    });
  default:
    return state;
  }
}
