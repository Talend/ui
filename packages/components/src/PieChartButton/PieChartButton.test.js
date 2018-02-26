import React from 'react';
import { arc } from 'd3-shape';
import initStoryshots from '@storybook/addon-storyshots';
import {
	decorateWithOverlay,
	decorateWithTooltip,
	getCircle,
	getEmptyPartCircle,
	setMinimum,
	wrapMouseEvent,
} from './PieChartButton.component';

initStoryshots({
	configPath: 'src/PieChartButton/__snapshots__',
});

describe('PieChartButton', () => {
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
		let arcGen = null;

		beforeEach(() => {
			arcGen = arc();
		});

		it('should get return a path', () => {
			// given
			const value = values[0];

			// when
			const result = getCircle(value, 0, values, size, arcGen, false);

			// then
			expect(result).toMatchSnapshot();
		});

		it('should get return a path with hover color', () => {
			// given
			const value = values[0];

			// when
			const result = getCircle(value, 0, values, size, arcGen, true);

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
		let arcGen = null;

		beforeEach(() => {
			arcGen = arc();
		});

		it('should get return a path for the rest', () => {
			// given
			// when
			const result = getEmptyPartCircle(values, size, arcGen, 'purple', false, 5);

			// then
			expect(result).toMatchSnapshot();
		});

		it('should not be shown if the minimum percentage is above the rest', () => {
			// given
			// when
			const result = getEmptyPartCircle(values, size, arcGen, 'purple', false, 11);

			// then
			expect(result).toBeNull();
		});
	});

	describe('setMinimum', () => {
		it('should move some percentages to fit the minimum', () => {
			// given
			const values = [
				{ color: 'red', percentage: 40 },
				{ color: 'purple', percentage: 30 },
				{ color: 'white', percentage: 2 },
				{ color: 'blue', percentage: 3 },
			];

			// when
			const result = setMinimum(values, 5);

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
			const result = setMinimum(values, 5);

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
			const result = setMinimum(values, 5);

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
});
