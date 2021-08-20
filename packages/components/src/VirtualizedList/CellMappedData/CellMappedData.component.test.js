import React from 'react';
import { shallow } from 'enzyme';

import CellMappedData from './CellMappedData.component';

describe('CellMappedData', () => {
	const valuesMap = {
		'value_1': 'Value 1',
		'value_2': 'Value 2',
		1: 'One',
		'two': 2,
	};

	const defaultColumnData = { valuesMap };

	it('should render checked mapped data cell for a string value', () => {
		// given
		const cellData = 'value_1';

		// when
		const wrapper = shallow(<CellMappedData cellData={cellData} columnData={defaultColumnData} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render checked mapped data cell for a collection of values', () => {
		// given
		const cellData = ['value_1', null, 'not_mapped', 1, 'two', undefined];

		// when
		const wrapper = shallow(<CellMappedData cellData={cellData} columnData={defaultColumnData} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render checked mapped data cell for a collection of values', () => {
		// given
		const cellData = ['value_1', 'value_2'];
		const columnData = {
			...defaultColumnData,
			separator: ' / ',
		};

		// when
		const wrapper = shallow(<CellMappedData cellData={cellData} columnData={columnData} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
