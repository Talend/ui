import get from 'lodash/get';
import { generateKey } from './key';

function replicateNewlyCreatedValues(key, value, values, rhf) {
	if (key && key in values) {
		return;
	}

	if (typeof value === 'object') {
		Object.entries(value).forEach(([itemKey, item]) => {
			replicateNewlyCreatedValues(
				generateKey(key, itemKey, Array.isArray(value)),
				item,
				values,
				rhf,
			);
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
