import React from 'react';
import { shallow } from 'enzyme';

import RelativeDate from './RelativeDate.component';

describe('RelativeDate', () => {
	const props = {
		date: '2019-08-21 12:00:00',
	};

	it('should render RelativeDate component the simple way', () => {
		// when
		const wrapper = shallow(<RelativeDate {...props} />);

		// then
		expect(wrapper.dive().getElement()).toMatchSnapshot();
	});

	it('should render RelativeDate component with an icon', () => {
		// when
		const wrapper = shallow(<RelativeDate {...props} withIcon />);

		// then
		expect(wrapper.dive().getElement()).toMatchSnapshot();
	});
});
