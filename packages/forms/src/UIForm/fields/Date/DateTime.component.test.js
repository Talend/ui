import React from 'react';
import { shallow } from 'enzyme';
import DateTimeWidget from './DateTime.component';

describe('DateTime widget', () => {
	const schema = {
		autoFocus: true,
		description: 'talend datetime picker',
		placeholder: 'YYYY-MM-DD HH:mm',
		required: true,
		title: 'Select DateTime',
		type: 'text',
		schema: { type: 'string' },
	};
	it('should render a InputDateTimePicker', () => {
		// when
		const wrapper = shallow(
			<DateTimeWidget
				id="talend-date-time"
				isValid={false}
				errorMessage="something wrong"
				schema={schema}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				options={{ dafeFormat: 'DD/MM/YYYY' }}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
