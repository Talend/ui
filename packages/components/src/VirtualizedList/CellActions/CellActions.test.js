import React from 'react';
import { shallow } from 'enzyme';

import CellActions from './CellActions.component';

const actions = [
	{
		id: 'action-1',
		label: 'Simple action',
		icon: 'talend-pencil',
		onClick: jest.fn(),
	},
	{
		id: 'action-2',
		displayMode: 'dropdown',
		label: 'Dropdown action',
		icon: 'talend-file-o',
		items: [
			{
				label: 'Document 1',
				onClick: jest.fn(),
			},
			{
				label: 'Document 2',
				onClick: jest.fn(),
			},
		],
	},
	{
		id: 'action-3',
		displayMode: 'splitDropdown',
		label: 'Split dropdown action',
		onClick: jest.fn(),
		items: [
			{
				label: 'File 1',
				onClick: jest.fn(),
			},
			{
				label: 'File 2',
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
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
