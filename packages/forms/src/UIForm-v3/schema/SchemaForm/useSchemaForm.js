import { useEffect, useState } from 'react';
import { merge } from '@talend/json-schema-form-core';

export default function useSchemaForm({ jsonSchema, uiSchema }) {
	const [mergedSchema, setMergedSchema] = useState();
	useEffect(() => {
		if (jsonSchema && uiSchema) {
			setMergedSchema(merge(jsonSchema, uiSchema));
		}
	}, [jsonSchema, uiSchema]);

	return { mergedSchema };
}
