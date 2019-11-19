import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { DateRangeContext } from '../Context';
import Inputs from './Inputs.component';

describe('DateRange.Inputs', () => {
	it('should render', () => {
		// given
		const context = {
			startDate: {
				textInput: '2007-01-02',
			},
			endDate: {
				textInput: '2007-01-08',
			},
			inputManagement: {
				placeholder: 'YYYY-MM-DD',
			},
		};
		window.HTMLElement.prototype.getBoundingClientRect = () => ({ width: 42 });

		// when
		const wrapper = mount(
			<DateRangeContext.Provider value={context}>
				<Inputs aria-labelledby="labelId" />
			</DateRangeContext.Provider>,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
