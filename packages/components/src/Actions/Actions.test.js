import React from 'react';
import { shallow } from 'enzyme';

import Actions from './Actions.component';

const actions = [
	{
		label: 'Preparations',
		icon: 'fa fa-asterisk',
		onClick: jest.fn(),
		bsStyle: 'primary',
	},
	{
		label: 'Datasets',
		icon: 'fa fa-file-excel-o',
		onClick: jest.fn(),
	},
	{
		label: 'Favorites',
		icon: 'fa fa-star',
		onClick: jest.fn(),
	},
	{
		id: 'dropdown-id',
		displayMode: 'dropdown',
		label: 'related items',
		icon: 'fa fa-file-excel-o',
		items: [
			{
				label: 'document 1',
				onClick: jest.fn(),
			},
			{
				label: 'document 2',
				onClick: jest.fn(),
			},
		],
	},
	{
		id: 'split-dropdown-id',
		displayMode: 'splitDropdown',
		label: 'add file',
		onClick: jest.fn(),
		items: [
			{
				label: 'file 1',
				onClick: jest.fn(),
			},
			{
				label: 'file 2',
				onClick: jest.fn(),
			},
		],
	},
];

describe('Actions', () => {
	it('should render actions', () => {
		// given
		const props = {
			actions,
			hideLabel: false,
			link: false,
		};

		// when
		const wrapper = shallow(<Actions {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render actions with hidden labels and tooltips', () => {
		// given
		const props = {
			actions,
			hideLabel: true,
			link: false,
		};

		// when
		const wrapper = shallow(<Actions {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render actions with "link" theme', () => {
		// given
		const props = {
			actions,
			hideLabel: false,
			link: true,
		};

		// when
		const wrapper = shallow(<Actions {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render actions with defined tooltip placement', () => {
		// given
		const props = {
			actions,
			hideLabel: true,
			link: true,
			tooltipPlacement: 'right',
		};

		// when
		const wrapper = shallow(<Actions {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
