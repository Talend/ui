import Ajv from 'ajv';
import tv4 from 'tv4';

let isInitialized = false;

function initialize(validatorName) {
	if (!isInitialized && validatorName === 'tv4') {
		tv4.addFormat('no-leading-trailing-space', fieldData => {
			if (typeof fieldData === 'string' && /^\s|\s$/.test(fieldData)) {
				return 'must be string without leading or trailing space';
			}

			return null;
		});
	}
	isInitialized = true;
}

export default function validate(jsonSchema, data, { validatorName }) {
	if (!data || !jsonSchema) {
		return false;
	}
	initialize(validatorName);

	if (validatorName === 'tv4') {
		return tv4.validate(data, jsonSchema);
	}

	const validator = new Ajv().compile(jsonSchema);
	return validator && validator(data);
}
