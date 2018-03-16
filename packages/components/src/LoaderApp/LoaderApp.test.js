import React from 'react';
import { shallow } from 'enzyme';

import LoaderApp from './LoaderApp.component';

describe('LoaderApp', () => {
	it('should render', () => {
		const wrapper = shallow(
			<LoaderApp />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
