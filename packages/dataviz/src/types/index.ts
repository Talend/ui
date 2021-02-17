export type Range = {
	min: number;
	max: number;
	excludeMax?: boolean;
};

export enum ChartStyle {
	VALUE = 'value',
	PATTERN = 'pattern',
}
