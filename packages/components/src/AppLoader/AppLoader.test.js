import React from 'react';
import { shallow } from 'enzyme';

import { AppLoaderComponent } from './AppLoader.component';

describe('AppLoader', () => {
	it('should render', () => {
		const wrapper = shallow(<AppLoaderComponent />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
