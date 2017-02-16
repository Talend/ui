import React from 'react';
import { shallow } from 'enzyme';

import Container from './ActionBar.container';

describe('Container ActionBar', () => {
	it('should render', () => {
		const wrapper = shallow(
			<Container />
		);
		expect(wrapper).toMatchSnapshot();
	});
});
