import React from 'react';
import { shallow } from 'enzyme';

import Error from './Error.component';

describe('DateTime.Validation.Error', () => {
	it('should render', () => {
		// given
		const errors = [{ code: 'INVALID_DATE_FORMAT', message: 'INVALID_DATE_FORMAT' }];

		// when
		const wrapper = shallow(<Error errors={errors} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should hide errors', () => {
		// given
		const errors = [{ code: 'INVALID_DATE_FORMAT', message: 'INVALID_DATE_FORMAT' }];

		// when
		const wrapper = shallow(<Error errors={errors} hidden />);

		// then
		expect(wrapper.prop('className')).toBe('sr-only');
	});
});
