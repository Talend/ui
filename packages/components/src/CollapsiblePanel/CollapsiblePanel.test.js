import React from 'react';
import { Button } from 'react-bootstrap';
import { mount } from 'enzyme';

import CollapsiblePanel from './CollapsiblePanel.component';

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

const propsDescriptivePanel = {
	header: [
		[version1, readOnlyLabel],
		timeStamp,
	],
	content: {
		title: [
			{
				label: 'by Abdelaziz Maalej test 1 test 2 test 1 test 2',
				bsStyle: 'default',
				tooltipPlacement: 'top',
			}, {
				label: 'by Abdelaziz Maalej test 1 test 2 test 1 test 2',
				bsStyle: 'default',
				tooltipPlacement: 'top',
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
};

const propsPanelWithActions = {
	header: [
		{ actions: [], status: 'successful', label: 'Successful', icon: 'talend-check' },
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
	onToggle: jest.fn(),
};

describe('CollapsiblePanel', () => {
	it('should trigger onSelect callback on header click', () => {
		// given
		const panelInstance = (<CollapsiblePanel {...propsDescriptivePanel} />);

		// when
		const wrapper = mount(panelInstance);
		wrapper.find(Button).at(0).simulate('click');

		// then
		expect(propsDescriptivePanel.onSelect).toBeCalled();
	});

	it('should trigger onToggle callback on header click', () => {
		// given
		const panelInstance = (<CollapsiblePanel {...propsPanelWithActions} />);

		// when
		const wrapper = mount(panelInstance);
		wrapper.find(Button).at(0).simulate('click');

		// then
		expect(propsPanelWithActions.onToggle).toBeCalled();
	});
});
