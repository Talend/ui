import React from 'react';
import { screen, render } from '@testing-library/react';

import CollapsiblePanel from './CollapsiblePanel.component';

jest.unmock('@talend/design-system');

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

const customElement = {
	element: <span className="custom-element">Custom element</span>,
	label: 'Custom',
	tooltipPlacement: 'top',
};

describe('CollapsiblePanel', () => {
	it('should render default with key/value content', () => {
		// when
		render(<CollapsiblePanel {...props} />);

		// then
		expect(screen.getByRole('term')).toHaveTextContent('Content');
		expect(screen.getByRole('definition')).toHaveTextContent('Description3');
	});

	it('should render default with expanded key/value content', () => {
		// when
		render(<CollapsiblePanel {...props} expanded />);

		// then
		expect(screen.getByRole('term')).toHaveTextContent('Content');
		expect(screen.getByRole('definition')).toHaveTextContent('Description3');
	});

	it('should render default without content', () => {
		// when
		render(<CollapsiblePanel {...props} content={null} />);

		// then
		expect(screen.queryByRole('term')).not.toBeInTheDocument();
	});

	it('should render themed with textual content', () => {
		// when
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
				description: 'Lorem ipsum',
			},
			theme: 'descriptive-panel',
			onSelect: jest.fn(),
			onToggle: jest.fn(),
		};
		render(<CollapsiblePanel {...propsDescriptivePanel} />);

		// then
		const content = screen.getByText(propsDescriptivePanel.content.description);
		expect(content).toBeInTheDocument();
		expect(content).toHaveClass('content-description');
	});

	it('should render panel with custom element', () => {
		// when
		const propsPanelWithCustomElement = {
			header: [version1, customElement, timeStamp],
			onSelect: jest.fn(),
			onToggle: jest.fn(),
		};
		render(<CollapsiblePanel {...propsPanelWithCustomElement} />);

		// then
		expect(screen.getByText('Custom element')).toBeInTheDocument();
		expect(screen.getByText('Custom element')).toHaveClass('custom-element');
		expect(screen.queryByText('Custom')).not.toBeInTheDocument();
	});
});
