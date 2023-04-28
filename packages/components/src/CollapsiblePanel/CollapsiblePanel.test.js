import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
	label: '03/02/2017 14:44:55',
	bsStyle: 'default',
	tooltipPlacement: 'top',
};

const propsPanelWithActions = {
	header: [{ actions: [], status: 'successful', label: 'Successful', icon: 'talend-check' }],
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
					},
				],
				description: 'Lorem ipsum dolor',
			},
			theme: 'descriptive-panel',
			onSelect: jest.fn(),
		};

		const panelInstance = <CollapsiblePanel {...propsDescriptivePanel} />;

		// when
		render(panelInstance);
		userEvent.click(screen.getByText('Version 1 94a06b6a3a85bc415add5fdb31dcceebf96b8182'));

		// then
		expect(propsDescriptivePanel.onSelect).toBeCalled();
	});

	it('should trigger onToggle callback on header click', () => {
		// given
		const panelInstance = <CollapsiblePanel {...propsPanelWithActions} />;

		// when
		render(panelInstance);
		userEvent.click(screen.getByText('Successful'));

		// then
		expect(propsPanelWithActions.onToggle).toBeCalled();
	});

	it('should render custom content in panel body', () => {
		// given
		const propsPanelWithCustomContent = {
			header: [{ actions: [], status: 'successful', label: 'Successful', icon: 'talend-check' }],
			onToggle: jest.fn(),
		};
		const customContent = <h2>custom title</h2>;
		const panelInstance = (
			<CollapsiblePanel {...propsPanelWithCustomContent}>{customContent}</CollapsiblePanel>
		);
		// when
		render(panelInstance);

		// then
		expect(screen.getByText('custom title')).toBeVisible();
	});

	it('should render custom element in panel header', async () => {
		// given
		const customElement = <h3>Custom label</h3>;
		const propsPanelWithCustomElement = {
			...propsPanelWithActions,
			header: [
				{
					element: customElement,
					label: 'Custom',
					tooltipLabel: 'Tooltip label',
					className: 'custom-col',
				},
				...propsPanelWithActions.header,
			],
		};

		const panelInstance = <CollapsiblePanel {...propsPanelWithCustomElement} />;
		// when
		render(panelInstance);

		// then
		expect(screen.getByText('Custom label')).toBeVisible();
	});
});
