import React from 'react';
import { shallow, mount } from 'enzyme';

import ActionSplitDropdown from './ActionSplitDropdown.component';

const items = [
	{
		label: 'From Local',
		onClick: jest.fn(),
		'data-feature': 'action.local',
	},
	{
		label: 'From Remote',
		onClick: jest.fn(),
		'data-feature': 'action.remote',
	},
];

describe('ActionSplitDropdown', () => {
	it('should render a button with label', () => {
		// given
		const props = {
			label: 'Add File',
			onClick: jest.fn(),
			'data-feature': 'action.add',
			items,
		};

		// when
		const wrapper = shallow(<ActionSplitDropdown {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render a button with icon and label', () => {
		// given
		const props = {
			label: 'Add File',
			icon: 'fa fa-plus',
			onClick: jest.fn(),
			'data-feature': 'action.add',
			items,
		};

		// when
		const wrapper = shallow(<ActionSplitDropdown {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render items with icons', () => {
		// given
		const props = {
			label: 'Add File',
			icon: 'fa fa-plus',
			onClick: jest.fn(),
			'data-feature': 'action.add',
			items: [
				{
					label: 'From Local',
					onClick: jest.fn(),
					icon: 'fa fa-plus',
				},
				{
					label: 'From Remote',
					onClick: jest.fn(),
					icon: 'fa fa-plus',
				},
			],
		};

		// when
		const wrapper = shallow(<ActionSplitDropdown {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render "no option" item when items array is empty', () => {
		// given
		const props = {
			label: 'Add File',
			icon: 'fa fa-plus',
			onClick: jest.fn(),
			'data-feature': 'action.add',
			items: [],
			emptyDropdownLabel: 'No option',
		};

		// when
		const wrapper = shallow(<ActionSplitDropdown {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render trigger event', () => {
		// given
		const onItemClick = jest.fn();
		const props = {
			label: 'Add File',
			icon: 'fa fa-plus',
			items: [
				{
					id: 'item1',
					label: 'Item 1',
					onClick: onItemClick,
					model: 'model',
				},
				{
					id: 'item2',
					label: 'Item 2',
					onClick: onItemClick,
					model: 'model',
				},
			],
		};

		// when
		const actionSplitDropdownInstance = mount(<ActionSplitDropdown {...props} />);
		const menuItems = actionSplitDropdownInstance.find('MenuItem');

		menuItems
			.at(0)
			.find('SafeAnchor')
			.simulate('click');

		// then
		expect(onItemClick.mock.calls[0][1]).toEqual({
			action: { id: 'item1', label: 'Item 1' },
			model: 'model',
		});
		expect(onItemClick.mock.calls[0][0].type).toBe('click');

		// when
		menuItems
			.at(1)
			.find('SafeAnchor')
			.simulate('click');

		// then
		expect(onItemClick.mock.calls[1][1]).toEqual({
			action: { id: 'item2', label: 'Item 2' },
			model: 'model',
		});
		expect(onItemClick.mock.calls[1][0].type).toBe('click');
	});
});
