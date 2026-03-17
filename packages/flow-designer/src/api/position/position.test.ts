import { Map } from 'immutable';

import { PositionRecord } from '../../constants/flowdesigner.model';

import * as Position from './position';

const isNotPositionException = `PositionRecord should be a PositionRecord, was given
"""
object
"""
Map {}
"""
you should use Position module functions to create and transform Position`;
const improperPositionException = `PositionRecord should be a PositionRecord, was given
"""
object
"""
Map { "x": 10, "y": 10 }
"""
you should use Position module functions to create and transform Position`;
const isImproperXCoordinate = 'x should be a number, was given 10 of type string';
const isImproperYCoordinate = 'y should be a number, was given 50 of type string';

describe('isPositionElseThrow', () => {
	it('return true if parameter position is a PositionRecord', () => {
		// given
		const testPosition = new PositionRecord();
		// when
		const test = Position.isPositionElseThrow(testPosition);
		// expect
		expect(test).toEqual(true);
	});

	it('thow an error if parameter is not a PositionRecord', () => {
		// given
		const testPosition = Map();
		// when
		// expect
		expect(() => Position.isPositionElseThrow(testPosition)).toThrow(isNotPositionException);
	});
});

describe('Position', () => {
	const x = 10;
	const y = 50;
	const testPosition = Position.create(x, y);

	const improperX = '10';
	const improperY = '50';
	const improperTestPosition = Map({ x: 10, y: 10 });
	describe('create', () => {
		it('given proper x and y coordinate return a Position', () => {
			// given
			// when
			const test = Position.create(x, y);
			// expect
			expect(Position.isPosition(test)).toEqual(true);
		});
		it('throw if given an improper id', () => {
			// given
			// when
			// expect
			expect(() => Position.create(improperX as any, y)).toThrow(isImproperXCoordinate);
		});
		it('throw if given an improper Position', () => {
			// given
			// when
			// expect
			expect(() => Position.create(x, improperY as any)).toThrow(isImproperYCoordinate);
		});
	});
	describe('isPosition', () => {
		it('return true if parameter position is a PositionRecord', () => {
			// given
			// when
			const test = Position.isPosition(testPosition);
			// expect
			expect(test).toEqual(true);
		});

		it('thow an error if parameter is not a NodeRecord', () => {
			// given
			// when
			const test = Position.isPosition(improperTestPosition);
			// expect
			expect(test).toEqual(false);
		});
	});
	describe('getXCoordinate', () => {
		it('given a proper position return x', () => {
			// given
			// when
			const test = Position.getXCoordinate(testPosition);
			// expect
			expect(test).toEqual(x);
		});
		it('throw given an improper position', () => {
			expect(() => Position.getXCoordinate(improperTestPosition)).toThrow(
				improperPositionException,
			);
		});
	});
	describe('setXCoordinate', () => {
		it('given a proper Position and X coordinate return a Position with updated coordinate', () => {
			// given
			const newX = 500;
			// when
			const test = Position.setXCoordinate(newX, testPosition);
			// expect
			expect(Position.getXCoordinate(test)).toEqual(newX);
		});
		it('throw given an improper X coordinate', () => {
			// given
			// when
			// expect
			expect(() => Position.setXCoordinate(improperX as any, testPosition)).toThrow(
				'x should be a number, was given 10 of type string',
			);
		});
		it('throw given an improper Position', () => {
			// given
			// when
			// expect
			expect(() => Position.setXCoordinate(x, improperTestPosition)).toThrow(
				improperPositionException,
			);
		});
	});
	describe('getYCoordinate', () => {
		it('given a proper Position return y', () => {
			// given
			// when
			const test = Position.getYCoordinate(testPosition);
			// expect
			expect(test).toEqual(y);
		});
		it('throw given an improper position', () => {
			expect(() => Position.getYCoordinate(improperTestPosition)).toThrow(
				improperPositionException,
			);
		});
	});
	describe('setYCoordinate', () => {
		it('given a proper Position and Y coordinate return a Position with updated coordinate', () => {
			// given
			const newY = 500;
			// when
			const test = Position.setYCoordinate(newY, testPosition);
			// expect
			expect(Position.getYCoordinate(test)).toEqual(newY);
		});
		it('throw given an improperY coordinate', () => {
			// given
			// when
			// expect
			expect(() => Position.setYCoordinate(improperY as any, testPosition)).toThrow(
				'y should be a number, was given 50 of type string',
			);
		});
		it('throw given an improper Position', () => {
			// given
			// when
			// expect
			expect(() => Position.setYCoordinate(y, improperTestPosition)).toThrow(
				improperPositionException,
			);
		});
	});
});
