import React from 'react';
import { shallow } from 'enzyme';

import IncrementableScrollActionList from './IncrementableScrollActionList.component';

describe('IncrementableScrollActionList', () => {
	it('should render', () => {
		const wrapper = shallow(
			<IncrementableScrollActionList />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
