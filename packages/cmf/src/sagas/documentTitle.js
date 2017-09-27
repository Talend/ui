import { take } from 'redux-saga/effects';

import matchPath from './matchPath';

/**
 * Format the current full path
 * @param {string} path current path name (ex: foo)
 * @param {string} parentPath parent path name (ex: /foo)
 */
export function formatPath(path, parentPath) {
	let fPath = path;
	if (parentPath) fPath = parentPath.endsWith('/') ? `${parentPath}${path}` : `${parentPath}/${path}`;
	// Convert optional url parameters to React Router V2 --> V4 (:param) --> :param?
	return fPath.replace(/[(]/g, '').replace(/[)]/g, '?');
}

/**
 * Build a map from the settings routes object recursively
 * @param {object} routes
 * @param {array} mapRoutes
 * @param {string} parentPath
 */
export function buildMapFromRoutes(routes, mapRoutes, parentPath) {
	const path = formatPath(routes.path, parentPath);
	if (routes.documentTitle) {
		mapRoutes.set(path, routes.documentTitle);
	}
	const childRoutes = routes.childRoutes;
	if (childRoutes && childRoutes instanceof Array) {
		childRoutes.forEach((route) => {
			buildMapFromRoutes(route, mapRoutes, path);
		});
	}
	return mapRoutes;
}

/**
 * Iterate over the routes map to find a match with the given location.
 * The value map return the correct document title.
 * If none is found we return the default document title.
 * @param {array} mapRoutes
 * @param {string} location
 * @param {string} defaultDocTitle
 */
export function getTitleFromRoutes(mapRoutes, location, defaultDocTitle) {
	let title = defaultDocTitle;
	mapRoutes.forEach((value, key) => {
		const ret = matchPath(location, { path: key });
		if (ret && ret.isExact) title = value;
	});
	return title;
}

/**
 * If not null|undefined we assign a new title to the document.
 * @param {string} title
 */
export function assignDocTitle(title) {
	if (title) {
		document.title = title;
	}
}

/**
 * A saga which listen to the REQUEST_SETTINGS_OK.
 * We use the routes of the settings to build a map [route: documentTitle].
 * We use the root path '/' to get the default document title and we assign it.
 * When the location changes @@router/LOCATION_CHANGE we update the document title.
 */
export default function* changeDocumentTitle() {
	const { settings } = yield take('REACT_CMF.REQUEST_SETTINGS_OK');
	const mapRoutes = buildMapFromRoutes(settings.routes, new Map());
	const defaultDocTitle = mapRoutes.get('/');
	assignDocTitle(defaultDocTitle);
	while (1) { // eslint-disable-line no-constant-condition
		const router = yield take('@@router/LOCATION_CHANGE');
		const docTitle = getTitleFromRoutes(mapRoutes, router.payload.pathname, defaultDocTitle);
		assignDocTitle(docTitle);
	}
}
