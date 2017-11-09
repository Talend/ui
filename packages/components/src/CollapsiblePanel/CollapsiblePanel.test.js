import React from 'react';
import { Button } from 'react-bootstrap';
import { mount } from 'enzyme';
import faker from 'faker';

import CollapsiblePanel from './CollapsiblePanel.component';

faker.seed(42);
const version1 = {
	label: faker.random.word(),
	bsStyle: 'default',
	tooltipPlacement: 'top',
};
const readOnlyLabel = {
	label: '(Read Only)',
	bsStyle: 'default',
	tooltipPlacement: 'top',
};
const timeStamp = {
	label: faker.random.word(),
	bsStyle: 'default',
	tooltipPlacement: 'top',
};

const propsDescriptivePanel = {
	header: [[version1, readOnlyLabel], timeStamp],
	content: {
		head: [
			{
				label: faker.random.word(),
				bsStyle: 'default',
				tooltipPlacement: 'top',
			},
			{
				label: faker.lorem.sentence(10),
				bsStyle: 'default',
				tooltipPlacement: 'top',
			},
		],
		description: faker.lorem.text(),
	},
	theme: 'descriptive-panel',
	onSelect: jest.fn(),
};

const propsPanelWithActions = {
	header: [{ actions: [], status: 'successful', label: 'Successful', icon: 'talend-check' }],
	content: [
		{
			label: faker.random.word(),
			description: faker.random.word(),
		},
		{
			label: faker.random.word(),
			description: faker.random.word(),
		},
	],
	onToggle: jest.fn(),
};

describe('CollapsiblePanel', () => {
	it('should trigger onSelect callback on header click', () => {
		// given
		const panelInstance = <CollapsiblePanel {...propsDescriptivePanel} />;

		// when
		const wrapper = mount(panelInstance);
		wrapper
			.find(Button)
			.at(0)
			.simulate('click');

		// then
		expect(propsDescriptivePanel.onSelect).toBeCalled();
	});

	it('should trigger onToggle callback on header click', () => {
		// given
		const panelInstance = <CollapsiblePanel {...propsPanelWithActions} />;

		// when
		const wrapper = mount(panelInstance);
		wrapper
			.find(Button)
			.at(0)
			.simulate('click');

		// then
		expect(propsPanelWithActions.onToggle).toBeCalled();
	});
});
