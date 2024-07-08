import { QualityBarPercentages } from './QualityBar.types';

/**
 * formatNumber - format a number with a space for the thousand separator
 *
 * @param  {number} value number to format
 * @return {string}       formated number
 * @example
 * 	formatNumber(1200); // return 1 200
 */
export const formatNumber = (value?: number): string => {
	if (!value) {
		return '';
	}

	const parts = value.toString().split('.');
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

	return parts.join('.');
};

/**
 * This function round up the percentages to make it to 100%
 *
 * @param {number} digits number of digits we want to keep
 * @param {number} invalid number of invalid
 * @param {number} empty number of empty
 * @param {number} valid number of valid
 * @param {number} na number of not applicable
 * @param {number} placeholder number for the placeholder
 */
export const getQualityPercentagesRounded = (
	digits: number,
	invalid: number = 0,
	empty: number = 0,
	valid: number = 0,
	na: number = 0,
	placeholder: number = 0,
): Required<QualityBarPercentages> => {
	const output: Required<QualityBarPercentages> = {
		empty: 0,
		invalid: 0,
		na: 0,
		placeholder: 0,
		valid: 0,
	};

	const digitMultiplier = Math.pow(10, digits);
	const total = invalid + empty + valid + na + placeholder;

	if (total === 0) {
		return output;
	}

	const minPercentage = 1 / digitMultiplier;

	output.invalid = +(invalid > 0 ? Math.max((invalid * 100) / total, minPercentage) : 0).toFixed(
		digits,
	);

	output.empty = +(empty > 0 ? Math.max((empty * 100) / total, minPercentage) : 0).toFixed(digits);

	output.na = +(na > 0 ? Math.max((na * 100) / total, minPercentage) : 0).toFixed(digits);

	output.placeholder = +(
		placeholder > 0 ? Math.max((placeholder * 100) / total, minPercentage) : 0
	).toFixed(digits);

	output.valid = +(100 - output.invalid - output.empty - output.na - output.placeholder).toFixed(
		digits,
	);

	return output;
};
