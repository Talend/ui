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
	placeholder = 0,
): Required<QualityBarPercentages> => {
	const output: Required<QualityBarPercentages> = {
		empty: 0,
		invalid: 0,
		na: 0,
		placeholder: 0,
		valid: 0,
	};

	let sumValues = 0;
	let sumRounded = 0;
	const digitMultiplier = Math.pow(10, digits);
	const multiplier = 100 * digitMultiplier;

	const total = invalid + empty + valid + na + placeholder;

	sumValues = (invalid * multiplier) / total;
	output.invalid = Math.round(sumValues - sumRounded) / digitMultiplier;
	sumRounded = Math.round(sumValues);

	sumValues += (empty * multiplier) / total;
	output.empty = Math.round(sumValues - sumRounded) / digitMultiplier;
	sumRounded = Math.round(sumValues);

	sumValues += (valid * multiplier) / total;
	output.valid = Math.round(sumValues - sumRounded) / digitMultiplier;
	sumRounded = Math.round(sumValues);

	sumValues += (na * multiplier) / total;
	output.na = Math.round(sumValues - sumRounded) / digitMultiplier;

	sumValues += (placeholder * multiplier) / total;
	output.placeholder = Math.round(sumValues - sumRounded) / digitMultiplier;

	return output;
};
