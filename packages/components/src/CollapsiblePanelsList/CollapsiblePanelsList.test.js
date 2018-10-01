import React from 'react';
import { shallow } from 'enzyme';

import CollapsiblePanelsList from './CollapsiblePanelsList.component';

const collapsibleListCollection = [
	{
		header: [
			{
				displayMode: 'status',
				actions: [],
				status: 'successful',
				label: 'Successful',
				icon: 'talend-check',
			},
		],
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
	},
	{
		header: [
			{
				displayMode: 'status',
				actions: [],
				status: 'canceled',
				label: 'Canceled',
				icon: 'talend-cross',
			},
		],
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
	},
	{
		header: [
			{
				displayMode: 'status',
				actions: [],
				status: 'failed',
				label: 'Failure',
				icon: 'talend-cross',
			},
		],
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
	},
];

describe('CollapsiblePanel', () => {
	const props = {
		items: collapsibleListCollection,
	};
	it('should render collapsible panels list', () => {
		const wrapper = shallow(<CollapsiblePanelsList {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
