import React from 'react';
import { shallow } from 'enzyme';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import format from 'date-fns/format';
import { date as dateUtils } from '@talend/utils';

import { computeValue, CellDatetimeComponent } from './CellDatetime.component';
import getDefaultT from '../../translate';
import getLocale from '../../i18n/DateFnsLocale/locale';

jest.mock('../../i18n/DateFnsLocale/locale');

jest.mock('date-fns/distance_in_words_to_now', () => ({
	__esModule: true,
	default: jest.fn(() => 'about 1 month ago'),
}));
jest.mock('date-fns/format', () => ({
	__esModule: true,
	default: jest.fn(() => '2016-09-22 09:00:00'),
}));

jest.mock('@talend/utils', () => {
	const actualUtils = jest.requireActual('@talend/utils');

	return {
		...actualUtils,
		date: {
			...actualUtils.date,
			formatToTimeZone: jest.fn(() => '2016-09-22 09:00:00'),
		},
	};
});

describe('CellDatetime', () => {
	beforeAll(() => {
		getLocale.mockImplementation(() => 'getLocale');
	});

	afterAll(() => {
		jest.unmock('../../i18n/DateFnsLocale/locale');
		jest.unmock('date-fns/distance_in_words_to_now');
		jest.unmock('date-fns/format');
		jest.unmock('../../utils/date');
	});

	it('should render CellDatetime', () => {
		// when
		const columnData = {
			mode: 'ago',
		};

		const wrapper = shallow(
			<CellDatetimeComponent cellData={1474495200000} columnData={columnData} />,
		);
		// then
		expect(distanceInWordsToNow).toHaveBeenCalledWith(1474495200000, {
			addSuffix: true,
			locale: 'getLocale',
		});
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render CellDatetime with no date', () => {
		// when
		const columnData = {
			mode: 'ago',
		};

		const wrapper = shallow(<CellDatetimeComponent columnData={columnData} />);
		// then
		const cellValue = wrapper.find('.cell-datetime-container').text();
		expect(cellValue).toEqual('');
	});

	it('should render CellDatetime with invalid date', () => {
		// when
		const columnData = {
			mode: 'format',
		};

		const cellData = 'not parsable date';

		const wrapper = shallow(<CellDatetimeComponent cellData={cellData} columnData={columnData} />);
		// then
		const cellValue = wrapper.find('.cell-datetime-container').text();
		expect(cellValue).toEqual(cellData);
	});

	it('should format with "ago"', () => {
		// when
		const columnData = {
			mode: 'ago',
		};
		const cellData = 1474495200000;
		const strDate = computeValue(cellData, columnData, getDefaultT());

		// then
		expect(strDate).toEqual(expect.stringContaining('ago'));
	});

	it('should format according to the pattern', () => {
		// when
		const t = jest.fn();
		const columnData = {
			mode: 'format',
			pattern: 'YYYY-MM-DD HH:mm:ss',
		};
		const cellData = 1474495200000 + 3600 * 11 * 1000;
		const timezoneOffset = new Date(cellData).getTimezoneOffset();
		const cellDataWithOffset = cellData + timezoneOffset * 60 * 1000;
		const hours = 11 + timezoneOffset / 60;
		const isOneDigitHours = hours.toString().length === 1;
		const expectedStrDate = `2016-09-22 ${isOneDigitHours ? 0 : ''}${
			11 + timezoneOffset / 60
		}:00:00`;
		const computedStrOffset = computeValue(cellDataWithOffset, columnData, t);
		// then
		expect(computedStrOffset).toEqual(expectedStrDate);
		expect(format).toHaveBeenCalledWith(cellDataWithOffset, columnData.pattern, {
			locale: getLocale(t),
		});
	});

	it('should render CellDatetime with tooltip in ago mode', () => {
		// when
		const columnData = {
			mode: 'ago',
		};

		const wrapper = shallow(
			<CellDatetimeComponent cellData={1474495200000} columnData={columnData} />,
		);
		expect(wrapper.find('TooltipTrigger').length).toBe(1);
		expect(wrapper.find('TooltipTrigger').getElement().props.label).toBe('2016-09-22 09:00:00');
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should format with timezone', () => {
		// when
		const columnData = {
			mode: 'format',
			pattern: 'YYYY-MM-DD HH:mm:ss',
			timeZone: 'Pacific/Niue',
		};
		const t = jest.fn();

		const cellData = 1474495200000;
		computeValue(cellData, columnData, t);

		// then
		expect(dateUtils.formatToTimeZone).toHaveBeenCalledWith(cellData, columnData.pattern, {
			timeZone: columnData.timeZone,
			locale: getLocale(t),
		});
	});
});
