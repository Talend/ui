import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { DateRangeContext } from '../Context';
import Input from './Input.component';

describe('Date.Input', () => {
	it('should render', () => {
		// given
		const managerValue = {
			inputManagement: {
				placeholder: 'YYYY-MM-DD',
			},
		};
		const props = {
			onFocus: jest.fn(),
			onChange: jest.fn(),
			label: 'start date',
			date: {
				value: new Date(2019, 9, 11),
				textInput: '2019-10-11',
			},
		};

		window.HTMLElement.prototype.getBoundingClientRect = () => ({ width: 42 });

		// when
		const wrapper = mount(
			<DateRangeContext.Provider value={managerValue}>
				<Input {...props} />
			</DateRangeContext.Provider>,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
