export default function requiredRule(schema, t) {
	return schema.required
		? t('ERROR_OBJECT_REQUIRED', { defaultValue: 'Missing required field' })
		: false;
}
