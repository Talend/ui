import invariant from 'invariant';

export const COMPONENT_ADD_STATE = 'REACT_CMF.COMPONENT_ADD_STATE';
export const COMPONENT_MERGE_STATE = 'REACT_CMF.COMPONENT_MERGE_STATE';
export const COMPONENT_REMOVE_STATE = 'REACT_CMF.COMPONENT_REMOVE_STATE';

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
