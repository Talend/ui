export enum QualityType {
	VALID = 'valid',
	INVALID = 'invalid',
	EMPTY = 'empty',
	NA = 'na',
}

export type EnrichedQualityType = QualityType | 'placeholder';

export type QualityCommonProps = {
	valid?: number;
	invalid?: number;
	empty?: number;
	na?: number;
};

export type QualityBarPercentages = Required<QualityCommonProps> & {
	placeholder: number;
};
