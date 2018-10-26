import React from 'react';
import { shallow } from 'enzyme';

import MonthYearView from './MonthYearView.component';

describe('MonthYearView', () => {
	beforeAll(() => {
		mockDate();
	});
	afterAll(() => {
		restoreDate();
	});

	it('should render a MonthYearView', () => {
		// when
		const wrapper = shallow(
			<MonthYearView
				selectedMonthIndex={8}
				selectedYear={2012}
				onClickBack={() => {}}
				onSelectMonth={() => {}}
				onSelectYear={() => {}}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
