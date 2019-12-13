export default function patternRule(schema, t) {
	if (!schema.schema.pattern) {
		return null;
	}
	return function validatePattern(value) {
		if (!schema.schema.pattern.match(value)) {
			return null;
		}
		return t('ERROR_STRING_PATTERN', {
			defaultValue: 'String does not match pattern: {pattern}',
		});
	};
}
