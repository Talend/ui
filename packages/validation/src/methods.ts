import { NAME, EMAIL, DOMAIN, PHONE } from './regexp';

/**
 * Check that a given value is a valid first name
 * @param {String} value
 * @returns {Boolean}
 */
export function validFirstName(value: string): Boolean {
	return NAME.test(value);
}
/**
 * Check that a given value is a valid last name
 * @param {String} value
 * @returns {Boolean}
 */
export function validLastName(value: string): Boolean {
	return NAME.test(value);
}

/**
 * Check that a given value is a value email address
 * @param {String} value
 * @returns {Boolean}
 */
export function validEmail(value: string): Boolean {
	return EMAIL.test(value);
}

/**
 * Check that a given value is a valid domain
 * @param {String} value
 * @returns {Boolean}
 */
export function validDomain(value: string): Boolean {
	return DOMAIN.test(value);
}

/**
 * Check that a given value is a value phone number
 * @param {String} value
 * @returns {Boolean}
 */
export function validPhone(value: string): Boolean {
	return PHONE.test(value);
}
