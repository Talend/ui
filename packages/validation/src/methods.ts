import { NAME, EMAIL, DOMAIN, PHONE } from './regexp';

/**
 * Build a validation method along a given regular expression
 * @param {RegExp} regexp Regular expression to test values against
 * @returns {Function}
 */
function getValidationMethod(regexp: RegExp): Function {
	return (value: string) => regexp.test(value);
}

/**
 * Check that a given value is a valid first name
 * @param {string} value
 * @returns {boolean}
 */
export const validFirstName: Function = getValidationMethod(NAME);

/**
 * Check that a given value is a valid last name
 * @param {string} value
 * @returns {boolean}
 */
export const validLastName: Function = getValidationMethod(NAME);

/**
 * Check that a given value is a value email address
 * @param {string} value
 * @returns {boolean}
 */
export const validEmail: Function = getValidationMethod(EMAIL);

/**
 * Check that a given value is a valid domain
 * @param {string} value
 * @returns {boolean}
 */
export const validDomain: Function = getValidationMethod(DOMAIN);

/**
 * Check that a given value is a value phone number
 * @param {string} value
 * @returns {boolean}
 */
export const validPhone: Function = getValidationMethod(PHONE);
