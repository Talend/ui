import { take } from 'redux-saga/effects';

import matchPath from './matchPath';


function formatPath(path, parentPath) {
	const fPath = parentPath ? `${parentPath}/${path}` : `/${path}`;
	return fPath.replace(/[(]/g, '').replace(/[)]/g, '?');
}

function buildMapFromRoutes(childRoutes, mapRoutes, parentPath) {
	childRoutes.forEach((route) => {
		formatPath(route.path);
		const path = formatPath(route.path, parentPath);
		if (route.documentTitle) {
			mapRoutes.set(path, route.documentTitle);
		}
		if (route.childRoutes) {
			buildMapFromRoutes(route.childRoutes, mapRoutes, path);
		}
	});
	return mapRoutes;
}

// function buildMapFromRoutes(routes) {
// 	return recursiveRoutes(routes.childRoutes, );
// }

function getTitleFromRoutes(mapRoutes, location) {
	const defaultTitle = 'Data Catalog | Talend';
	let title = defaultTitle;
	mapRoutes.forEach((value, key) => {
		const ret = matchPath(location, { path: key });
		if (ret && ret.isExact) title = value;
	});
	return title;
}

function assignDocTitle(title) {
	if (title) { document.title = title; }
}

export default function* changeDocumentTitle() {
	const { settings } = yield take('REACT_CMF.REQUEST_SETTINGS_OK');
	console.log('settings', settings);
	const mapRoutes = buildMapFromRoutes(settings.routes, new Map());
	console.log('mapRoutes', mapRoutes);
	while (1) {
		const router = yield take('@@router/LOCATION_CHANGE');
		const title = getTitleFromRoutes(mapRoutes, router.payload.pathname);
		assignDocTitle(title);
	}
}
