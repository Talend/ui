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

	const [
		invalidPercentage,
		emptyPercentage,
		validPercentage,
		naPercentage,
		placeholderPercentage,
	] = getQualityPercentagesRounded(invalid, empty, valid, na, placeholder, digits);

	return (
		<RatioBar.Composition>
			<QualityInvalidLine
				dataFeature={getDataFeature ? getDataFeature(QualityType.INVALID) : null}
				onClick={
					onClick
						? e =>
								onClick(e, {
									type: QualityType.INVALID,
								})
						: null
				}
				percentage={invalidPercentage}
				t={t}
				value={invalid}
			/>
			<QualityEmptyLine
				dataFeature={getDataFeature ? getDataFeature(QualityType.EMPTY) : null}
				onClick={
					onClick
						? e =>
								onClick(e, {
									type: QualityType.EMPTY,
								})
						: null
				}
				percentage={emptyPercentage}
				t={t}
				value={empty}
			/>
			<QualityNotApplicableLine
				dataFeature={getDataFeature ? getDataFeature(QualityType.NA) : null}
				onClick={
					onClick
						? e =>
								onClick(e, {
									type: QualityType.NA,
								})
						: null
				}
				percentage={naPercentage}
				t={t}
				value={na}
			/>
			<QualityValidLine
				dataFeature={getDataFeature ? getDataFeature(QualityType.VALID) : null}
				onClick={
					onClick
						? e =>
								onClick(e, {
									type: QualityType.VALID,
								})
						: null
				}
				value={valid}
				percentage={validPercentage}
				t={t}
			/>
			<QualityPlaceholderLine percentage={placeholderPercentage} t={t} value={placeholder} />
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
