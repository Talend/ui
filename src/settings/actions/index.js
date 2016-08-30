import invariant from 'invariant';

export const REQUEST_SETTINGS = 'REACT_CMF.REQUEST_SETTINGS';
export const REQUEST_KO = 'REACT_CMF.REQUEST_SETTINGS_KO';
export const REQUEST_OK = 'REACT_CMF.REQUEST_SETTINGS_OK';

export const COMPONENT_ADD_STATE = 'REACT_CMF.COMPONENT_ADD_STATE';
export const COMPONENT_MERGE_STATE = 'REACT_CMF.COMPONENT_MERGE_STATE';
export const COMPONENT_REMOVE_STATE = 'REACT_CMF.COMPONENT_REMOVE_STATE';

export const COLLECTION_ADD_OR_REPLACE = 'REACT_CMF.COLLECTION_ADD_OR_REPLACE';
export const COLLECTION_REMOVE = 'REACT_CMF.COLLECTION_REMOVE';

export function requestSettings() {
  return {
    type: REQUEST_SETTINGS,
  };
}

export function receiveSettings(json) {
  return {
    type: REQUEST_OK,
    settings: json,
    receivedAt: Date.now(),
  };
}
export function errorWithSettings(error) {
  return {
    type: REQUEST_KO,
    error,
  };
}

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export function fetchSettings() {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return (dispatch) => {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestSettings());

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch('settings.json')
    .then((response) => response.json())
    .then((json) => {
      // We can dispatch many times!
      // Here, we update the app state with the results of the API call.

      dispatch(receiveSettings(json));
    }, (error) => {
      dispatch(errorWithSettings(error));
    });

    // In a real world app, you also want to
    // catch any error in the network call.
  };
}

/**
 * Add or replace collection data in store
 * @param {string} collection identifier
 * @param {any} any element that represent business data
 */
export const addOrReplaceCollection = (collectionId, data) => ({
  type: COLLECTION_ADD_OR_REPLACE,
  collectionId,
  data,
});

/**
 * Remove collection data in store to free space
 * @param {string} collection identifier
 *
 * @throws if you try to remove non existent collection
 */
export const removeCollection = collectionId => (
  (dispatch, getState) => {
    const state = getState();
    let error = false;
    if (!state.settings.collections.get('collectionId')) {
      error = true;
      invariant(false, `Can't remove collection ${collectionId} since it doesn't already exist.`);
    }
    if (!error) {
      dispatch({
        type: COLLECTION_REMOVE,
        collectionId,
      });
    }
  }
);

/**
 * add a new component state with optionnal initialComponentState to the store
 *
 * @param {string} componentName : name of the component
 * @param {string} key : identifier of state used by this component
 * @param {object} initialComponentState  : intial state of the component if required
 *
 * @throw if a component with this componentName associated to this key already exist
 */
export const addComponentState = (componentName, key, initialComponentState) => (
  (dispatch, getState) => {
    const state = getState();
    const error = false;
    if (state.settings.components.getIn([componentName, key])) {
      invariant(false, `Can't set up your component ${componentName} on key ${key} since this association already exist`);
    }
    if (!error) {
      dispatch({
        type: COMPONENT_ADD_STATE,
        componentName,
        key,
        initialComponentState,
      });
    }
  }
);

/**
 * Merge new component state into actual component state in the store
 *
 * @param {string} componentName : name of the component
 * @param {string} key : identifier of state used by this component
 * @param {object} componentState  : intial state of the component if required
 *
 * @throw if no componentName associated with this collectionId exist
 */
export const mergeComponentState = (componentName, key, componentState) => (
  (dispatch, getState) => {
    const state = getState();
    let error = false;
    if (!state.settings.components.getIn([componentName, key])) {
      error = true;
      invariant(false, `The component state can't be merged since the ${componentName}, ${key} association doesn't exist.`);
    }
    if (!error) {
      dispatch({
        type: COMPONENT_MERGE_STATE,
        componentName,
        key,
        componentState,
      });
    }
  }
);

/**
 * Remove component state from the store
 *
 * @param {string} componentName : name of the component
 * @param {string} collectionId  : identifier of collection used by the component
 *
 * @throw if no componentName associated with this collectionId exist
 */
export const removeComponentState = (componentName, key) => (
  (dispatch, getState) => {
    const state = getState();
    let error = false;
    if (!state.settings.components.getIn([componentName, key])) {
      error = true;
      invariant(false, `The component can't be removed since the ${componentName}, ${key} association doesn't exist.`);
    }
    if (!error) {
      dispatch({
        type: COMPONENT_REMOVE_STATE,
        componentName,
        key,
      });
    }
  }
);
