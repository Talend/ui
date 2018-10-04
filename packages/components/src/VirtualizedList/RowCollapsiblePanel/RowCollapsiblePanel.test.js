import React from 'react';
import { shallow } from 'enzyme';

import RowCollapsiblePanel from './RowCollapsiblePanel.component';
import VirtualizedList from '../VirtualizedList.component';
import CellTitle from '../CellTitle';

const titleProps = {
	actionsKey: 'titleActions',
	displayModeKey: 'display',
	iconKey: 'icon',
};

const titleActions = [
	{
		label: 'edit',
		icon: 'talend-pencil',
		onClick: jest.fn(),
	},
	{
		label: 'delete',
		icon: 'talend-trash',
		onClick: jest.fn(),
	},
];

const collection = [
	{
		header: [{ displayMode: 'status', actions: [], status: 'successful', label: 'Successful', icon: 'talend-check' }],
		content: [
			{
				label: 'Content1',
				description: 'Description1',
			},
			{
				label: 'Content2',
				description: 'Description2',
			},
		],
		expanded: true,
	},
	{
		header: [{ displayMode: 'status', actions: [], status: 'canceled', label: 'Canceled', icon: 'talend-cross' }],
		content: [
			{
				label: 'Content1',
				description: 'Description1',
			},
			{
				label: 'Content2',
				description: 'Description2',
			},
		],
		expanded: true,
	},
	{
		header: [{ displayMode: 'status', actions: [], status: 'failed', label: 'Failure', icon: 'talend-cross' }],
		content: [
			{
				label: 'Content1',
				description: 'Description1',
			},
			{
				label: 'Content2',
				description: 'Description2',
			},
		],
		expanded: true,
	},
];

const parent = {
	props: {
		id: 'my-list',
		collection,
		rowGetter: index => collection[index],
		children: [],
	},
};

describe('RowCollapsiblePanel', () => {
	it('should render collapsible panel row', () => {
		// when
		const wrapper = shallow(
			<RowCollapsiblePanel
				className={'my-class-names'}
				index={1}
				key={18}
				parent={parent}
				style={{ background: 'red' }}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
