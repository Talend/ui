module.exports = {
	extends: 'stylelint-config-sass-guidelines',
	rules: {
		'at-rule-disallowed-list': ['debug', 'warn'],
		// deprecated but here to help align with current prettier
		'color-hex-case': 'lower',
		'color-named': 'always-where-possible',
		'declaration-block-no-duplicate-properties': true,
		'declaration-property-value-disallowed-list': {
			transition: ['/all/'],
		},
		'declaration-no-important': true,
		indentation: 'tab',
		'function-calc-no-unspaced-operator': true,
		'max-nesting-depth': 5,
		'scss/at-import-partial-extension-blacklist': ['scss', 'css'],
		'scss/operator-no-unspaced': true,
		'selector-class-pattern': ['^(?!_).*$', { resolveNestedSelectors: true }],
		'selector-id-pattern': '^(?!_).*$',
		'selector-max-compound-selectors': null,
		'selector-max-id': null,
		'selector-no-qualifying-type': [true, { ignore: ['attribute'] }],
		'value-list-comma-space-after': 'always',
	},
};
