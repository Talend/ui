import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { RatioBarComposition } from '../RatioBar/RatioBarComposition.component';
import {
	QualityEmptyLine,
	QualityInvalidLine,
	QualityValidLine,
} from './QualityRatioBar.component';
import I18N_DOMAIN_COMPONENTS from '../constants';

/**
 * This function round up the percentages to make it to 100%
 * based on https://stackoverflow.com/questions/13483430/how-to-make-rounded-percentages-add-up-to-100#answer-13483486
 * @param {number} invalidRaw number of invalid raw
 * @param {number} emptyRaw number of invalid raw
 * @param {number} validRaw number of invalid raw
 * @param {number} digits number of digits we want to keep
 */
export function getQualityPercentagesRounded(invalid, empty, valid, digits = 0) {
	let sumValues = 0;
	let sumRounded = 0;
	const digitMultiplier = Math.pow(10, digits);
	const multiplier = 100 * digitMultiplier;

	const total = invalid + empty + valid;

	sumValues = (invalid * multiplier) / total;
	const invalidRounded = Math.round(sumValues - sumRounded) / digitMultiplier;
	sumRounded = Math.round(sumValues);

	sumValues += (empty * multiplier) / total;
	const emptyRounded = Math.round(sumValues - sumRounded) / digitMultiplier;
	sumRounded = Math.round(sumValues);

	sumValues += (valid * multiplier) / total;
	const validRounded = Math.round(sumValues - sumRounded) / digitMultiplier;

	return [invalidRounded, emptyRounded, validRounded];
}

export function QualityBar({ invalid, valid, empty, digits = 1 }) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);

	const [invalidPercentage, emptyPercentage, validPercentage] = getQualityPercentagesRounded(
		invalid,
		empty,
		valid,
		digits,
	);

	return (
		<RatioBarComposition>
			<QualityInvalidLine value={invalid} percentage={invalidPercentage} t={t} />
			<QualityEmptyLine value={empty} percentage={emptyPercentage} t={t} />
			<QualityValidLine value={valid} percentage={validPercentage} t={t} />
		</RatioBarComposition>
	);
}

QualityBar.propTypes = {
	invalid: PropTypes.number.isRequired,
	empty: PropTypes.number.isRequired,
	valid: PropTypes.number.isRequired,
	digits: PropTypes.number,
};
