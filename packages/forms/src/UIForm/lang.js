function defaultTranslate(message, options) {
	return options.defaultValue;
}

export default function getLanguage(t = defaultTranslate) {
	return {
		INVALID_TYPE: t('ERROR_INVALID_TYPE', {
			defaultValue: 'Invalid type: {type} (expected {expected})',
		}),
		ENUM_MISMATCH: t('ERROR_ENUM_MISMATCH', { defaultValue: 'No enum match for: {value}' }),
		ANY_OF_MISSING: t('ERROR_ANY_OF_MISSING', {
			defaultValue: 'Data does not match any schemas from "anyOf"',
		}),
		ONE_OF_MISSING: t('ERROR_ONE_OF_MISSING', {
			defaultValue: 'Data does not match any schemas from "oneOf"',
		}),
		ONE_OF_MULTIPLE: t('ERROR_ONE_OF_MULTIPLE', {
			defaultValue:
				'Data is valid against more than one schema from "oneOf": indices {index1} and {index2}',
		}),
		NOT_PASSED: t('ERROR_NOT_PASSED', { defaultValue: 'Data matches schema from "not"' }),
		// Numeric errors
		NUMBER_MULTIPLE_OF: t('ERROR_NUMBER_MULTIPLE_OF', {
			defaultValue: 'Value {value} is not a multiple of {multipleOf}',
		}),
		NUMBER_MINIMUM: t('ERROR_NUMBER_MINIMUM', {
			defaultValue: 'Value {value} is less than minimum {minimum}',
		}),
		NUMBER_MINIMUM_EXCLUSIVE: t('ERROR_NUMBER_MINIMUM_EXCLUSIVE', {
			defaultValue: 'Value {value} is equal to exclusive minimum {minimum}',
		}),
		NUMBER_MAXIMUM: t('ERROR_NUMBER_MAXIMUM', {
			defaultValue: 'Value {value} is greater than maximum {maximum}',
		}),
		NUMBER_MAXIMUM_EXCLUSIVE: t('ERROR_NUMBER_MAXIMUM_EXCLUSIVE', {
			defaultValue: 'Value {value} is equal to exclusive maximum {maximum}',
		}),
		NUMBER_NOT_A_NUMBER: t('ERROR_NUMBER_NOT_A_NUMBER', {
			defaultValue: 'Value {value} is not a valid number',
		}),
		// String errors
		STRING_LENGTH_SHORT: t('ERROR_STRING_LENGTH_SHORT', {
			defaultValue: 'String is too short ({length} chars), minimum {minimum}',
		}),
		STRING_LENGTH_LONG: t('ERROR_STRING_LENGTH_LONG', {
			defaultValue: 'String is too long ({length} chars), maximum {maximum}',
		}),
		STRING_PATTERN: t('ERROR_STRING_PATTERN', {
			defaultValue: 'String does not match pattern: {pattern}',
		}),
		// Object errors
		OBJECT_PROPERTIES_MINIMUM: t('ERROR_OBJECT_PROPERTIES_MINIMUM', {
			defaultValue: 'Too few properties defined ({propertyCount}), minimum {minimum}',
		}),
		OBJECT_PROPERTIES_MAXIMUM: t('ERROR_OBJECT_PROPERTIES_MAXIMUM', {
			defaultValue: 'Too many properties defined ({propertyCount}), maximum {maximum}',
		}),
		OBJECT_REQUIRED: t('ERROR_OBJECT_REQUIRED', { defaultValue: 'Missing required field' }),
		OBJECT_ADDITIONAL_PROPERTIES: t('ERROR_OBJECT_ADDITIONAL_PROPERTIES', {
			defaultValue: 'Additional properties not allowed',
		}),
		OBJECT_DEPENDENCY_KEY: t('ERROR_OBJECT_DEPENDENCY_KEY', {
			defaultValue: 'Dependency failed - key must exist: {missing} due to key: {key}',
		}),
		// Array errors
		ARRAY_LENGTH_SHORT: t('ERROR_ARRAY_LENGTH_SHORT', {
			defaultValue: 'Minimum number of items: {minimum}',
		}),
		ARRAY_LENGTH_LONG: t('ERROR_ARRAY_LENGTH_LONG', {
			defaultValue: 'Maximum number of items: {maximum}',
		}),
		ARRAY_UNIQUE: t('ERROR_ARRAY_UNIQUE', {
			defaultValue: 'Array items are not unique (indices {match1} and {match2})',
		}),
		ARRAY_ADDITIONAL_ITEMS: t('ERROR_ARRAY_ADDITIONAL_ITEMS', {
			defaultValue: 'Additional items not allowed',
		}),
		// Format errors
		FORMAT_CUSTOM: t('ERROR_FORMAT_CUSTOM', {
			defaultValue: 'Format validation failed ({message})',
		}),
		KEYWORD_CUSTOM: t('ERROR_KEYWORD_CUSTOM', {
			defaultValue: 'Keyword failed: {key} ({message})',
		}),
		// Schema structure
		CIRCULAR_REFERENCE: t('ERROR_CIRCULAR_REFERENCE', { defaultValue: 'Circular $refs: {urls}' }),
		// Non-standard validation options
		UNKNOWN_PROPERTY: t('ERROR_UNKNOWN_PROPERTY', {
			defaultValue: 'Unknown property (not in schema)',
		}),
	};
}
