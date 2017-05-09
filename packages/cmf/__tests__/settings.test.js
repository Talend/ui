import {
	mapStateToViewProps,
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
		console.log(props);
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
