import React from 'react';
import { shallow } from 'enzyme';
import { distanceInWordsToNow, format } from 'date-fns';

import { computeValue, CellDatetimeComponent } from './CellDatetime.component';
import getDefaultT from '../../translate';
import getLocale from '../../DateFnsLocale/locale';

jest.mock('../../DateFnsLocale/locale');

jest.mock('date-fns', () => ({
	format: jest.fn(() => '2016-09-22 09:00:00'),
	distanceInWordsToNow: jest.fn(() => 'about 1 month ago'),
}));

describe('CellDatetime', () => {
	beforeAll(() => {
		getLocale.mockImplementation(() => 'getLocale');
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
		const expectedStrDate = `2016-09-22 ${isOneDigitHours ? 0 : ''}${11 +
			timezoneOffset / 60}:00:00`;
		const computedStrOffset = computeValue(cellDataWithOffset, columnData);
		// then
		expect(computedStrOffset).toEqual(expectedStrDate);
		expect(format).toHaveBeenCalledWith(cellDataWithOffset, columnData.pattern);
	});

	it('should test CellDatetime render with tooltip', () => {
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
});
