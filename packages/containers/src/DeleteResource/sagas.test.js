// import SagaTester from 'redux-saga-tester';
import { Map } from 'immutable';
import cmf from '@talend/react-cmf';
import { take } from 'redux-saga/effects';
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
			const gen = internals.redirect({ data: { redirectUrl: '/foo' } });
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
			expect(effect.PUT.action.type).toBe(CONSTANTS.DIALOG_BOX_DELETE_RESOURCE_SUCCESS);
			expect(effect.PUT.action.model.labelResource).toBe('Foo');
			effect = gen.next().value;
			expect(effect.CALL.fn).toBe(internals.redirect);
			expect(effect.CALL.args[0]).toBe(action);
		});
	});
	describe('deleteResourceCancel', () => {
		it('should call redirect ', () => {
			const gen = internals.deleteResourceCancel();
			let effect = gen.next().value;
			expect(effect.TAKE.pattern).toBe(CONSTANTS.DIALOG_BOX_DELETE_RESOURCE_CANCEL);
			const action = {};
			effect = gen.next(action).value;
			expect(effect.CALL.fn).toBe(internals.redirect);
			expect(effect.CALL.args[0]).toBe(action);
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
