import React from 'react';
import { shallow } from 'enzyme';

import ListRow from './ListRow.component';

describe('ListRow', () => {
	it('should render its name', () => {
		const wrapper = shallow(<ListRow name="Hello world" />);
		expect(wrapper.containsMatchingElement(<div>Hello world</div>)).toBe(true);
	});
});
