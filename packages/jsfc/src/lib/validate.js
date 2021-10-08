/*  Common code for validating a value against its form and schema definition */
import tv4 from 'tv4';

/**
 * Validate a value against its form definition and schema.
 * The value should either be of proper type or a string, some type
 * coercion is applied.
 *
 * @param {Object} form A merged form definition, i.e. one with a schema.
 * @param {Any} value the value to validate.
 * @return {Object} a tv4js result object.
 */
export function validate(form, value) {
	if (!form) {
		return { valid: true };
	}

	let schema = form.schema;
	if (!schema) {
		return { valid: true };
	}

	// Input of type text and textareas will give us a viewValue of ''
	// when empty, this is a valid value in a schema and does not count as something
	// that breaks validation of 'required'. But for our own sanity an empty field should
	// not validate if it's required.
	if (value === '') {
		value = undefined;
	}

	// Numbers fields will give a null value, which also means empty field
	if (form.type === 'number' && value === null) {
		value = undefined;
	}

	// Version 4 of JSON Schema has the required property not on the
	// property itself but on the wrapping object. Since we like to test
	// only this property we wrap it in a fake object.
	let wrap = { type: 'object', properties: {}, required: undefined };
	let propName = form.key[form.key.length - 1];
	wrap.properties[propName] = schema;

	if (form.required) {
		wrap.required = [propName];
	}

	let valueWrap = {};
	if (typeof value !== 'undefined') {
		valueWrap[propName] = value;
	}

	return tv4.validateResult(valueWrap, wrap);
}
