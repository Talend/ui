import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import RatioBar from '../RatioBar';
import {
	QualityEmptyLine,
	QualityInvalidLine,
	QualityNotApplicableLine,
	QualityPlaceholderLine,
	QualityType,
	QualityValidLine,
} from './QualityRatioBar.component';
import I18N_DOMAIN_COMPONENTS from '../constants';

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
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);

	const [invalidPercentage, emptyPercentage, validPercentage, naPercentage, placeholderPercentage] =
		getQualityPercentagesRounded(invalid, empty, valid, na, placeholder, digits);

	const commonProps = { onClick, getDataFeature, t };

	return (
		<RatioBar.Composition>
			<QualityInvalidLine percentage={invalidPercentage} value={invalid} {...commonProps} />
			<QualityEmptyLine percentage={emptyPercentage} value={empty} {...commonProps} />
			<QualityNotApplicableLine percentage={naPercentage} value={na} {...commonProps} />
			<QualityValidLine value={valid} percentage={validPercentage} {...commonProps} />
			<QualityPlaceholderLine
				percentage={placeholderPercentage}
				value={placeholder}
				{...commonProps}
			/>
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
