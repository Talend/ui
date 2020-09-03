import React from 'react';
import { mount } from 'enzyme';
import BadgeDropdown from './BadgeDropdown.component';

describe('BadgeDropdown', () => {
	it('should render a dropdown', () => {
		// given
		const dropdownProps = {
			id: 'context-dropdown-related-items',
			label: 'Label',
			items: [
				{
					id: 'context-dropdown-item-document-1',
					label: 'document 1',
					'data-feature': 'actiondropdown.items',
					onClick: jest.fn(),
				},
				{
					divider: true,
				},
				{
					id: 'context-dropdown-item-document-2',
					label: 'document 2',
					'data-feature': 'actiondropdown.items',
					onClick: jest.fn(),
				},
			],
		};
		// when
		const wrapper = mount(<BadgeDropdown props={dropdownProps} />);
		// then
		expect(wrapper.html()).toMatchSnapshot();
	});
});
