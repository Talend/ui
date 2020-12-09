import i18next from 'i18next';
import { ChartEntry, ValueType, VerticalBarChartEntry } from './barChart.types';
import { TooltipEntry } from '../TooltipContent/TooltipContent.component';

function getFilteredValueLabel(valueType: ValueType): string {
	return {
		[ValueType.MIN]: i18next.t('MIN_MATCHING_FILTER', 'Min matching your filter'),
		[ValueType.MAX]: i18next.t('MAX_MATCHING_FILTER_MAX', 'Max matching your filter'),
		[ValueType.AVERAGE]: i18next.t('AVERAGE_MATCHING_FILTER', 'Average matching your filter'),
		[ValueType.SUM]: i18next.t('SUM_MATCHING_FILTER', 'Sum matching your filter'),
		[ValueType.OCCURRENCES]: i18next.t(
			'OCCURRENCES_MATCHING_FILTER',
			'Occurrences matching your filter',
		),
	}[valueType];
}

function getDatasetValueLabel(valueType: ValueType, hasFilteredValue: boolean): string {
	let label;
	/**
	 *  We want t(XX, {defaultValue: YY}) instead of constants so it can be picked up by i18n-scanner
	 */
	switch (valueType) {
		case ValueType.MIN:
			label = i18next.t('MIN', 'Min');
			break;
		case ValueType.MAX:
			label = i18next.t('MAX', 'Max');
			break;
		case ValueType.AVERAGE:
			label = i18next.t('AVERAGE', 'Average');
			break;
		case ValueType.SUM:
			label = i18next.t('SUM', 'Sum');
			break;
		case ValueType.OCCURRENCES:
			label = hasFilteredValue
				? i18next.t('OCCURRENCES_IN_DATASET', 'Occurrences in entire dataset')
				: i18next.t('SUM', 'Occurrences');
			break;
		default:
			label = valueType;
	}
	return label;
}

function formatFilteredValue(filteredValue: number, value?: number): string {
	let label = filteredValue.toLocaleString();
	if (value) {
		const percentage = ((filteredValue / value) * 100).toFixed(1);
		label = `${label} (${percentage}%)`;
	}
	return label;
}

function getValuesLines<U>(entry: ChartEntry<U>, valueType: ValueType): TooltipEntry[] {
	const tooltipLines: TooltipEntry[] = [];

	if (entry.filteredValue != null) {
		tooltipLines.push({
			key: getFilteredValueLabel(valueType),
			value: formatFilteredValue(entry.filteredValue, entry.value),
		});
	}

	if (entry.value != null) {
		tooltipLines.push({
			key: getDatasetValueLabel(valueType, entry.filteredValue != null),
			value: entry.value.toLocaleString(),
		});
	}
	return tooltipLines;
}

export function getHorizontalBarChartTooltip(entry: ChartEntry<string>, valueType: ValueType) {
	return [
		...getValuesLines(entry, valueType),
		{
			key: i18next.t('RECORD', 'Record'),
			value: entry.key || i18next.t('EMPTY', 'Empty'),
		},
	];
}

export function getVerticalBarChartTooltip(entry: VerticalBarChartEntry): TooltipEntry[] {
	return [
		...getValuesLines(entry, ValueType.OCCURRENCES),
		entry.key.min === entry.key.max
			? {
					key: i18next.t('VALUE', 'Value'),
					value: entry.label,
			  }
			: {
					key: i18next.t('RANGE', 'Range'),
					value: entry.label,
			  },
	];
}
