import get from 'lodash/get';

export default function patternRule(schema, t) {
	const pattern = get(schema, 'schema.pattern');
	if (pattern) {
		return {
			value: new RegExp(pattern),
			message: t('ERROR_STRING_PATTERN', {
				defaultValue: 'String does not match pattern: {{pattern}}',
				pattern,
			}),
		};
	}
	return null;
}
