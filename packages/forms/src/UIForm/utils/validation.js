/**
 * Check if a schema value is valid.
 * It is invalid if :
 * - the schema is an invalid field (errors[key] is falsy)
 * - the schema has items (ex: fieldset, tabs, ...), and at least one of them is invalid
 * @param schema The schema
 * @param errors The errors
 * @returns {boolean} true if it is invalid, false otherwise
 */
export default function isValid(schema, errors) {
	const { key, items } = schema;
	if (key && errors[key]) {
		return false;
	}

	if (items) {
		for (const itemSchema of items) {
			if (!isValid(itemSchema, errors)) {
				return false;
			}
		}
	}

	return true;
}
