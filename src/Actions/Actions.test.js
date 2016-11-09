import React from 'react';
import renderer from 'react-test-renderer';

import Actions from './Actions.component';

jest.mock('react-dom');

const actions = [
	{
		type: 'action',
		label: 'Preparations',
		icon: 'fa fa-asterisk',
		onClick: jest.fn(),
		bsStyle: 'primary',
	},
	{
		type: 'action',
		label: 'Datasets',
		icon: 'fa fa-file-excel-o',
		onClick: jest.fn(),
	},
	{
		type: 'action',
		label: 'Favorites',
		icon: 'fa fa-star',
		onClick: jest.fn(),
	},
	{
		id: 'dropdown-id',
		type: 'dropdown',
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
		const wrapper = renderer.create(<Actions {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render actions with hidden labels and tooltips', () => {
		// given
		const props = {
			actions,
			hideLabel: true,
			link: false,
		};

		// when
		const wrapper = renderer.create(<Actions {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render actions with "link" theme', () => {
		// given
		const props = {
			actions,
			hideLabel: false,
			link: true,
		};

		// when
		const wrapper = renderer.create(<Actions {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
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
		const wrapper = renderer.create(<Actions {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
