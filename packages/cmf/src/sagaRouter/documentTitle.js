import { take } from 'redux-saga/effects';

import matchPath from './matchPath';

export function formatPath(path, parentPath) {
	let fPath = '';
	if (parentPath && parentPath === '/') {
		fPath = `${parentPath}${path}`;
	} else if (parentPath) {
		fPath = `${parentPath}/${path}`;
	} else {
		fPath = path;
	}
	return fPath.replace(/[(]/g, '').replace(/[)]/g, '?');
}

export function buildMapFromRoutes(routes, mapRoutes, parentPath) {
	const path = formatPath(routes.path, parentPath);
	if (routes.documentTitle) {
		mapRoutes.set(path, routes.documentTitle);
	}
	const childRoutes = routes.childRoutes;
	if (childRoutes) {
		childRoutes.forEach((route) => {
			buildMapFromRoutes(route, mapRoutes, path);
		});
	}
	return mapRoutes;
}

export function getTitleFromRoutes(mapRoutes, location, defaultDocTitle) {
	let title = defaultDocTitle;
	mapRoutes.forEach((value, key) => {
		const ret = matchPath(location, { path: key });
		if (ret && ret.isExact) title = value;
	});
	return title;
}

export function assignDocTitle(title) {
	if (title) {
		document.title = title;
	}
}

export default function* changeDocumentTitle() {
	const { settings } = yield take('REACT_CMF.REQUEST_SETTINGS_OK');
	const mapRoutes = buildMapFromRoutes(settings.routes, new Map());
	const defaultDocTitle = mapRoutes.get('/');
	assignDocTitle(defaultDocTitle);
	while (1) {
		const router = yield take('@@router/LOCATION_CHANGE');
		const docTitle = getTitleFromRoutes(mapRoutes, router.payload.pathname, defaultDocTitle);
		assignDocTitle(docTitle);
	}
}
