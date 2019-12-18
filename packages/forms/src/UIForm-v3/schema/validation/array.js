export function arrayMinRules(schema, t) {
	const minimum = schema.minItems;
	// const minimum = get(schema, 'schema.minItems');
	if (minimum === undefined) {
		return null;
	}

	return nbItems => {
		if (nbItems >= minimum) {
			return null;
		}
		return t('ERROR_ARRAY_LENGTH_SHORT', {
			defaultValue: 'Minimum number of items: {{minimum}}',
			minimum,
		});
	};
}

export function arrayMaxRules(schema, t) {
	const maximum = schema.maxItems;
	// const maximum = get(schema, 'schema.maxItems');
	if (maximum === undefined) {
		return null;
	}

	return nbItems => {
		if (nbItems <= maximum) {
			return null;
		}
		return t('ERROR_ARRAY_LENGTH_LONG', {
			defaultValue: 'Maximum number of items: {{maximum}}',
			maximum,
		});
	};
}
