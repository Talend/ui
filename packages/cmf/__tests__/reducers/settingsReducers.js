import CONSTANT from '../../src/constant';
import reducer, {
	defaultState,
	attachRef,
	attachRefs,
} from '../../src/reducers/settingsReducers';

/* eslint-disable no-console */

describe('settingsReducers.attachRef', () => {
	it('should attachRef with _ref', () => {
		const sidemenu = { foo: 'bar', baz: true };
		const props = {
			sidemenu: { _ref: 'SidePanel#default', baz: false },
		};
		const ref = {
			'SidePanel#default': sidemenu,
		};
		const attached = attachRefs(ref, props);
		expect(attached.sidemenu).not.toEqual(sidemenu);
		expect(attached.sidemenu.foo).toEqual(sidemenu.foo);
		expect(attached.sidemenu.baz).toBe(false);
	});
	it('should throw exception if _ref not found', () => {
		const props = {
			sidemenu: { _ref: 'myref' },
		};
		const ref = {};
		const shouldThrow = () => {
			attachRefs(ref, props);
		};
		expect(shouldThrow).toThrow(new Error('CMF/Settings: Reference \'myref\' not found'));
	});
	it('should not do anything if obj parameter is not an object', () => {
		const testFunction = () => '';
		expect(attachRef({}, 'string')).toEqual('string');
		expect(attachRef({}, 1)).toEqual(1);
		expect(attachRef({}, true)).toEqual(true);
		expect(attachRef({}, testFunction)).toEqual(testFunction);
		expect(attachRef({}, undefined)).toEqual(undefined);
		expect(attachRef({}, null)).toEqual(null);
		expect(attachRef({}, [])).toEqual([]);
	});

	it('should try to resolve _ref if obj is an object', () => {
		const ref = { stuff: 'res' };
		expect(attachRef(ref, { _ref: 'stuff' })).toEqual(
			{ 0: 'r', 1: 'e', 2: 's' }
		);
	});
});

describe('CMF settinsReducers', () => {
	it('should expose defaultState', () => {
		expect(defaultState).not.toBe(undefined);
		expect(typeof defaultState).toBe('object');
	});

	it('should expose one reducer as default', () => {
		expect(reducer).not.toBe(undefined);
		expect(typeof reducer).toBe('function');
	});

	it('should understand REQUEST_OK', () => {
		const action = {
			type: CONSTANT.REQUEST_OK,
			settings: {},
		};
		const state = reducer(undefined, action);
		expect(state).not.toBe(undefined);
		expect(state.initialized).toBe(true);
	});
	it('should understand REQUEST_KO on 404', () => {
		const oldError = console.error;
		console.error = jest.fn();
		const action = {
			type: CONSTANT.REQUEST_KO,
			error: {
				message: 'Not Found',
				stack: {
					headers: undefined,
					ok: false,
					redirected: false,
					response: '<html></html>',
					status: 404,
					statusText: 'Not Found',
					type: 'basic',
					url: 'http://localhost/',
				},
			},
			settings: {},
		};
		const state = reducer(undefined, action);
		expect(state).not.toBe(undefined);
		expect(state.initialized).toBe(false);
		expect(console.error).toHaveBeenCalledWith('Settings can\'t be loaded Not Found', action.error);
		console.error = oldError.bind(console);
	});
});
