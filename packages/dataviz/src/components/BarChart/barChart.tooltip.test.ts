import {
	getHorizontalBarChartTooltip,
	getVerticalBarChartTooltip,
	ValueType,
} from './barChart.tooltip';

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
			{ key: 'Max', value: '20' },
			{ key: 'Record', value: 'France' },
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
			{ key: 'Max value matching your filter', value: '10' },
			{ key: 'Record', value: 'France' },
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
			{ key: 'Occurrences matching your filter', value: '10 (50.0%)' },
			{ key: 'Occurrences in entire dataset', value: '20' },
			{ key: 'Record', value: 'France' },
		]);
	});
	it('Should return content for a range', () => {
		expect(
			getVerticalBarChartTooltip({
				value: 20,
				key: {
					min: 10,
					max: 20,
				},
				filteredValue: 10,
				label: '[10, 20[',
			}),
		).toEqual([
			{ key: 'Occurrences matching your filter', value: '10 (50.0%)' },
			{ key: 'Occurrences in entire dataset', value: '20' },
			{ key: 'Range', value: '[10, 20[' },
		]);
	});
	it('Should return content for a range with same min and max', () => {
		expect(
			getVerticalBarChartTooltip({
				value: 20,
				key: {
					min: 10,
					max: 10,
				},
				filteredValue: 10,
				label: '10',
			}),
		).toEqual([
			{ key: 'Occurrences matching your filter', value: '10 (50.0%)' },
			{ key: 'Occurrences in entire dataset', value: '20' },
			{ key: 'Value', value: '10' },
		]);
	});
});
