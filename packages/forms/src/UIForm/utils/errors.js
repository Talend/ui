import omit from 'lodash/omit';

export function removeError(errors, schema) {
	return omit(errors, schema.key.toString());
}

export function addError(errors, schema, valueError) {
	return {
		...errors,
		[schema.key]: valueError,
	};
}
