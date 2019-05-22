import omit from 'lodash/omit';

export function getError(errors, schema) {
	return errors[schema.key];
}

export function removeError(errors, schema) {
	if (!errors[schema.key]) {
		return errors;
	}
	return omit(errors, schema.key.toString());
}

export function addError(errors, schema, valueError) {
	if (errors[schema.key] === valueError) {
		return errors;
	}
	return {
		...errors,
		[schema.key]: valueError,
	};
}
