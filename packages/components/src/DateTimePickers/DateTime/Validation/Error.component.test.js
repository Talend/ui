import React from 'react';
import { mount } from 'enzyme';

import Error from './Error.component';

describe('DateTime.Validation.Error', () => {
	it('should render', () => {
		// given
		const errors = [{ code: 'INVALID_DATE_FORMAT', message: 'INVALID_DATE_FORMAT' }];

		// when
		const wrapper = mount(<Error errors={errors} />);

		// then
		expect(wrapper.find('.sr-only').length).toBe(0);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should hide errors', () => {
		// given
		const errors = [{ code: 'INVALID_DATE_FORMAT', message: 'INVALID_DATE_FORMAT' }];

		// when
		const wrapper = mount(<Error errors={errors} hidden />);

		// then
		expect(wrapper.find('.sr-only').length).toBe(1);
	});
});
