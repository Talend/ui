import {
	mapStateToViewProps,
	attachRef,
} from '../src/settings';
import mock from '../src/mock';

describe('mapStateToViewProps', () => {
	it('should update props with _ref', () => {
		const state = mock.state();
		state.cmf.settings.views.homepage = {
			sidemenu: { _ref: 'SidePanel#default', baz: false },
		};
		const sidemenu = { foo: 'bar', baz: true };
		state.cmf.settings.ref = {
			'SidePanel#default': sidemenu,
		};
		const props = mapStateToViewProps(state, { view: 'homepage' });
		expect(props.sidemenu).not.toEqual(sidemenu);
		expect(props.sidemenu.foo).toEqual(sidemenu.foo);
		expect(props.sidemenu.baz).toBe(false);
	});

	it('should throw exception if _ref not found', () => {
		const state = mock.state();
		state.cmf.settings.views.homepage = {
			sidemenu: { _ref: 'myref' },
		};
		state.cmf.settings.ref = {};
		const shouldThrow = () => {
			mapStateToViewProps(state, { view: 'homepage' });
		};
		expect(shouldThrow).toThrow(new Error('CMF/Settings: Reference \'myref\' not found'));
	});
});

describe('attachRef', () => {
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
		const state = Object.assign(
			mock.state(),
			{ cmf: { settings: { ref: { stuff: 'res' } } } }
		);
		expect(attachRef(state, { _ref: 'stuff' })).toEqual(
			{ 0: 'r', 1: 'e', 2: 's' }
		);
	});
});
