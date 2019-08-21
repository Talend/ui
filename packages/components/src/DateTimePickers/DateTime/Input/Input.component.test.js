import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { DateTimeContext } from '../Context';
import Input from './Input.component';

describe('DateTime.Input', () => {
	it('should render', () => {
		// given
		const managerValue = {
			datetime: {
				textInput: '2007-01-02',
			},
			dateInputManagement: {
				placeholder: 'YYY-MM-DD',
			},
			timeInputManagement: {
				placeholder: 'HH:mm',
			},
		};

		// when
		const wrapper = mount(
			<DateTimeContext.Provider value={managerValue}>
				<Input aria-labelledby="labelId" part="date" />
			</DateTimeContext.Provider>,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
