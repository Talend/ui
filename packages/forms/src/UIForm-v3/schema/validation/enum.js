export default function enumRules(schema, t) {
	const { restricted, schema: innerSchema = {} } = schema;
	const { enum: enumValues } = innerSchema;

	if (!restricted || !enumValues) {
		return () => {};
	}

	return value => {
		if (!value || enumValues.includes(value)) {
			return null;
		}
		return t('ERROR_ENUM_MISMATCH', { defaultValue: 'No enum match for: {{value}}', value });
	};
}
