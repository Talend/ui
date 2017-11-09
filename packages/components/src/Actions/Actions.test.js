import React from 'react';
import renderer from 'react-test-renderer';
import faker from 'faker';

import Actions from './Actions.component';

jest.mock('react-dom');

faker.seed(42);
const actions = [
	{
		label: faker.random.word(),
		icon: 'fa fa-asterisk',
		onClick: jest.fn(),
		bsStyle: 'primary',
	},
	{
		label: faker.random.word(),
		icon: 'fa fa-file-excel-o',
		onClick: jest.fn(),
	},
	{
		label: faker.random.word(),
		icon: 'fa fa-star',
		onClick: jest.fn(),
	},
	{
		id: 'dropdown-id',
		displayMode: 'dropdown',
		label: faker.random.word(),
		icon: 'fa fa-file-excel-o',
		items: [
			{
				label: faker.random.word(),
				onClick: jest.fn(),
			},
			{
				label: faker.random.word(),
				onClick: jest.fn(),
			},
		],
	},
	{
		id: 'split-dropdown-id',
		displayMode: 'splitDropdown',
		label: faker.random.word(),
		onClick: jest.fn(),
		items: [
			{
				label: faker.random.word(),
				onClick: jest.fn(),
			},
			{
				label: faker.random.word(),
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
