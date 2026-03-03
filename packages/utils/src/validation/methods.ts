import { NAME, EMAIL, DOMAIN } from './regexp';

/**
 * Build a validation method along a given regular expression
 * @param {RegExp} regexp Regular expression to test values against
 * @returns {Function}
 */
function getValidationMethod(regexp: RegExp): (value: string) => boolean {
	return (value: string) => regexp.test(value);
}

/**
 * Check that a given value is a valid first name
 * @param {string} value
 * @returns {boolean}
 */
export const validFirstName: (value: string) => boolean = getValidationMethod(NAME);

/**
 * Check that a given value is a valid last name
 * @param {string} value
 * @returns {boolean}
 */
export const validLastName: (value: string) => boolean = getValidationMethod(NAME);

/**
 * Check that a given value is a value email address
 * @param {string} value
 * @returns {boolean}
 */
export const validEmail: (value: string) => boolean = getValidationMethod(EMAIL);

/**
 * Check that a given value is a valid domain
 * @param {string} value
 * @returns {boolean}
 */
export const validDomain: (value: string) => boolean = getValidationMethod(DOMAIN);
