import React from 'react';
import PropTypes from 'prop-types';

import RatioBar from '../RatioBar';
import {
	QualityEmptyLine,
	QualityInvalidLine,
	QualityNotApplicableLine,
	QualityPlaceholderLine,
	QualityValidLine,
} from './QualityRatioBar.component';

/**
 * This function round up the percentages to make it to 100%
 * based on https://stackoverflow.com/questions/13483430/how-to-make-rounded-percentages-add-up-to-100#answer-13483486
 * @param {number} invalidRaw number of invalid raw
 * @param {number} emptyRaw number of empty raw
 * @param {number} validRaw number of valid raw
 * @param {number} naRaw number of not applicable raw
 * @param {number} digits number of digits we want to keep
 */
export function getQualityPercentagesRounded(invalid, empty, valid, na, placeholder, digits = 0) {
	let sumValues = 0;
	let sumRounded = 0;
	const digitMultiplier = Math.pow(10, digits);
	const multiplier = 100 * digitMultiplier;

	const total = invalid + empty + valid + na + placeholder;

	sumValues = (invalid * multiplier) / total;
	const invalidRounded = Math.round(sumValues - sumRounded) / digitMultiplier;
	sumRounded = Math.round(sumValues);

	sumValues += (empty * multiplier) / total;
	const emptyRounded = Math.round(sumValues - sumRounded) / digitMultiplier;
	sumRounded = Math.round(sumValues);

	sumValues += (valid * multiplier) / total;
	const validRounded = Math.round(sumValues - sumRounded) / digitMultiplier;
	sumRounded = Math.round(sumValues);

	sumValues += (na * multiplier) / total;
	const naRounded = Math.round(sumValues - sumRounded) / digitMultiplier;

	sumValues += (placeholder * multiplier) / total;
	const placeholderRounded = Math.round(sumValues - sumRounded) / digitMultiplier;

	return [invalidRounded, emptyRounded, validRounded, naRounded, placeholderRounded];
}

export function QualityBar({
	digits = 1,
	empty = 0,
	getDataFeature,
	invalid = 0,
	na = 0,
	placeholder = 0,
	onClick,
	valid = 0,
}) {
	console.log('[SG]', 'from qb', onClick);
	const [invalidPercentage, emptyPercentage, validPercentage, naPercentage, placeholderPercentage] =
		getQualityPercentagesRounded(invalid, empty, valid, na, placeholder, digits);

	const common = { onClick, getDataFeature };

	return (
		<RatioBar.Composition>
			<QualityInvalidLine {...common} percentage={invalidPercentage} value={invalid} />
			<QualityEmptyLine {...common} percentage={emptyPercentage} value={empty} />
			<QualityNotApplicableLine {...common} percentage={naPercentage} value={na} />
			<QualityValidLine {...common} value={valid} percentage={validPercentage} />
			<QualityPlaceholderLine {...common} percentage={placeholderPercentage} value={placeholder} />
		</RatioBar.Composition>
	);
}

QualityBar.propTypes = {
	digits: PropTypes.number,
	empty: PropTypes.number,
	getDataFeature: PropTypes.func,
	invalid: PropTypes.number,
	na: PropTypes.number,
	placeholder: PropTypes.number,
	onClick: PropTypes.func,
	valid: PropTypes.number,
};
