import React from 'react';
import { shallow } from 'enzyme';
import {
	distributePercentages,
	getAngle,
	getCircle,
	getDisplaySize,
	getEmptyPartCircle,
	getLabel,
	getPercentageToIndex,
	PieChartIconComponent,
	setMinimumPercentage,
	PIECHART_SIZES,
} from './PieChartIcon.component';

describe('PieChart', () => {
	describe('snapshots render', () => {
		const pieChartData = [
			{
				color: 'rio-grande',
				percentage: 50,
			},
			{
				color: 'chestnut-rose',
				percentage: 12,
			},
			{
				color: 'lightning-yellow',
				percentage: 1,
			},
			{
				color: 'dove-gray',
				percentage: 4,
			},
			{
				color: 'silver-chalice',
				percentage: 3,
			},
		];

		it('should render a Skeleton when the state is loading', () => {
			const wrapper = shallow(<PieChartIconComponent loading model={pieChartData} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
		it('should render a PieChart', () => {
			const wrapper = shallow(
				<PieChartIconComponent display={PIECHART_SIZES.SMALL} model={pieChartData} />,
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
		it('should spread extra props on svg', () => {
			// given
			const ariaLabel = 'Invalid values: 50%. Empty values: 14%. Valid values: 36%';

			// when
			const wrapper = shallow(
				<PieChartIconComponent model={pieChartData} aria-label={ariaLabel} />,
			);

			// then
			expect(wrapper.find('svg').prop('aria-label')).toBe(ariaLabel);
		});
	});

	describe('getCircle', () => {
		const values = [
			{ percentageShown: 10, color: 'red', percentage: 10 },
			{ percentageShown: 20, color: 'blue', percentage: 20 },
		];
		const size = { svgSize: 20 };

		it('should get return a path', () => {
			// given
			const value = values[0];

			// when
			const result = getCircle(value, 0, values, size);

			// then
			expect(result).toMatchSnapshot();
		});

		it('should get return a path with hover color', () => {
			// given
			const value = values[0];

			// when
			const result = getCircle(value, 0, values, size);

			// then
			expect(result).toMatchSnapshot();
		});
	});

	describe('getEmptyPartCircle', () => {
		const values = [
			{ percentageShown: 60, color: 'red', percentage: 60 },
			{ percentageShown: 30, color: 'blue', percentage: 30 },
		];
		const size = { svgSize: 20 };

		it('should get return a path for the rest', () => {
			// given
			// when
			const result = getEmptyPartCircle(values, size, 5);

			// then
			expect(result).toMatchSnapshot();
		});

		it('should not be shown if the minimum percentage is above the rest', () => {
			// given
			// when
			const result = getEmptyPartCircle(values, size, 11);

			// then
			expect(result).toBeNull();
		});
	});

	describe('distributePercentages', () => {
		it('should return an empty array if empty array is set', () => {
			// given

			// when
			const result = distributePercentages([], 5, 2);

			// then
			expect(result).toEqual([]);
		});

		it('should move some percentages to fit the minimum', () => {
			// given
			const values = [
				{ percentageShown: 40 },
				{ percentageShown: 6 },
				{ percentageShown: 5 },
				{ percentageShown: 5 },
			];

			// when
			const result = distributePercentages(values, 5, 7);

			// then
			expect(result).toEqual([
				{ percentageShown: 34 },
				{ percentageShown: 5 },
				{ percentageShown: 5 },
				{ percentageShown: 5 },
			]);
		});
	});

	describe('setMinimumPercentage', () => {
		it('should return an empty array if no model is set', () => {
			// given

			// when
			const result = setMinimumPercentage(null, 5);

			// then
			expect(result).toEqual([]);
		});

		it('should move some percentages to fit the minimum', () => {
			// given
			const values = [
				{ color: 'red', percentage: 40 },
				{ color: 'purple', percentage: 30 },
				{ color: 'white', percentage: 2 },
				{ color: 'blue', percentage: 3 },
			];

			// when
			const result = setMinimumPercentage(values, 5);

			// then
			expect(result).toEqual([
				{ percentageShown: 37, color: 'red', percentage: 40 },
				{ percentageShown: 28, color: 'purple', percentage: 30 },
				{ percentageShown: 5, color: 'white', percentage: 2 },
				{ percentageShown: 5, color: 'blue', percentage: 3 },
			]);
		});

		it('should do nothing if all values fit well the min', () => {
			// given
			const values = [
				{ color: 'red', percentage: 40 },
				{ color: 'purple', percentage: 30 },
				{ color: 'white', percentage: 10 },
				{ color: 'blue', percentage: 7 },
			];

			// when
			const result = setMinimumPercentage(values, 5);

			// then
			expect(result).toEqual([
				{ percentageShown: 40, color: 'red', percentage: 40 },
				{ percentageShown: 30, color: 'purple', percentage: 30 },
				{ percentageShown: 10, color: 'white', percentage: 10 },
				{ percentageShown: 7, color: 'blue', percentage: 7 },
			]);
		});

		it('should update all the values and not loop to infinite', () => {
			// given
			const values = [
				{ color: 'red', percentage: 6 },
				{ color: 'purple', percentage: 2 },
				{ color: 'white', percentage: 2 },
				{ color: 'blue', percentage: 2 },
			];

			// when
			const result = setMinimumPercentage(values, 5);

			// then
			expect(result).toEqual([
				{ percentageShown: 5, color: 'red', percentage: 6 },
				{ percentageShown: 5, color: 'purple', percentage: 2 },
				{ percentageShown: 5, color: 'white', percentage: 2 },
				{ percentageShown: 5, color: 'blue', percentage: 2 },
			]);
		});
	});

	describe('getAngle', () => {
		it('should return the angle for 50%', () => {
			// given
			// when
			const result = getAngle(50);
			// then
			expect(result).toBe(Math.PI);
		});
	});

	describe('Name of the group', () => {
		it('should return the sum of 2 first percentages', () => {
			// given
			const values = [
				{ color: 'red', percentageShown: 40 },
				{ color: 'purple', percentageShown: 30 },
				{ color: 'white', percentageShown: 10 },
				{ color: 'blue', percentageShown: 7 },
			];
			// when
			const result = getPercentageToIndex(values, 2);
			// then
			expect(result).toBe(70);
		});
	});

	describe('getDisplaySize', () => {
		it('should return a size object if display is given but no size', () => {
			// given
			// when
			const result = getDisplaySize(null, 'large');
			// then
			expect(result).toEqual({
				innerRadius: 18,
				outerRadius: 22,
				padAngle: 0.161,
				svgSize: 50,
			});
		});

		it('should return a size object if only size is given', () => {
			// given
			const size = 28;
			// when
			const result = getDisplaySize(size, 'large');
			// then
			expect(result).toEqual({
				innerRadius: 9,
				outerRadius: 12,
				padAngle: 0.18960000000000002,
				svgSize: 28,
			});
		});
	});

	describe('getLabel', () => {
		const t = jest.fn((_, obj) => obj.percentage);

		it('should show a rounded label', () => {
			// given
			const hideLabel = false;
			const labelValue = { percentage: 12.2 };
			// when
			const value = getLabel(hideLabel, labelValue, t);
			// then
			expect(value).toBe('12');
		});

		it('should show no label when hideLabel is passed to true', () => {
			// given
			const hideLabel = true;
			const labelValue = { percentage: 12.2 };
			// when
			const value = getLabel(hideLabel, labelValue, t);
			// then
			expect(value).toBe('');
		});

		it('should show < 1% when the value is < 1 & > 0', () => {
			// given
			const hideLabel = false;
			const labelValue = { percentage: 0.1 };
			// when
			const value = getLabel(hideLabel, labelValue, t);
			// then
			expect(value).toBe('< 1');
		});

		it('should show > 99% when the value is < 100 & > 99', () => {
			// given
			const hideLabel = false;
			const labelValue = { percentage: 99.9 };
			// when
			const value = getLabel(hideLabel, labelValue, t);
			// then
			expect(value).toBe('> 99');
		});
	});
});
