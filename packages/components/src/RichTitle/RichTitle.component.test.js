import React from 'react';
import { mount } from 'enzyme';

import RichTitle from './RichTitle.component';

describe('RichTitle', () => {
	it('should render with a title and actions', () => {
		const wrapper = mount(<RichTitle title="" right={[]} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
