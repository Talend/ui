import get from 'lodash/get';

function replicateNewlyCreatedValues(key, value, values, rhf) {
	if (key && key in values) {
		return;
	}

	if (Array.isArray(value)) {
		value.forEach((item, index) =>
			replicateNewlyCreatedValues(`${key}[${index}]`, item, values, rhf),
		);
	} else if (typeof value === 'object') {
		const keyPrefix = key ? `${key}.` : '';
		Object.entries(value).forEach(([itemKey, item]) => {
			replicateNewlyCreatedValues(`${keyPrefix}${itemKey}`, item, values, rhf);
		});
	} else {
		console.log(`New value attached to key ${key}`, value);
		rhf.setValue(key, value);
	}
}

function replicateExistingValues(oldValues, newValues, rhf) {
	Object.entries(oldValues).forEach(([key, oldValue]) => {
		const newValue = get(newValues, key);
		if (newValue !== oldValue) {
			console.log(`"${key}" value has changed`, { oldValue, newValue });
			rhf.setValue(key, newValue);
		}
	});
}

export default function updateValues(rhf, valuesModifier) {
	const oldValues = rhf.getValues();
	const newValues =
		typeof valuesModifier === 'function'
			? valuesModifier(rhf.getValues({ nest: true }))
			: valuesModifier;

	// compare old keys to new ones, to update existing values if needed
	// this covers value removal and value update
	replicateExistingValues(oldValues, newValues, rhf);

	// go through all newValues keys, to add created values
	replicateNewlyCreatedValues('', newValues, oldValues, rhf);
}
