import { getHorizontalBarChartTooltip, getVerticalBarChartTooltip, ValueType } from './barChart.tooltip';

describe('BarChartTooltip', () => {
	it('Should return content for an aggregation on full dataset', () => {
		expect(
			getHorizontalBarChartTooltip(
				{
					value: 20,
					key: 'France',
				}!,
				ValueType.MAX,
			),
		).toEqual([
			{ key: 'MAX', value: '20' },
			{ key: 'RECORD', value: 'France' },
		]);
	});
	it('Should return content for an aggregation on filtered data', () => {
		expect(
			getHorizontalBarChartTooltip(
				{
					key: 'France',
					filteredValue: 10,
				},
				ValueType.MAX,
			),
		).toEqual([
			{ key: 'MAX_MATCHING_FILTER_MAX', value: '10' },
			{ key: 'RECORD', value: 'France' },
		]);
	});
	it('Should return a percentage when both filtered and full data are provided', () => {
		expect(
			getHorizontalBarChartTooltip(
				{
					value: 20,
					key: 'France',
					filteredValue: 10,
				},
				ValueType.OCCURRENCES,
			),
		).toEqual([
			{ key: 'OCCURRENCES_MATCHING_FILTER', value: '10 (50.0%)' },
			{ key: 'OCCURRENCES_IN_DATASET', value: '20' },
			{ key: 'RECORD', value: 'France' },
		]);
	});
	it('Should return content for a range', () => {
		expect(
			getVerticalBarChartTooltip(
				{
					value: 20,
					key: {
						min: 10,
						max: 20
					},
					filteredValue: 10,
					label: '[10, 20['
				}
			),
		).toEqual([
			{ key: 'OCCURRENCES_MATCHING_FILTER', value: '10 (50.0%)' },
			{ key: 'OCCURRENCES_IN_DATASET', value: '20' },
			{ key: 'RANGE', value: '[10, 20[' },
		]);
	});
	it('Should return content for a range with same min and max', () => {
		expect(
			getVerticalBarChartTooltip(
				{
					value: 20,
					key: {
						min: 10,
						max: 10
					},
					filteredValue: 10,
					label: '10'
				}
			),
		).toEqual([
			{ key: 'OCCURRENCES_MATCHING_FILTER', value: '10 (50.0%)' },
			{ key: 'OCCURRENCES_IN_DATASET', value: '20' },
			{ key: 'VALUE', value: '10' },
		]);
	});
});
