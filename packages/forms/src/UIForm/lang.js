function defaultTranslate(message) {
	return message;
}

export default function getLanguage(t = defaultTranslate) {
	return {
		INVALID_TYPE: t('Invalid type: {type} (expected {expected})'),
		ENUM_MISMATCH: t('No enum match for: t({value}'),
		ANY_OF_MISSING: t('Data does not match any schemas from "anyOf"'),
		ONE_OF_MISSING: t('Data does not match any schemas from "oneOf"'),
		ONE_OF_MULTIPLE: t(
			'Data is valid against more than one schema from "oneOf": indices {index1} and {index2}',
		),
		NOT_PASSED: t('Data matches schema from "not"'),
		// Numeric errors
		NUMBER_MULTIPLE_OF: t('Value {value} is not a multiple of {multipleOf}'),
		NUMBER_MINIMUM: t('Value {value} is less than minimum {minimum}'),
		NUMBER_MINIMUM_EXCLUSIVE: t('Value {value} is equal to exclusive minimum {minimum}'),
		NUMBER_MAXIMUM: t('Value {value} is greater than maximum {maximum}'),
		NUMBER_MAXIMUM_EXCLUSIVE: t('Value {value} is equal to exclusive maximum {maximum}'),
		NUMBER_NOT_A_NUMBER: t('Value {value} is not a valid number'),
		// String errors
		STRING_LENGTH_SHORT: t('String is too short ({length} chars), minimum {minimum}'),
		STRING_LENGTH_LONG: t('String is too long ({length} chars), maximum {maximum}'),
		STRING_PATTERN: t('String does not match pattern: {pattern}'),
		// Object errors
		OBJECT_PROPERTIES_MINIMUM: t('Too few properties defined ({propertyCount}), minimum {minimum}'),
		OBJECT_PROPERTIES_MAXIMUM: t(
			'Too many properties defined ({propertyCount}), maximum {maximum}',
		),
		OBJECT_REQUIRED: t('Missing required field'),
		OBJECT_ADDITIONAL_PROPERTIES: t('Additional properties not allowed'),
		OBJECT_DEPENDENCY_KEY: t('Dependency failed - key must exist: {missing} due to key: {key}'),
		// Array errors
		ARRAY_LENGTH_SHORT: t('Array is too short ({length}), minimum {minimum}'),
		ARRAY_LENGTH_LONG: t('Array is too long ({length}), maximum {maximum}'),
		ARRAY_UNIQUE: t('Array items are not unique (indices {match1} and {match2})'),
		ARRAY_ADDITIONAL_ITEMS: t('Additional items not allowed'),
		// Format errors
		FORMAT_CUSTOM: t('Format validation failed ({message})'),
		KEYWORD_CUSTOM: t('Keyword failed: {key} ({message})'),
		// Schema structure
		CIRCULAR_REFERENCE: t('Circular $refs: {urls}'),
		// Non-standard validation options
		UNKNOWN_PROPERTY: t('Unknown property (not in schema)'),
	};
}
