import React from 'react';
import { shallow } from 'enzyme';
import { distanceInWordsToNow, format } from 'date-fns';

import { computeValue, CellDatetimeComponent } from './CellDatetime.component';
import getDefaultT from '../../translate';
import getLocale from '../../i18n/DateFnsLocale/locale';
import { formatToTimeZone } from '../../utils/date';

jest.mock('../../i18n/DateFnsLocale/locale');

jest.mock('date-fns', () => ({
	format: jest.fn(() => '2016-09-22 09:00:00'),
	distanceInWordsToNow: jest.fn(() => 'about 1 month ago'),
}));

jest.mock('../../utils/date', () => ({
	formatToTimeZone: jest.fn(() => '2016-09-22 09:00:00'),
}));

describe('CellDatetime', () => {
	beforeAll(() => {
		getLocale.mockImplementation(() => 'getLocale');
	});

	afterAll(() => {
		jest.unmock('../../i18n/DateFnsLocale/locale');
		jest.unmock('date-fns');
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
		const columnData = {
			mode: 'format',
			pattern: 'YYYY-MM-DD HH:mm:ss',
		};
		const cellData = 1474495200000 + 3600 * 11 * 1000;
		const timezoneOffset = new Date(cellData).getTimezoneOffset();
		const cellDataWithOffset = cellData + timezoneOffset * 60 * 1000;
		const hours = 11 + timezoneOffset / 60;
		const isOneDigitHours = hours.toString().length === 1;
		const expectedStrDate = `2016-09-22 ${isOneDigitHours ? 0 : ''}${11 + timezoneOffset / 60}:00:00`;
		const computedStrOffset = computeValue(cellDataWithOffset, columnData);
		// then
		expect(computedStrOffset).toEqual(expectedStrDate);
		expect(format).toHaveBeenCalledWith(cellDataWithOffset, columnData.pattern);
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

		const cellData = 1474495200000;
		computeValue(cellData, columnData);

		// then
		expect(formatToTimeZone).toHaveBeenCalledWith(cellData, columnData.pattern, {
			timeZone: columnData.timeZone,
		});
	});
});
