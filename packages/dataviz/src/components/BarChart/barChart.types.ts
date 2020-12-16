/**
 * Item to display in the charts.
 * We can have both dataset & filtered values, or only one of them
 */
export type ChartEntry<U> = {
	key: U;
	label?: string;
} & ({ value: number; filteredValue?: number } | { value?: number; filteredValue: number });

