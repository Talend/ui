import React from 'react';
import { shallow } from 'enzyme';
import TimeZone from './TimeZone.component';

describe('TimeZone', () => {
	it('should render', () => {
		// when
		const wrapper = shallow(<TimeZone timezone="Asia/Beijing" />);

		// then
		expect(wrapper.find('TooltipTrigger').length).toBe(1);
		expect(wrapper.find('Icon').prop('name')).toBe('talend-info-circle');
	});
});
