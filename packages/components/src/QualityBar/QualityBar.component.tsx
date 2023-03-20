import React from 'react';

import { EnrichedQualityType, QualityBarPercentages, QualityCommonProps } from './QualityBar.types';
import { QualityBarRatioBars } from './QualityBarRatioBars.component';
import { SplitQualityBar } from './SplitQualityBar.component';

export type QualityBarProps = QualityCommonProps & {
	disabled?: boolean;
	placeholder?: number;
	digits?: number;
	split?: boolean;
	onClick?: (e: React.MouseEvent<HTMLElement>, data: { type: EnrichedQualityType }) => void;
	getDataFeature?: (type: string) => string;
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
function getQualityPercentagesRounded(
	digits: number,
	invalid = 0,
	empty = 0,
	valid = 0,
	na = 0,
	placeholder = 0,
): Required<QualityBarPercentages> {
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
}

export function QualityBar({
	valid,
	invalid,
	empty,
	na,
	placeholder,
	digits = 1,
	split = false,
	...rest
}: QualityBarProps) {
	const percentages = getQualityPercentagesRounded(digits, invalid, empty, valid, na, placeholder);
	return split ? (
		<SplitQualityBar
			valid={valid}
			invalid={invalid}
			empty={empty}
			na={na}
			percentages={percentages}
			{...rest}
		/>
	) : (
		<QualityBarRatioBars
			valid={valid}
			invalid={invalid}
			empty={empty}
			na={na}
			placeholder={placeholder}
			percentages={percentages}
			{...rest}
		/>
	);
}
