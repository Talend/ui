import React from 'react';
import { shallow } from 'enzyme';

import HeaderCheckbox from './HeaderCheckbox.component';

describe('Header with checkboxes', () => {
	it('should trigger callback when clicking on toggle all', () => {
		// given
		const props = {
			headerDefault: [],
			onToggleAll: jest.fn(),
		};
		const headerInstance = <HeaderCheckbox {...props} />;

		// when
		const wrapper = shallow(headerInstance);
		const toggleAll = wrapper.find('input');

		toggleAll.at(0).simulate('change');

		// then
		expect(toggleAll.length).toBe(1);
		expect(props.onToggleAll).toBeCalled();
	});
});
