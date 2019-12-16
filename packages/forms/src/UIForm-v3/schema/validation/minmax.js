import get from 'lodash/get';

export function minRules(schema, t) {
	const minimum = get(schema, 'schema.minimum');
	if (minimum === undefined) {
		return null;
	}

	return function validateMin(value) {
		if (!value) {
			return null;
		}

		const numValue = parseFloat(value);
		if (isNaN(numValue)) {
			return null;
		}

		if (value < minimum) {
			return t('ERROR_NUMBER_MINIMUM', {
				defaultValue: 'Value {value} is less than minimum {minimum}',
				minimum,
				value,
			});
		}

		return null;
	};
}

export function maxRules(schema, t) {
	const maximum = get(schema, 'schema.maximum');
	if (maximum === undefined) {
		return null;
	}

	return function validateMin(value) {
		if (!value) {
			return null;
		}

		const numValue = parseFloat(value);
		if (isNaN(numValue)) {
			return null;
		}

		if (value > maximum) {
			return t('ERROR_NUMBER_MAXIMUM', {
				defaultValue: 'Value {value} is greater than maximum {maximum}',
				maximum,
				value,
			});
		}

		return null;
	};
}
