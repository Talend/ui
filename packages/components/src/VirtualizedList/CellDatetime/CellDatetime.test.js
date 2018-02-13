import React from 'react';
import { shallow } from 'enzyme';

import CellDatetime from './CellDatetime.component';

describe('CellDatetime', () => {
	it('should render with "ago"', () => {
		// when
		const columnData = {
			data: {
				mode: 'ago',
			},
		};

		const wrapper = shallow(<CellDatetime cellData={1518561116} columnData={columnData} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render date formatted', () => {
		// when
		const columnData = {
			data: {
				mode: 'format',
				pattern: 'YYYY-MM-DD HH:mm:ss',
			},
		};

		const wrapper = shallow(<CellDatetime cellData={1518561116} columnData={columnData} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
