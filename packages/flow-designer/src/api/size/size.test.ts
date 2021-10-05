import { Map } from 'immutable';

import { SizeRecord } from '../../constants/flowdesigner.model';

import * as Size from './size';

const isNotSizeException = `SizeRecord should be a SizeRecord, was given
"""
object
"""
Map {}
"""
you should use Size module functions to create and transform Size`;
const isNotProperSizeException = `SizeRecord should be a SizeRecord, was given
"""
object
"""
Map { "width": 10, "height": 10 }
"""
you should use Size module functions to create and transform Size`;
const isImproperWidth = 'width should be a number, was given 10  of type string';
const isImproperHeight = 'height should be a number, was given 50  of type string';

describe('isSizeElseThrow', () => {
	it('return true if parameter size is a SizeRecord', () => {
		// given
		const testSize = new SizeRecord();
		// when
		const test = Size.isSizeElseThrow(testSize);
		// expect
		expect(test).toEqual(true);
	});

	it('throw an error if parameter is not a SizeRecord', () => {
		// given
		const testSize = Map();
		// when
		// expect
		expect(() => Size.isSizeElseThrow(testSize)).toThrow(isNotSizeException);
	});
});

describe('Size', () => {
	const width = 10;
	const height = 50;
	const testSize = Size.create(width, height);

	const improperWidth = '10';
	const improperHeight = '50';
	const improperTestSize = Map({ width: 10, height: 10 });
	describe('create', () => {
		it('given proper width and height return a Size', () => {
			// given
			// when
			const test = Size.create(width, height);
			// expect
			expect(Size.isSize(test)).toEqual(true);
		});
		it('throw if given an improper width', () => {
			// given
			// when
			// expect
			expect(() => Size.create(improperWidth as any, height)).toThrow(isImproperWidth);
		});
		it('throw if given an improper Height', () => {
			// given
			// when
			// expect
			expect(() => Size.create(width, improperHeight as any)).toThrow(isImproperHeight);
		});
	});
	describe('isSize', () => {
		it('return true if parameter size is a SizeRecord', () => {
			// given
			// when
			const test = Size.isSize(testSize);
			// expect
			expect(test).toEqual(true);
		});

		it('thow an error if parameter is not a NodeRecord', () => {
			// given
			// when
			const test = Size.isSize(improperTestSize);
			// expect
			expect(test).toEqual(false);
		});
	});
	describe('getWidth', () => {
		it('given a proper Size return width', () => {
			// given
			// when
			const test = Size.getWidth(testSize);
			// expect
			expect(test).toEqual(width);
		});
		it('throw given an improper Size', () => {
			expect(() => Size.getWidth(improperTestSize)).toThrow(isNotProperSizeException);
		});
	});
	describe('setWidth', () => {
		it('given a proper Size and a width return a Size with updated width', () => {
			// given
			const newWidth = 500;
			// when
			const test = Size.setWidth(newWidth, testSize);
			// expect
			expect(Size.getWidth(test)).toEqual(newWidth);
		});
		it('throw given an improper width', () => {
			// given
			// when
			// expect
			expect(() => Size.setWidth(improperWidth as any, testSize)).toThrow(
				'width should be a number, was given 10  of type string',
			);
		});
		it('throw given an improper Position', () => {
			// given
			// when
			// expect
			expect(() => Size.setWidth(width, improperTestSize)).toThrow(isNotProperSizeException);
		});
	});
	describe('getHeight', () => {
		it('given a proper size return height', () => {
			// given
			// when
			const test = Size.getHeight(testSize);
			// expect
			expect(test).toEqual(height);
		});
		it('throw given an improper size', () => {
			expect(() => Size.getHeight(improperTestSize)).toThrow(isNotProperSizeException);
		});
	});
	describe('setHeight', () => {
		it('given a proper Size and width return a Position with updated width', () => {
			// given
			const newHeight = 500;
			// when
			const test = Size.setHeight(newHeight, testSize);
			// expect
			expect(Size.getHeight(test)).toEqual(newHeight);
		});
		it('throw given an improper height', () => {
			// given
			// when
			// expect
			expect(() => Size.setHeight(improperHeight as any, testSize)).toThrow(
				'height should be a number, was given 50  of type string',
			);
		});
		it('throw given an improper Size', () => {
			// given
			// when
			// expect
			expect(() => Size.setHeight(height, improperTestSize)).toThrow(
				isNotProperSizeException,
			);
		});
	});
});
