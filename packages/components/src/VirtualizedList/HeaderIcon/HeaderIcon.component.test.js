import React from 'react';
import { shallow } from 'enzyme';

import HeaderIcon from './HeaderIcon.component';

describe('HeaderIcon', () => {
	it('should render the header when there is no sort', () => {
		// given
		const props = {
			columnData: { iconName: 'talend-test' },
			label: 'test',
			sortBy: '',
			dataKey: 'test',
		};
		// when
		const wrapper = shallow(<HeaderIcon {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render unchecked checkbox', () => {
		// given
		const props = {
			columnData: { iconName: 'talend-test' },
			label: 'test',
			sortBy: 'test',
			dataKey: 'test',
			sortDirection: 'DESC',
		};
		// when
		const wrapper = shallow(<HeaderIcon {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
