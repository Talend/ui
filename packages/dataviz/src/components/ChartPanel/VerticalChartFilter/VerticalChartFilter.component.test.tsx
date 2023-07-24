/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';
import VerticalChartFilter from './VerticalChartFilter.component';
import { VerticalBarChartEntry } from '../../BarChart/VerticalBarChart';
import { NumberRangeHandler } from '../../RangeFilter';

jest.mock('../../BarChart/VerticalBarChart/VerticalBarChart.component', () => {
	return ({ data, getTooltipContent }) => (
		<div data-data={JSON.stringify(data)} data-testid="VerticalBarChart">
			{data.length > 0 && (
				<span data-testid="VerticalBarChart-tooltip">{getTooltipContent(data[0])}</span>
			)}
		</div>
	);
});
describe('Profiling chart panel', () => {
	const mocks = {
		onBarClick: jest.fn(),
		onRangeChange: jest.fn(),
		width: 300,
		height: 300,
	};
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('Should not show range filter if limits min and max are equal', () => {
		render(
			<VerticalChartFilter
				data={[]}
				rangeHandler={NumberRangeHandler}
				rangeLimits={{ min: 10, max: 10 }}
				{...mocks}
			/>,
		);

		expect(document.querySelectorAll('.theme-range-filter')).toHaveLength(0);
	});

	it('Should show range filter if limits min and max are different', () => {
		render(
			<VerticalChartFilter
				data={[]}
				rangeHandler={NumberRangeHandler}
				rangeLimits={{ min: 10, max: 20 }}
				{...mocks}
			/>,
		);
		expect(document.querySelectorAll('.theme-range-filter')).toHaveLength(1);
	});

	it('Should handle bars with bounds outside range limits', () => {
		render(
			<VerticalChartFilter
				data={[
					{
						value: 20,
						filteredValue: 10,
						label: '[10, 20[',
						key: { min: -100, max: 20 },
					},
					{
						value: 20,
						filteredValue: 10,
						label: '[30, 40[',
						key: { min: 30, max: 300 },
					},
				]}
				rangeHandler={NumberRangeHandler}
				activeRange={{ min: 2, max: 40 }}
				rangeLimits={{ min: 2, max: 40 }}
				{...mocks}
			/>,
		);
		const data = JSON.parse(
			screen.getByTestId('VerticalBarChart').dataset.data,
		) as VerticalBarChartEntry[];
		expect(data[0].filteredValue).toEqual(10);
		expect(data[1].filteredValue).toEqual(10);
	});
});
