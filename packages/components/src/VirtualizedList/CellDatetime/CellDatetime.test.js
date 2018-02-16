import React from 'react';
import { shallow } from 'enzyme';

import CellDatetime, { computeValue } from './CellDatetime.component';

describe('CellDatetime', () => {
	it('should render with "ago"', () => {
		// when
		const columnData = {
			mode: 'ago',
		};

		const wrapper = shallow(<CellDatetime cellData={1474495200000} columnData={columnData} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	xit('should render date formatted', () => {
		// when
		const columnData = {
			mode: 'format',
			pattern: 'YYYY-MM-DD HH:mm:ss',
		};

		const wrapper = shallow(<CellDatetime cellData={1474495200000} columnData={columnData} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render the right value', () => {
		// when
		const columnData = {
			mode: 'format',
			pattern: 'YYYY-MM-DD HH:mm:ss',
			throughISO: true,
		};
		const cellData = 1474495200000;

		const strDate = computeValue(cellData, columnData);
		// then
		expect(strDate).toEqual('2016-09-22 00:00:00');
	});
});
