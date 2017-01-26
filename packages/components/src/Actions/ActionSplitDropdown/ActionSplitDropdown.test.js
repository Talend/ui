import React from 'react';
import renderer from 'react-test-renderer';

import ActionSplitDropdown from './ActionSplitDropdown.component';

jest.mock('../../Icon', () => (
	props => (<i name={props.name} />)
));

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
		const wrapper = renderer.create(<ActionSplitDropdown {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
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
		const wrapper = renderer.create(<ActionSplitDropdown {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
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
		const wrapper = renderer.create(<ActionSplitDropdown {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
