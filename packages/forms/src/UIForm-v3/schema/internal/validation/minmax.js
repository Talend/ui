import get from 'lodash/get';

export function minRules(schema, t) {
	const minimum = get(schema, 'schema.minimum');
	if (minimum === undefined) {
		return null;
	}

	return {
		value: minimum,
		message: t('ERROR_NUMBER_MINIMUM', {
			defaultValue: 'Value is less than minimum ({{minimum}})',
			minimum,
		}),
	};
}

export function maxRules(schema, t) {
	const maximum = get(schema, 'schema.maximum');
	if (maximum === undefined) {
		return null;
	}

	return {
		value: maximum,
		message: t('ERROR_NUMBER_MAXIMUM', {
			defaultValue: 'Value is greater than maximum ({{maximum}})',
			maximum,
		}),
	};
}
