import { takeLatest, take } from 'redux-saga/effects';

import changeDocumentTitle, { handleDocumentTitle } from './documentTitle';

describe('documentTitle', () => {
	describe('#changeDocumentTitle', () => {
		it('should listen REACT_CMF.REQUEST_SETTINGS_OK', () => {
			const generator = changeDocumentTitle();

			expect(generator.next().value).toEqual(
				takeLatest('REACT_CMF.REQUEST_SETTINGS_OK', handleDocumentTitle),
			);
		});
	});

	describe('#handleDocumentTitle', () => {
		it('should handle the document title in order of the router path', () => {
			const generator = handleDocumentTitle({
				settings: {
					routes: {
						childRoutes: [
							{
								path: 'subA',
								documentTitle: 'Sub A',
								childRoutes: [
									{
										path: 'subsubA',
										documentTitle: 'Sub A sub A',
									},
								],
							},
							{
								path: 'subB',
								documentTitle: 'Sub B',
							},
						],
						path: '/',
						component: 'App',
						documentTitle: 'Root',
					},
				},
			});

			expect(generator.next().value).toEqual(take('@@router/LOCATION_CHANGE'));
			expect(document.title).toBe('Root');

			expect(
				generator.next({
					payload: {
						pathname: '/subA/subsubA',
					},
				}).value,
			).toEqual(take('@@router/LOCATION_CHANGE'));
			expect(document.title).toBe('Sub A sub A');

			expect(
				generator.next({
					payload: {
						pathname: '/subA/unknow',
					},
				}).value,
			).toEqual(take('@@router/LOCATION_CHANGE'));
			expect(document.title).toBe('Root');
		});
	});
});
