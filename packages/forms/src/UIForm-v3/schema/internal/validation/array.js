export function arrayMinRules({ language = {}, schema, t }) {
	const minimum = schema.minItems;
	if (minimum === undefined) {
		return () => {};
	}

	return nbItems => {
		if (nbItems >= minimum) {
			return () => {};
		}
		return (
			language.ARRAY_LENGTH_SHORT ||
			t('ERROR_ARRAY_LENGTH_SHORT', {
				defaultValue: 'Minimum number of items: {{minimum}}',
				minimum,
			})
		);
	};
}

export function arrayMaxRules({ language = {}, schema, t }) {
	const maximum = schema.maxItems;
	if (maximum === undefined) {
		return () => {};
	}

	return nbItems => {
		if (nbItems <= maximum) {
			return () => {};
		}
		return (
			language.ARRAY_LENGTH_LONG ||
			t('ERROR_ARRAY_LENGTH_LONG', {
				defaultValue: 'Maximum number of items: {{maximum}}',
				maximum,
			})
		);
	};
}
