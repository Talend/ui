import React from 'react';
import { shallow } from 'enzyme';
import VerticalChartFilter from './VerticalChartFilter.component';
import { DataType } from '../../../types';
import { VerticalBarChartEntry } from '../../BarChart/VerticalBarChart';

describe('Profiling chart panel', () => {
	const mocks = {
		onBarClick: jest.fn(),
		onRangeChange: jest.fn(),
	};

	it('Should not show range filter if limits min and max are equal', () => {
		const component = shallow(
			<VerticalChartFilter
				data={[]}
				dataType={DataType.NUMBER}
				rangeLimits={{ min: 10, max: 10 }}
				{...mocks}
			/>,
		);

		expect(component.find('RangeFilter')).toHaveLength(0);
	});

	it('Should show range filter if limits min and max are different', () => {
		const component = shallow(
			<VerticalChartFilter
				data={[]}
				dataType={DataType.NUMBER}
				rangeLimits={{ min: 10, max: 20 }}
				{...mocks}
			/>,
		);

		expect(component.find('RangeFilter')).toHaveLength(1);
	});

	it('Should syn bar chart with range filter', () => {
		const component = shallow(
			<VerticalChartFilter
				data={[
					{
						value: 10,
						filteredValue: 10,
						label: '[10, 20[',
						key: { min: 10, max: 20 },
					},
					{
						value: 10,
						filteredValue: 10,
						label: '[20, 30[',
						key: { min: 20, max: 30 },
					},
					{
						value: 10,
						filteredValue: 10,
						label: '[30, 40[',
						key: { min: 30, max: 40 },
					},
				]}
				dataType={DataType.NUMBER}
				activeRange={{ min: 12, max: 38 }}
				rangeLimits={{ min: 10, max: 40 }}
				{...mocks}
			/>,
		);

		expect(
			((component
				.find('VerticalBarChart')
				.prop('data')! as unknown) as VerticalBarChartEntry[]).map(entry => entry.filteredValue),
		).toEqual([0, 10, 0]);
	});

	it('Should handle bars with bounds outside range limits', () => {
		const component = shallow(
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
				dataType={DataType.NUMBER}
				activeRange={{ min: 2, max: 40 }}
				rangeLimits={{ min: 2, max: 40 }}
				{...mocks}
			/>,
		);

		expect(
			((component
				.find('VerticalBarChart')
				.prop('data')! as unknown) as VerticalBarChartEntry[]).map(entry => entry.filteredValue),
		).toEqual([10, 10]);
	});
});
