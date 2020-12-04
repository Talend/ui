/**
 * Item to display in the charts.
 * We can have both dataset & filtered values, or only one of them
 */
export type ChartEntry<U> = {
	key: U;
	label?: string;
} & ({ value: number; filteredValue?: number } | { value?: number; filteredValue: number });

export type VerticalBarChartEntry = ChartEntry<Range> & {
	label: string;
};

export enum ValueType {
	MIN = 'MIN',
	MAX = 'MAX',
	SUM = 'SUM',
	AVERAGE = 'AVERAGE',
	OCCURRENCES = 'OCCURRENCES',
}

export type Range = {
	min: number;
	max: number;
	excludeMax?: boolean;
};

export enum ChartStyle {
	VALUE = 'value',
	PATTERN = 'pattern',
}

export enum DataType {
	DATE = 'DATE',
	NUMBER = 'NUMBER',
}
