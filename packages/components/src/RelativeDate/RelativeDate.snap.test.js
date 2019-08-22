import React from 'react';
import { shallow } from 'enzyme';

import RelativeDate from './RelativeDate.component';

jest.mock('date-fns', () => ({
	distanceInWordsToNow: () => 'a year ago',
	format: date => `[${date} formatted with date-fns]`,
}));

describe('RelativeDate', () => {
	const props = {
		date: '2019-08-21 12:00:00',
	};

	afterAll(() => {
		jest.unmock('date-fns');
	});

	it('should render RelativeDate component the simple way', () => {
		// when
		const wrapper = shallow(<RelativeDate {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render RelativeDate component with an icon', () => {
		// when
		const wrapper = shallow(<RelativeDate {...props} withIcon />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
