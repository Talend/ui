import React from 'react';
import { shallow } from 'enzyme';

import CellDatetime, { computeValue } from './CellDatetime.component';

describe('CellDatetime', () => {
	it('should render', () => {
		// when
		const columnData = {
			mode: 'ago',
		};

		const wrapper = shallow(<CellDatetime cellData={1474495200000} columnData={columnData} />);
		// then
		expect(wrapper.getElement()).toBeDefined();
	});
	it('should format with "ago"', () => {
		// when
		const columnData = {
			mode: 'ago',
		};
		const cellData = 1474495200000;
		const strDate = computeValue(cellData, columnData);

		// then
		expect(strDate.indexOf('ago')).toBeGreaterThan(-1);
	});


	it('should format according to the pattern', () => {
		// when
		const columnData = {
			mode: 'format',
			pattern: 'YYYY-MM-DD HH:mm:ss',
			throughISO: true,
		};
		const cellData = 1474495200000 + 3600 * 11 * 1000;
		const timezoneOffset = new Date().getTimezoneOffset();
		console.log('offset en minute', timezoneOffset);
		const cellDataWithOffset = cellData + timezoneOffset * 60 * 1000;
		const expectedStrDate = `2016-09-22 ${11 + timezoneOffset / 60}:00:00`;

		const strDate = computeValue(cellDataWithOffset, columnData);

		// then
		expect(strDate).toEqual(expectedStrDate);
	});
});
