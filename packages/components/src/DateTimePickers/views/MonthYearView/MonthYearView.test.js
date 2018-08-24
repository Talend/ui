import React from 'react';
import { shallow } from 'enzyme';

import { mockDate, restoreDate } from '../../shared/utils/test/dateMocking';
import MonthYearView from './MonthYearView.component';

beforeAll(() => {
	mockDate();
});
afterAll(() => {
	restoreDate();
});

describe('MonthYearView', () => {
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
