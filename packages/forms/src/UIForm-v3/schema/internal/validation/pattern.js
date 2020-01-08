import get from 'lodash/get';

export default function patternRule({ language = {}, schema, t }) {
	const pattern = get(schema, 'schema.pattern');
	if (pattern) {
		return {
			value: new RegExp(pattern),
			message:
				language.STRING_PATTERN ||
				t('ERROR_STRING_PATTERN', {
					defaultValue: 'String does not match pattern: {{pattern}}',
					pattern,
				}),
		};
	}
	return null;
}
