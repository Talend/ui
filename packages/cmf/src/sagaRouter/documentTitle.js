import { take } from 'redux-saga/effects';

import matchPath from './matchPath';

function recursiveRoutes(childRoutes, mapRoutes, parentPath) {
	childRoutes.forEach((route) => {
		const path = parentPath ? `${parentPath}/${route.path}` : `/${route.path}`;
		if (route.tabTitle) {
			mapRoutes.set(path, route.tabTitle);
		}
		if (route.childRoutes) {
			recursiveRoutes(route.childRoutes, mapRoutes, path);
		}
	});
	return mapRoutes;
}

function buildMapFromRoutes(routes) {
	return recursiveRoutes(routes.childRoutes, new Map());
}

function getTitleFromRoutes(mapRoutes, location) {
	const defaultTitle = 'Hello world';
	let title = defaultTitle;
	mapRoutes.forEach((value, key) => {
		const ret = matchPath(location, { path: key });
		if (ret && ret.isExact) title = value;
	});
	// return mapRoutes.get(location);
	return title;
}

function assignDocTitle(title) {
	if (title) { document.title = title; }
}

export default function* changeDocumentTitle() {
	const { settings } = yield take('REACT_CMF.REQUEST_SETTINGS_OK');
	const mapRoutes = buildMapFromRoutes(settings.routes);
	while (1) {
		const router = yield take('@@router/LOCATION_CHANGE');
		const title = getTitleFromRoutes(mapRoutes, router.payload.pathname);
		assignDocTitle(title);
	}
}
