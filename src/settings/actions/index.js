export const REQUEST_SETTINGS = 'UI_ABSTRACTION_REQUEST_SETTINGS';
export const REQUEST_KO = 'UI_ABSTRACTION_REQUEST_SETTINGS_KO';
export const REQUEST_OK = 'UI_ABSTRACTION_REQUEST_SETTINGS_OK';

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
