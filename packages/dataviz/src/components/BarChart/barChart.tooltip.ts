import i18next from 'i18next';
import { ChartEntry } from './barChart.types';
import { TooltipEntry } from '../TooltipContent/TooltipContent.component';
import { VerticalBarChartEntry } from './VerticalBarChart/VerticalBarChart.component';
import { I18N_DOMAIN_DATAVIZ } from '../../constants';

const t = i18next.getFixedT(null, I18N_DOMAIN_DATAVIZ);

export enum ValueType {
	MIN = 'MIN',
	MAX = 'MAX',
	SUM = 'SUM',
	AVERAGE = 'MEAN',
	OCCURRENCES = 'OCCURRENCES',
}

function getFilteredValueLabel(valueType: ValueType): string {
	return {
		[ValueType.MIN]: t('MIN_MATCHING_FILTER', 'Min value matching your filter'),
		[ValueType.MAX]: t('MAX_MATCHING_FILTER_MAX', 'Max value matching your filter'),
		[ValueType.AVERAGE]: t('AVERAGE_MATCHING_FILTER', 'Average of values matching your filter'),
		[ValueType.SUM]: t('SUM_MATCHING_FILTER', 'Sum of values matching your filter'),
		[ValueType.OCCURRENCES]: t('OCCURRENCES_MATCHING_FILTER', 'Occurrences matching your filter'),
	}[valueType];
}

function getDatasetValueLabel(valueType: ValueType, hasFilteredValue: boolean): string {
	let label;
	/**
	 *  We want t(XX, {defaultValue: YY}) instead of constants so it can be picked up by i18n-scanner
	 */
	switch (valueType) {
		case ValueType.MIN:
			label = t('MIN', 'Min');
			break;
		case ValueType.MAX:
			label = t('MAX', 'Max');
			break;
		case ValueType.AVERAGE:
			label = t('MEAN', 'Mean');
			break;
		case ValueType.SUM:
			label = t('SUM', 'Sum');
			break;
		case ValueType.OCCURRENCES:
			label = hasFilteredValue
				? t('OCCURRENCES_IN_DATASET', 'Occurrences in entire dataset')
				: t('SUM', 'Occurrences');
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
			key: t('RECORD', 'Record'),
			value: entry.key || t('EMPTY', 'Empty'),
		},
	];
}

export function getVerticalBarChartTooltip(entry: VerticalBarChartEntry): TooltipEntry[] {
	return [
		...getValuesLines(entry, ValueType.OCCURRENCES),
		entry.key.min === entry.key.max
			? {
					key: t('VALUE', 'Value'),
					value: entry.label,
			  }
			: {
					key: t('RANGE', 'Range'),
					value: entry.label,
			  },
	];
}
