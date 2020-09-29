import SagaTester from 'redux-saga-tester';
import { takeLatest } from 'redux-saga/effects';

import changeDocumentTitle, {
	formatPath,
	buildMapFromRoutes,
	getTitleFromRoutes,
	assignDocTitle,
	handleDocumentTitle,
} from './documentTitle';

describe('changeDocumentTitle', () => {
	it('should change document title on REACT_CMF.REQUEST_SETTINGS_OK', () => {
		// given
		const sagaTester = new SagaTester({ initialState: {} });
		sagaTester.start(() => changeDocumentTitle());
		const child2 = { documentTitle: 'child2', path: 'child2' };
		const child1 = { documentTitle: 'child1', path: 'child1', childRoutes: [child2] };
		const routes = { documentTitle: 'docTitleRoot', path: '/', childRoutes: [child1] };
		expect(global.document.title).toBe('');
		// when
		sagaTester.dispatch({
			type: 'REACT_CMF.REQUEST_SETTINGS_OK',
			settings: { routes },
		});
		// then
		expect(global.document.title).toBe('docTitleRoot');
	});
	it('should change document title on @@router/LOCATION_CHANGE event', () => {
		// given
		const sagaTester = new SagaTester({ initialState: {} });
		sagaTester.start(() => changeDocumentTitle());
		const child2 = { documentTitle: 'child2', path: 'child2' };
		const child1 = { documentTitle: 'child1', path: 'child1', childRoutes: [child2] };
		const routes = { documentTitle: 'docTitleRoot', path: '/', childRoutes: [child1] };
		// when
		sagaTester.dispatch({
			type: 'REACT_CMF.REQUEST_SETTINGS_OK',
			settings: { routes },
		});
		// when
		sagaTester.dispatch({
			type: '@@router/LOCATION_CHANGE',
			payload: { pathname: '/child1/child2' },
		});

		// then
		expect(global.document.title).toBe('child2');

		// when
		sagaTester.dispatch({
			type: '@@router/LOCATION_CHANGE',
			payload: { pathname: '/child1' },
		});

		expect(global.document.title).toBe('child1');
	});
});

describe('formatPath', () => {
	it('format two string to a correct url path', () => {
		const path = 'world';
		const parentPath = '/hello';
		const fPath = formatPath(path, parentPath);
		expect(fPath).toEqual(`${parentPath}/${path}`);
	});
	it('format two string to a correct url path', () => {
		const path = 'hello';
		const parentPath = '/';
		const fPath = formatPath(path, parentPath);
		expect(fPath).toEqual(`/${path}`);
	});
	it('format a string (optional url param) to a correct url path', () => {
		const path = '(:hello)';
		const parentPath = '/';
		const fPath = formatPath(path, parentPath);
		expect(fPath).toEqual('/:hello?');
	});
});

describe('getTitleFromRoutes', () => {
	it('should return route matching title', () => {
		// Given
		const location = '/hello/world';
		const myTitle = 'myTitle';
		const myDefaultTitle = 'myDefaultTitle';
		const routes = new Map([
			[location, myTitle],
			['/dumb', 'dumber'],
		]);
		// When
		const title = getTitleFromRoutes(routes, location, myDefaultTitle);
		// Then
		expect(title).toBe(myTitle);
	});
	it('should return default title', () => {
		// Given
		const myDefaultTitle = 'myDefaultTitle';
		const routes = new Map([
			['/error', 'myTitle'],
			['/dumb', 'dumber'],
		]);
		// When
		const title = getTitleFromRoutes(routes, 'unknown', myDefaultTitle);
		// Then
		expect(title).toBe(myDefaultTitle);
	});
});

describe('assignDocTitle', () => {
	it('should change the document title', () => {
		// Given
		const myTitle = 'myTitle';
		// When
		assignDocTitle(myTitle);
		// Then
		expect(global.document.title).toBe(myTitle);
	});
	it('should stick with the current document title', () => {
		// Given
		const originalDocTitle = 'original';
		global.document.title = originalDocTitle;
		// When
		assignDocTitle(undefined);
		// Then
		expect(global.document.title).toBe(originalDocTitle);
	});
});

describe('buildMapFromRoutes', () => {
	it('should return a map (path: docTitle) from an object', () => {
		// Given
		const child2 = { documentTitle: 'child2', path: 'child2' };
		const child1 = { documentTitle: 'child1', path: 'child1', childRoutes: [child2] };
		const data = { documentTitle: 'docTitleRoot', path: '/', childRoutes: [child1] };
		// When
		const testMap = buildMapFromRoutes(data, new Map());
		// Then
		const myMap = new Map([
			['/', 'docTitleRoot'],
			['/child1', 'child1'],
			['/child1/child2', 'child2'],
		]);
		expect(testMap).toEqual(myMap);
	});
});

describe('#changeDocumentTitle', () => {
	it('should listen REACT_CMF.REQUEST_SETTINGS_OK', () => {
		const generator = changeDocumentTitle();

		expect(generator.next().value).toEqual(
			takeLatest('REACT_CMF.REQUEST_SETTINGS_OK', handleDocumentTitle),
		);
	});
});
