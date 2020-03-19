import { merge } from '@talend/json-schema-form-core';

export default (jsonSchema, uiSchema) => {
	const props = { jsonSchema, uiSchema };
	if (!jsonSchema) {
		return props;
	}
	props.mergedSchema = merge(props.jsonSchema, props.uiSchema);
	return props;
};
