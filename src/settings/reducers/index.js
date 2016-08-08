import * as ACTIONS from '../actions';

const defaultState = {
  initialized: false,
  contentTypes: {},
  actions: {},
  views: {},
  routes: {},
};

export default function settingsReducer(state = defaultState, action) {
  switch (action.type) {
  case ACTIONS.REQUEST_OK: {
    return Object.assign({}, state, {
      initialized: true,
    }, action.settings);
  }
  default: {
    return state;
  }
  }
}
