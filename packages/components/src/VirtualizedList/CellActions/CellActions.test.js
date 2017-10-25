import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

import CellActions from './CellActions.component';

faker.seed(42);
const actions = [
	{
		id: faker.random.word(),
		label: faker.random.words(),
		icon: 'talend-pencil',
		onClick: jest.fn(),
	},
	{
		id: faker.random.word(),
		displayMode: 'dropdown',
		label: faker.random.words(),
		icon: 'talend-file-o',
		items: [
			{
				label: faker.random.words(),
				onClick: jest.fn(),
			},
			{
				label: faker.random.words(),
				onClick: jest.fn(),
			},
		],
	},
	{
		id: faker.random.word(),
		displayMode: 'splitDropdown',
		label: faker.random.words(),
		onClick: jest.fn(),
		items: [
			{
				label: faker.random.words(),
				onClick: jest.fn(),
			},
			{
				label: faker.random.words(),
				onClick: jest.fn(),
			},
		],
	},
];

describe('CellActions', () => {
	it('should render actions', () => {
		// when
		const wrapper = shallow(<CellActions cellData={actions} />);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});
});
