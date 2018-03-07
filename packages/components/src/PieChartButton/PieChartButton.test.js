import React from 'react';
import { shallow } from 'enzyme';
import PieChartButton, {
	decorateWithOverlay,
	decorateWithTooltip,
	distributePercentages,
	getAngle,
	getCircle,
	getDisplaySize,
	getPercentageToIndex,
	getEmptyPartCircle,
	setMinimumPercentage,
	wrapMouseEvent,
} from './PieChartButton.component';

describe('PieChartButton', () => {
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
				color: 'slate-gray',
				percentage: 4,
			},
			{
				color: 'silver-chalice',
				percentage: 3,
			},
		];

		it('should render a PieChartButton', () => {
			const wrapper = shallow(<PieChartButton display="small" model={pieChartData} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should trigger onClick', () => {
			const onClick = jest.fn();
			const event = {};
			const wrapper = shallow(
				<PieChartButton label="my label" display="small" model={pieChartData} onClick={onClick} />,
			);

			wrapper
				.find('Button')
				.at(0)
				.simulate('click', event);

			expect(onClick).toHaveBeenCalledWith(event, {
				action: {
					label: 'my label',
				},
				model: pieChartData,
			});
		});

		it('should render a PieChartButton with an overlay', () => {
			const overlayComponent = <div>I am an overlay</div>;
			const wrapper = shallow(
				<PieChartButton
					display="medium"
					labelIndex={2}
					model={pieChartData}
					overlayComponent={overlayComponent}
					overlayId="id-popover"
				/>,
			);

			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render a Skeleton when the state is loading', () => {
			const wrapper = shallow(<PieChartButton loading model={pieChartData} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('decorateWithOverlay', () => {
		it('should return the same component if no overlayComponent', () => {
			// given
			const btn = <div className="fake-button-element" />;
			// when
			const modified = decorateWithOverlay(btn);
			// then
			expect(modified).toBe(btn);
		});

		it('should return the component wrapped', () => {
			// given
			const btn = <div className="fake-button-element" />;
			const overlayComponent = <div className="fake-overlay" />;
			// when
			const modified = decorateWithOverlay(btn, 'top', overlayComponent, 'id-test');

			// then
			expect(modified).not.toBe(btn);
			expect(modified).toMatchSnapshot();
		});
	});

	describe('decorateWithTooltip', () => {
		it('should return the same component if no tooltip passed', () => {
			// given
			const btn = <div className="fake-button-element" />;
			// when
			const modified = decorateWithTooltip(btn, false, 'label', 'top');
			// then
			expect(modified).toBe(btn);
		});

		it('should return the component wrapped with tooltip', () => {
			// given
			const btn = <div className="fake-button-element" />;
			// when
			const modified = decorateWithTooltip(btn, true, 'label', 'top');

			// then
			expect(modified).not.toBe(btn);
			expect(modified).toMatchSnapshot();
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

	describe('wrapMouseEvent', () => {
		it('should return null if there is an overlay component', () => {
			// given
			const onClick = jest.fn();
			const overlayComponent = <div className="fake-overlay" />;

			// when
			const result = wrapMouseEvent(onClick, overlayComponent, 'label');

			// then
			expect(result).toBeNull();
		});
		it('should return a wrapped handler if there is no overlay component', () => {
			// given
			const onClick = jest.fn();

			// when
			const result = wrapMouseEvent(onClick, null, 'label');

			// then
			expect(result).not.toBeNull();
			expect(onClick).not.toHaveBeenCalled();
			result();
			expect(onClick).toHaveBeenCalled();
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
				padAngle: 0.101,
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
				padAngle: 0.1736,
				svgSize: 28,
			});
		});
	});
});
