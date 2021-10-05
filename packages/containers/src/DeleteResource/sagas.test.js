// import SagaTester from 'redux-saga-tester';
import { Map } from 'immutable';
import cmf from '@talend/react-cmf';
import { take, put } from 'redux-saga/effects';
import CONSTANTS from './constants';
// import actions from './actions';
import sagas, * as internals from './sagas';

describe('internals', () => {
	describe('getResourceLocator', () => {
		it('should return resourceType if no no resourcePath', () => {
			expect(internals.getResourceLocator('type')).toBe('type');
		});
		it('should return Array with resourceType and resourcePath', () => {
			expect(internals.getResourceLocator('type', ['foo', 'bar'])).toEqual(['type', 'foo', 'bar']);
		});
		it('should throw Error if resourcePath is not an array', () => {
			const toThrow = () => internals.getResourceLocator('type', 'foo');
			expect(toThrow).toThrow();
		});
	});
	describe('redirect', () => {
		it('should put a redirect action', () => {
			const gen = internals.redirect('/foo');
			const effect = gen.next().value;
			expect(effect.PUT.action.cmf.routerReplace).toBe('/foo');
		});
		it('should throw if no redirectUrl provided', () => {
			const gen = internals.redirect();
			expect(gen.next).toThrow();
		});
	});
	describe('deleteResourceValidate', () => {
		it('should not call http delete if some args are missing ', () => {
			const gen = internals.deleteResourceValidate();
			let effect = gen.next().value;
			expect(effect).toEqual(take(CONSTANTS.DIALOG_BOX_DELETE_RESOURCE_OK));
			effect = gen.next().value;
			expect(effect.SELECT.args[0]).not.toBeDefined(); // resourceLocator
			expect(effect.SELECT.args[1]).not.toBeDefined(); // safeId
			effect = gen.next().value;
			expect(effect).not.toBeDefined(); // no http delete called
		});
		it('should take all params from the action ', () => {
			const action = {
				type: CONSTANTS.DIALOG_BOX_DELETE_RESOURCE_OK,
				data: {
					model: {
						uri: '/api',
						resourceType: 'datasets',
						id: '123',
						redirectUrl: '/resources',
					},
				},
			};
			const resource = new Map({ id: '123', label: 'Foo' });

			const gen = internals.deleteResourceValidate();
			let effect = gen.next().value;
			expect(effect).toEqual(take(CONSTANTS.DIALOG_BOX_DELETE_RESOURCE_OK));
			effect = gen.next(action).value;
			expect(effect.SELECT.args[0]).toBe('datasets'); // resourceLocator
			expect(effect.SELECT.args[1]).toBe('123'); // safeId
			effect = gen.next(resource).value;
			expect(effect.CALL).toBeDefined();
			const httpAction = effect.CALL;
			expect(httpAction.fn).toBe(cmf.sagas.http.delete);
			expect(httpAction.args[0]).toBe('/api/datasets/123');
			effect = gen.next({ response: { ok: true } }).value;
			expect(effect).toEqual(
				put({
					type: CONSTANTS.DIALOG_BOX_DELETE_RESOURCE_SUCCESS,
					model: {
						id: '123',
						labelResource: 'Foo',
						redirectUrl: '/resources',
						resourceType: 'datasets',
						uri: '/api',
					},
				}),
			);

			effect = gen.next().value;
			expect(effect.CALL.fn).toBe(internals.redirect);
			expect(effect.CALL.args[0]).toBe('/resources');
		});
		it('should use resourceUri as backend api to delete resource if provided', () => {
			const action = {
				type: CONSTANTS.DIALOG_BOX_DELETE_RESOURCE_OK,
				data: {
					model: {
						uri: '/services',
						resourceUri: '/run-profiles/advanced/profileId',
						resourceType: 'myResource',
					},
				},
			};

			const resource = new Map({ id: 'profileId', type: 'advanced', name: 'deleteThisRunProfile' });

			const gen = internals.deleteResourceValidate();
			gen.next();
			gen.next(action);
			const effect = gen.next(resource).value;
			expect(effect.CALL).toBeDefined();
			const httpAction = effect.CALL;
			expect(httpAction.fn).toBe(cmf.sagas.http.delete);
			expect(httpAction.args[0]).toBe('/run-profiles/advanced/profileId');
		});
		it(
			'should use "uri/resourceType/id" as backend api to delete resource' +
				' if no resourceUri provided',
			() => {
				const action = {
					type: CONSTANTS.DIALOG_BOX_DELETE_RESOURCE_OK,
					data: {
						model: {
							uri: '/services',
							resourceType: 'run-profiles',
							id: 'runProfileId',
						},
					},
				};
				const resource = new Map({
					id: 'profileId',
					type: 'advanced',
					name: 'deleteThisRunProfile',
				});

				const gen = internals.deleteResourceValidate();
				gen.next();
				gen.next(action);
				const effect = gen.next(resource).value;
				expect(effect.CALL).toBeDefined();
				const httpAction = effect.CALL;
				expect(httpAction.fn).toBe(cmf.sagas.http.delete);
				expect(httpAction.args[0]).toBe('/services/run-profiles/runProfileId');
			},
		);
		it('should use collectionId to remove resource in state if provided', () => {
			const action = {
				type: CONSTANTS.DIALOG_BOX_DELETE_RESOURCE_OK,
				data: {
					model: {
						resourceType: 'myResource',
						collectionId: 'myCollection',
						id: 'runProfileId',
					},
				},
			};
			const gen = internals.deleteResourceValidate();
			gen.next();
			const effect = gen.next(action).value;
			expect(effect.SELECT.args[0]).toBe('myCollection');
			expect(effect.SELECT.args[1]).toBe('runProfileId');
		});
		it('should use resourceType as collection to remove resource in state, if no collectionId provided', () => {
			const action = {
				type: CONSTANTS.DIALOG_BOX_DELETE_RESOURCE_OK,
				data: {
					model: {
						resourceType: 'myResource',
						id: 'runProfileId',
					},
				},
			};
			const gen = internals.deleteResourceValidate();
			gen.next();
			const effect = gen.next(action).value;
			expect(effect.SELECT.args[0]).toBe('myResource');
			expect(effect.SELECT.args[1]).toBe('runProfileId');
		});
		it('should dispatch DIALOG_BOX_DELETE_RESOURCE_ERROR event when delete request fails', () => {
			const action = {
				type: CONSTANTS.DIALOG_BOX_DELETE_RESOURCE_OK,
				data: {
					model: {
						resourceType: 'myResource',
						id: 'resourceId',
					},
				},
			};
			const resource = {
				id: 'resourceId',
			};
			const failedRequest = {
				response: {
					ok: false,
				},
				data: {
					error: "can't delete resource in use",
				},
			};

			const gen = internals.deleteResourceValidate();
			gen.next();
			gen.next(action);
			gen.next(resource);
			expect(gen.next(failedRequest).value).toEqual(
				put({
					type: CONSTANTS.DIALOG_BOX_DELETE_RESOURCE_ERROR,
					error: failedRequest.data,
				}),
			);
		});
	});
	describe('deleteResourceCancel', () => {
		it('should call redirect ', () => {
			const gen = internals.deleteResourceCancel();
			let effect = gen.next().value;
			expect(effect.TAKE.pattern).toBe(CONSTANTS.DIALOG_BOX_DELETE_RESOURCE_CANCEL);
			const action = { data: { model: { onCancelRedirectUrl: '/cancel' } } };
			effect = gen.next(action).value;
			expect(effect.CALL.fn).toBe(internals.redirect);
			expect(effect.CALL.args[0]).toBe('/cancel');
		});
	});
});

describe('sagas', () => {
	it('should expose deprecated saga for the sagaRouter', () => {
		expect(typeof sagas).toBe('function');
		expect(sagas.name).toBe('getDeleteResourceSagaRouter');
	});
	describe('DeleteResource#handle', () => {
		it('should race between cancel and validate', () => {
			// eslint-disable-next-line new-cap
			const gen = sagas['DeleteResource#handle']();
			const effect = gen.next().value;
			expect(effect.RACE).toMatchObject({
				deleteConfirmationCancel: { CALL: { fn: internals.deleteResourceCancel } },
				deleteConfirmationValidate: { CALL: { fn: internals.deleteResourceValidate } },
			});
		});
		it('should throw a specific error if sth goes bad', () => {
			// eslint-disable-next-line new-cap
			const gen = sagas['DeleteResource#handle']();
			gen.next();
			const toThrow = () => gen.throw(new Error('no more internet')).value;
			expect(toThrow).toThrow('DeleteResource failed: Error: no more interne');
		});
	});
});
