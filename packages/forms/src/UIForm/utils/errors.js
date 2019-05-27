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

export function reconciliateAllErrors(oldErrors, newErrors) {
	Object.entries(oldErrors)
		.filter(entry => entry[0] in newErrors)
		.reduce((accu, [key, value]) => {
			// eslint-disable-next-line no-param-reassign
			accu[key] = value;
			return accu;
		}, newErrors);

	return Object.entries(newErrors)
		.filter(entry => entry[1])
		.reduce((accu, [key, value]) => {
			// eslint-disable-next-line no-param-reassign
			accu[key] = value;
			return accu;
		}, {});
}

export function reconciliateSingleErrors(oldErrors, newSingleErrors) {
	return Object.entries(newSingleErrors).reduce((accu, [errorKey, errorValue]) => {
		const errorSchema = { key: errorKey };
		return errorValue ? addError(accu, errorSchema, errorValue) : removeError(accu, errorSchema);
	}, oldErrors);
}
