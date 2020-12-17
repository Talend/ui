import { NAME, EMAIL, DOMAIN, PHONE } from './regexp';

/**
 * Check that a given value is a valid first name
 * @param {String} value
 * @returns {boolean}
 */
export function validFirstName(value: string): boolean {
	return NAME.test(value);
}
/**
 * Check that a given value is a valid last name
 * @param {String} value
 * @returns {boolean}
 */
export function validLastName(value: string): boolean {
	return NAME.test(value);
}

/**
 * Check that a given value is a value email address
 * @param {String} value
 * @returns {boolean}
 */
export function validEmail(value: string): boolean {
	return EMAIL.test(value);
}

/**
 * Check that a given value is a valid domain
 * @param {String} value
 * @returns {boolean}
 */
export function validDomain(value: string): boolean {
	return DOMAIN.test(value);
}

/**
 * Check that a given value is a value phone number
 * @param {String} value
 * @returns {boolean}
 */
export function validPhone(value: string): boolean {
	return PHONE.test(value);
}
