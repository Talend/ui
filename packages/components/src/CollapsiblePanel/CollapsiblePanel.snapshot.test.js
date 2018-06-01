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
	onSelect: jest.fn(),
	onToggle: jest.fn(),
};

const version1 = {
	label: 'Version 1 Version 1',
	bsStyle: 'default',
	tooltipPlacement: 'top',
};
const readOnlyLabel = {
	label: '(Read Only)',
	bsStyle: 'default',
	tooltipPlacement: 'top',
};
const timeStamp = {
	label: '03/02/2017 14:44:55',
	bsStyle: 'default',
	tooltipPlacement: 'top',
};

const propsDescriptivePanel = {
	header: [[version1, readOnlyLabel], timeStamp],
	content: {
		head: [
			{
				label: '21 step',
				bsStyle: 'default',
				tooltipPlacement: 'top',
			},
			{
				label: 'by Abdelaziz Maalej test 1 test 2 test 1 test 2',
				bsStyle: 'default',
				tooltipPlacement: 'top',
				className: 'text-right',
			},
		],
		description: `Lorem ipsum dolor sit amet, consectv eturelit Lorem  adipiscing elit.
		Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet,
		 consectetur adipiscing elit Lorem ipsum dolor sit nsectetur adipiscing elit Lorem
		ipsum dolor sit amet, consectetur adipiscing elit Lorem dolor sit amet, consectetur
		 adipiscing elitipsum dolor sit amet, consectv eturelit Lorem  adipis decing elit.
		Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet,
		 consectetur adipiscing elit Lorem ipsum dolor sit nsectetur adipiscing elit Lorem
		ipsum dolor sit amet, consectetur adipiscing elit Lorem dolor sit amet, consectetur
		 adipiscing elit`,
	},
	theme: 'descriptive-panel',
	onSelect: jest.fn(),
	onToggle: jest.fn(),
};

const propsDescriptivePanelWithoutContent = {
	header: [[version1, readOnlyLabel], timeStamp],
	onSelect: jest.fn(),
	onToggle: jest.fn(),
	selected: true,
};

describe('CollapsiblePanel', () => {
	it('should render default with key/value content', () => {
		// when
		const wrapper = renderer.create(<CollapsiblePanel {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render default with expanded key/value content', () => {
		// when
		const wrapper = renderer.create(<CollapsiblePanel {...props} expanded />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render default without content', () => {
		// when
		const wrapper = renderer.create(<CollapsiblePanel {...props} content={null} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render themed with textual content', () => {
		// when
		const wrapper = renderer.create(<CollapsiblePanel {...propsDescriptivePanel} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render themed without textual content', () => {
		// when
		const wrapper = renderer
			.create(<CollapsiblePanel {...propsDescriptivePanelWithoutContent} content={null} />)
			.toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
