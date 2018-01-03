import React from 'react';
import { shallow } from 'enzyme';

import Inject from './Inject.component';

describe('Inject', () => {
	it('should render', () => {
		const wrapper = shallow(
			<Inject />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
