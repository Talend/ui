export default {
	name: 'Talend Stylelint Config',
	extends: ['stylelint-config-standard'],
	rules: {
		'at-rule-disallowed-list': ['debug', 'warn'],
		// deprecated but here to help align with current prettier
		'color-named': 'always-where-possible',
		'declaration-block-no-duplicate-properties': true,
		'declaration-property-value-disallowed-list': {
			transition: ['/all/'],
		},
		'declaration-no-important': true,
		'function-calc-no-unspaced-operator': true,
		'max-nesting-depth': 5,
		'selector-class-pattern': ['^(?!_).*$', { resolveNestedSelectors: true }],
		'selector-id-pattern': '^(?!_).*$',
		'selector-max-compound-selectors': null,
		'selector-max-id': null,
		'selector-no-qualifying-type': [true, { ignore: ['attribute'] }],
	},
};
