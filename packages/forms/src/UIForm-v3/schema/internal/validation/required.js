export default function requiredRule({ language = {}, schema, t }) {
	return schema.required
		? language.OBJECT_REQUIRED ||
				t('ERROR_OBJECT_REQUIRED', { defaultValue: 'Missing required field' })
		: false;
}
