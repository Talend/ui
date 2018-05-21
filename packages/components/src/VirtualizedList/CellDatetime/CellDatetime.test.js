import React from 'react';
import { shallow } from 'enzyme';
import { distanceInWordsToNow, format } from 'date-fns';

import {
	computeValue,
	CellDatetimeComponent,
	buildDistanceInWordsLocale,
} from './CellDatetime.component';
import getDefaultT from '../../translate';

jest.mock('date-fns', () => ({
	format: jest.fn(() => '2016-09-22 09:00:00'),
	distanceInWordsToNow: jest.fn(() => 'about 1 month ago'),
}));

describe('wrapT', () => {
	it('should return the formatDistance with ', () => {
		const distanceInWords = buildDistanceInWordsLocale(getDefaultT());
		expect(
			distanceInWords.localize('lessThanXSeconds', 5, {
				addSuffix: true,
			}),
		).toBe('less than 5 seconds ago');
		expect(
			distanceInWords.localize('xSeconds', 5, {
				addSuffix: true,
			}),
		).toBe('5 seconds ago');
		expect(
			distanceInWords.localize('halfAMinute', 5, {
				addSuffix: true,
			}),
		).toBe('half a minute ago');
		expect(
			distanceInWords.localize('lessThanXMinutes', 5, {
				addSuffix: true,
			}),
		).toBe('less than 5 minutes ago');
		expect(
			distanceInWords.localize('xMinutes', 5, {
				addSuffix: true,
			}),
		).toBe('5 minutes ago');
		expect(
			distanceInWords.localize('aboutXHours', 5, {
				addSuffix: true,
			}),
		).toBe('about 5 hours ago');
		expect(
			distanceInWords.localize('xHours', 5, {
				addSuffix: true,
			}),
		).toBe('5 hours ago');
		expect(
			distanceInWords.localize('xDays', 5, {
				addSuffix: true,
			}),
		).toBe('5 days ago');
		expect(
			distanceInWords.localize('aboutXMonths', 5, {
				addSuffix: true,
			}),
		).toBe('about 5 months ago');
		expect(
			distanceInWords.localize('xMonths', 5, {
				addSuffix: true,
			}),
		).toBe('5 months ago');
		expect(
			distanceInWords.localize('aboutXYears', 5, {
				addSuffix: true,
			}),
		).toBe('about 5 years ago');
		expect(
			distanceInWords.localize('xYears', 5, {
				addSuffix: true,
			}),
		).toBe('5 years ago');
		expect(
			distanceInWords.localize('overXYears', 5, {
				addSuffix: true,
			}),
		).toBe('over 5 years ago');
		expect(
			distanceInWords.localize('almostXYears', 5, {
				addSuffix: true,
			}),
		).toBe('almost 5 years ago');
		expect(
			distanceInWords.localize('lessThanXSeconds', 5, {
				addSuffix: true,
				comparison: 1,
			}),
		).toBe('in less than 5 seconds');

		expect(distanceInWords.localize('lessThanXSeconds', 5)).toBe('less than 5 seconds');
	});
});

describe('CellDatetime', () => {
	it('should render CellDatetime', () => {
		// when
		const columnData = {
			mode: 'ago',
		};

		const wrapper = shallow(
			<CellDatetimeComponent cellData={1474495200000} columnData={columnData} t={getDefaultT()} />,
		);
		// then
		expect(distanceInWordsToNow.mock.calls[0][0]).toBe(1474495200000);
		expect(distanceInWordsToNow.mock.calls[0][1].addSuffix).toBe(true);
		expect(
			distanceInWordsToNow.mock.calls[0][1].locale.distanceInWords.localize('almostXYears', 5, {
				addSuffix: true,
			}),
		).toBe('almost 5 years ago');
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should format with "ago"', () => {
		// when
		const columnData = {
			mode: 'ago',
		};
		const cellData = 1474495200000;
		const strDate = computeValue(cellData, columnData, getDefaultT());

		// then
		expect(strDate.indexOf('ago')).toBeGreaterThan(-1);
	});

	it('should format according to the pattern', () => {
		// when
		const columnData = {
			mode: 'format',
			pattern: 'YYYY-MM-DD HH:mm:ss',
		};
		const cellData = 1474495200000 + 3600 * 11 * 1000;
		const timezoneOffset = new Date(cellData).getTimezoneOffset();
		const cellDataWithOffset = cellData + timezoneOffset * 60 * 1000;
		const hours = 11 + timezoneOffset / 60;
		const isOneDigitHours = hours.toString().length === 1;
		const expectedStrDate = `2016-09-22 ${isOneDigitHours ? 0 : ''}${11 +
			timezoneOffset / 60}:00:00`;
		const computedStrOffset = computeValue(cellDataWithOffset, columnData);
		// then
		expect(computedStrOffset).toEqual(expectedStrDate);
		expect(format).toHaveBeenCalledWith(cellDataWithOffset, columnData.pattern);
	});
});
