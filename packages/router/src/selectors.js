import cmf from '@talend/react-cmf';

/**
 * getLocation selector return the location from the redux state object.
 * @param {Object} state the redux state
 * @return {Object} location descriptor https://github.com/ReactTraining/react-router/blob/v3/docs/Glossary.md#locationdescriptor
 */
export function getLocation(state) {
	return state.routing.locationBeforeTransitions;
}

/**
 * getPath selector return the path from the redux state object.
 * @param {Object} state the redux state
 * @return {string} path
 */
export function getPath(state) {
	return getLocation(state).pathname;
}

/**
 * matchPath selector provide higher API to match the current path.
 * It give you in one call the composition of matchPath and getPath.
 * @param {Object} state the redux state
 * @param {Object} options matchPath options.
 */
export function matchPath(state, options) {
	return cmf.router.matchPath(getPath(state), options);
}
