import React from 'react';
import { shallow } from 'enzyme';

import ActionSplitDropdown from './ActionSplitDropdown.component';


const items = [
	{
		label: 'From Local',
		onClick: jest.fn(),
	},
	{
		label: 'From Remote',
		onClick: jest.fn(),
	},
];

describe('ActionSplitDropdown', () => {
	it('should render a button with label', () => {
		// given
		const props = {
			label: 'Add File',
			onClick: jest.fn(),
			items,
		};

		// when
		const wrapper = shallow(<ActionSplitDropdown {...props} />);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render a button with icon and label', () => {
		// given
		const props = {
			label: 'Add File',
			icon: 'fa fa-plus',
			onClick: jest.fn(),
			items,
		};

		// when
		const wrapper = shallow(<ActionSplitDropdown {...props} />);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});


	it('should render items with icons', () => {
		// given
		const props = {
			label: 'Add File',
			icon: 'fa fa-plus',
			onClick: jest.fn(),
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
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render "no option" item when items array is empty', () => {
		// given
		const props = {
			label: 'Add File',
			icon: 'fa fa-plus',
			onClick: jest.fn(),
			items: [],
			emptyDropdownLabel: 'No option',
		};

		// when
		const wrapper = shallow(<ActionSplitDropdown {...props} />);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});
});
