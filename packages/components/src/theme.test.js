import { getTheme } from './theme';

describe('Theme tool', () => {
	const cssModule1 = {
		prop: 'prop_mod1',
		prop2: 'prop2_mod1',
		'test-multiple-classes': 'test-multiple-classes-mod1',
	};
	const cssModule2 = {
		prop: 'prop_mod2',
		'test-multiple-classes': 'test-multiple-classes-mod2',
	};
	const cssTheme = getTheme(cssModule1, cssModule2);

	it('should add the default theme classes', () => {
		// given
		const className = 'prop';
		// when
		const result = cssTheme(className);
		// then
		expect(result).toEqual('prop prop_mod1 prop_mod2');
	});

	it('should add the theme classes with conditions', () => {
		// given
		// when
		const result = cssTheme('toto', { prop: false, prop2: true });
		// then
		expect(result).toEqual('toto prop2 prop2_mod1');
	});

	it('should add with multiple classes', () => {
		// given
		const className = 'prop';
		const className2 = 'test-multiple-classes';
		// when
		const result = cssTheme(className, className2);
		// then
		expect(result).toEqual(
			'prop prop_mod1 prop_mod2 test-multiple-classes test-multiple-classes-mod1 test-multiple-classes-mod2',
		);
	});

	it('should add with arrays classes', () => {
		// given
		const className = 'prop';
		const className2 = 'test-multiple-classes';
		const className3 = 'test';
		// when
		const result = cssTheme(className, [className2, className3]);
		// then
		expect(result).toEqual(
			'prop prop_mod1 prop_mod2 test-multiple-classes test-multiple-classes-mod1 test-multiple-classes-mod2 test',
		);
	});
});
