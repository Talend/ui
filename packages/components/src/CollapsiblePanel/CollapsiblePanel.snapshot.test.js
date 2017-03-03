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


const version1 = {
	label: 'Version 1 94a06b6a3a85bc415add5fdb31dcceebf96b8182',
	bsStyle: 'default',
	tooltipPlacement: 'top',
};
const readOnlyLabel = {
	label: '(Read Only)',
	bsStyle: 'default',
	tooltipPlacement: 'top',
};
const timeStamp = {
	label: '03/02/2017 14:44',
	bsStyle: 'default',
	tooltipPlacement: 'top',
};


const propsCollapsibleSelectablePanel = {
	header: [
		[version1, readOnlyLabel],
		timeStamp,
	],
	content: {
		details: ['21 steps', {
			label: 'by Abdelaziz Maalej test 1 test 2 test 1 test 2',
			bsStyle: 'default',
			tooltipPlacement: 'top',
		}],
		description: 'Lorem ipsum dolor sit amet, consectv eturelit Lorem  adipiscing elit. ' +
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet,' +
		' consectetur adipiscing elit Lorem ipsum dolor sit nsectetur adipiscing elit Lorem ' +
		'ipsum dolor sit amet, consectetur adipiscing elit Lorem dolor sit amet, consectetur' +
		' adipiscing elitipsum dolor sit amet, consectv eturelit Lorem  adipiscing elit. ' +
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet,' +
		' consectetur adipiscing elit Lorem ipsum dolor sit nsectetur adipiscing elit Lorem ' +
		'ipsum dolor sit amet, consectetur adipiscing elit Lorem dolor sit amet, consectetur' +
		' adipiscing elit',
	},
	theme: 'collapsible-selectable-panel',
	onSelect: action('onselect'),
	icon: {
		open: 'talend-plus-circle',
		close: 'talend-caret-down',
	},
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

describe('Collapsible Selectable Panel', () => {
	it('should render CollapsiblePanel with content', () => {
		// when
		const wrapper = renderer.create(<CollapsiblePanel {...propsCollapsibleSelectablePanel} />)
			.toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
	//it('should render CollapsiblePanel without content', () => {
	//	// when
	//	const wrapper = renderer.create(<CollapsiblePanel {...props} content={[]} />).toJSON();
	//
	//	// then
	//	expect(wrapper).toMatchSnapshot();
	//});
});
