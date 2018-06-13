import React from 'react';
import { shallow } from 'enzyme';

import IconButton from './IconButton.component';

describe('IconButton', () => {
	it('should render', () => {
		// when
		const wrapper = shallow(<IconButton icon={{}} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
