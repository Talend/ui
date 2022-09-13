import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';

import { StackHorizontal } from '@talend/design-system';

import {
	QualityEmptyLine,
	QualityInvalidLine,
	QualityNotApplicableLine,
	QualityPlaceholderLine,
	QualityValidLine,
	QualityType,
} from './QualityRatioBar.component';
import RatioBar from '../RatioBar';

function QualityBarRatioBars({
	valid,
	invalid,
	empty,
	na,
	placeholder,
	percentages,
	getDataFeature,
	onClick,
}) {
	const fwd = { onClick, getDataFeature };

	return (
		<RatioBar.Composition>
			<QualityInvalidLine {...fwd} value={invalid} percentage={percentages.invalid} />
			<QualityEmptyLine {...fwd} value={empty} percentage={percentages.empty} />
			<QualityNotApplicableLine {...fwd} value={na} percentage={percentages.na} />
			<QualityValidLine {...fwd} value={valid} percentage={percentages.valid} />
			<QualityPlaceholderLine {...fwd} value={placeholder} percentage={percentages.placeholder} />
		</RatioBar.Composition>
	);
}

QualityBarRatioBars.propTypes = {
	valid: PropTypes.number,
	invalid: PropTypes.number,
	empty: PropTypes.number,
	na: PropTypes.number,
	placeholder: PropTypes.number,
	percentages: PropTypes.shape({
		valid: PropTypes.number,
		invalid: PropTypes.number,
		empty: PropTypes.number,
		na: PropTypes.number,
		placeholder: PropTypes.number,
	}),
	onClick: PropTypes.func,
	getDataFeature: PropTypes.func,
};

/**
 * This function round up the percentages to make it to 100%
 * based on https://stackoverflow.com/questions/13483430/how-to-make-rounded-percentages-add-up-to-100#answer-13483486
 * @param {number} invalidRaw number of invalid raw
 * @param {number} emptyRaw number of empty raw
 * @param {number} validRaw number of valid raw
 * @param {number} naRaw number of not applicable raw
 * @param {number} digits number of digits we want to keep
 */
function getQualityPercentagesRounded(invalid, empty, valid, na, placeholder, digits) {
	const output = {};

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
}

function SplitQualityBar({ empty, getDataFeature, invalid, na, onClick, valid, percentages }) {
	const totalValues = empty + invalid + na + valid;
	const usedValues = { empty, invalid, na, valid };
	const fwd = { getDataFeature, onClick };

	return (
		<StackHorizontal gap="M">
			{[QualityType.INVALID, QualityType.EMPTY, QualityType.NOTAPPLICABLE, QualityType.VALID].map(
				type => {
					const currentTypePercentage = percentages[type];
					const currentTypeValue = usedValues[type];

					return currentTypePercentage ? (
						<StackHorizontal gap="XXS" key={type}>
							<span>{currentTypePercentage}%</span>

							<QualityBarRatioBars
								{...fwd}
								{...{ [type]: currentTypeValue }} // Spread needed for the dynamic "type" key
								placeholder={totalValues - currentTypeValue}
								percentages={{ ...percentages, placeholder: 100 - currentTypePercentage }}
							/>
						</StackHorizontal>
					) : null;
				},
			)}
		</StackHorizontal>
	);
}

SplitQualityBar.propTypes = {
	...omit(QualityBarRatioBars.propTypes, ['placeholder']),
};

export function QualityBar(props) {
	const { valid, invalid, empty, na, placeholder, digits, split } = props;
	const percentages = getQualityPercentagesRounded(invalid, empty, valid, na, placeholder, digits);

	return split ? (
		<SplitQualityBar {...props} percentages={percentages} />
	) : (
		<QualityBarRatioBars {...props} percentages={percentages} />
	);
}

QualityBar.propTypes = {
	...omit(QualityBarRatioBars.propTypes, ['percentages']),
	digits: PropTypes.number,
	split: PropTypes.bool,
};

QualityBar.defaultProps = {
	digits: 1,
	empty: 0,
	invalid: 0,
	na: 0,
	placeholder: 0,
	valid: 0,
	split: false,
};
