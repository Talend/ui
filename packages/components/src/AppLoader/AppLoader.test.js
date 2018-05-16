import React from 'react';
import { shallow } from 'enzyme';

import AppLoader from './AppLoader.component';

describe('AppLoader', () => {
	it('should render', () => {
		const wrapper = shallow(<AppLoader />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
