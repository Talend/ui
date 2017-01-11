import React from 'react';
import renderer from 'react-test-renderer';

import CollapsiblePanel from './CollapsiblePanel.component';

jest.mock('react-dom');

const props = {

	header: [
		{
			displayMode: 'status',
			status: 'inProgress',
			label: 'inProgress',
			icon: 'fa fa-check',
			actions: [
				{
					label: 'cancel',
					icon: 'fa fa-cancel',
					onClick: jest.fn(),
				},
				{
					label: 'delete',
					icon: 'fa fa-delete',
					onClick: jest.fn(),
				},
			],
		},
		{
			displayMode: 'action',
			label: 'edit',
			icon: 'fa fa-edit',
			onClick: jest.fn(),
			tooltipPlacement: 'right',
			hideLabel: true,
			link: true,
		},
		{
			label: 'by Charles',
			bsStyle: 'default',
			tooltipPlacement: 'top',
		},
		[
			{
				label: 'on TDP',
				bsStyle: 'default',
				tooltipPlacement: 'top',
			},
			{
				displayMode: 'badge',
				label: 'XML',
				bsStyle: 'default',
				tooltipPlacement: 'top',
			},
		],
	],
	content: [
		{
			label: 'Content',
			description: 'Description3',
		},
	],
};

describe('CollapsiblePanel', () => {
	it('should render CollapsiblePanel with content', () => {
		// when
		const wrapper = renderer.create(<CollapsiblePanel {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
	it('should render CollapsiblePanel without content', () => {
		// when
		const wrapper = renderer.create(<CollapsiblePanel {...props} content={[]} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
