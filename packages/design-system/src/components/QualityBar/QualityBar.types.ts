import type { MouseEvent } from 'react';

export enum QualityType {
	VALID = 'valid',
	INVALID = 'invalid',
	EMPTY = 'empty',
	NA = 'na',
}

export type EnrichedQualityType = QualityType | 'placeholder';

export type QualityTypeValues = {
	valid?: number;
	invalid?: number;
	empty?: number;
	na?: number;
};

export type QualityBarPercentages = Required<QualityTypeValues> & {
	placeholder: number;
};

export type QualityCommonProps = QualityTypeValues & {
	disabled?: boolean;
	getDataFeature?: (type: string) => string;
	onClick?: (e: MouseEvent<HTMLElement>, data: { type: EnrichedQualityType }) => void;
	placeholder?: number;
	tooltipLabels?: QualityBarTooltips;
};

export type QualityBarTooltips = {
	empty?: string;
	invalid?: string;
	na?: string;
	valid?: string;
};
