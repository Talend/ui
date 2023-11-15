/* eslint-disable @typescript-eslint/no-shadow */
import { within, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CellTitleActionsComponent } from './CellTitleActions.component';
import { cellTitleDisplayModes, listTypes } from '../utils/constants';

const { LARGE } = listTypes;

const fewSimpleActions = [
	{
		id: 'edit',
		label: 'edit',
		'data-feature': 'list.item.edit',
		icon: 'talend-pencil',
		onClick: jest.fn(),
	},
	{
		id: 'delete',
		label: 'delete',
		'data-feature': 'list.item.delete',
		icon: 'talend-trash',
		onClick: jest.fn(),
	},
	{
		id: 'copy',
		label: 'copy',
		'data-feature': 'list.item.copy',
		icon: 'talend-files-o',
		onClick: jest.fn(),
	},
];

const lotOfSimpleActions = [
	{
		id: 'edit',
		label: 'edit',
		'data-feature': 'list.item.edit',
		icon: 'talend-pencil',
		onClick: jest.fn(),
	},
	{
		id: 'delete',
		label: 'delete',
		'data-feature': 'list.item.delete',
		icon: 'talend-trash',
		onClick: jest.fn(),
	},
	{
		id: 'copy',
		label: 'copy',
		'data-feature': 'list.item.copy',
		icon: 'talend-files-o',
		onClick: jest.fn(),
	},
	{
		id: 'params',
		label: 'edit params',
		'data-feature': 'list.item.params',
		icon: 'talend-cog',
		onClick: jest.fn(),
	},
	{
		id: 'download',
		label: 'download',
		'data-feature': 'list.item.download',
		icon: 'talend-download',
		onClick: jest.fn(),
	},
	{
		available: false,
		id: 'error',
		label: 'This should not be visible',
		'data-feature': 'list.item.error',
		icon: 'talend-cross',
		onClick: jest.fn(),
	},
];

const dropdownActions = [
	{
		id: 'related',
		displayMode: 'dropdown',
		label: 'related items',
		icon: 'talend-folder',
		items: [
			{
				label: 'document 1',
				'data-feature': 'list.item.related',
				onClick: jest.fn(),
			},
			{
				label: 'document 2',
				'data-feature': 'list.item.related',
				onClick: jest.fn(),
			},
		],
		pullRight: true,
	},
];

const persistentActions = [
	{
		label: 'favorite',
		icon: 'talend-star',
		className: 'favorite',
		'data-feature': 'list.item.favorite',
		onClick: jest.fn(),
	},
	{
		label: 'certify',
		icon: 'talend-badge',
		className: 'certify',
		'data-feature': 'list.item.certify',
		onClick: jest.fn(),
	},
];

const arraysActions = [
	[
		{
			id: 'monitoring',
			label: 'monitor something',
			'data-feature': 'list.item.monitor',
			icon: 'talend-line-charts',
			onClick: jest.fn(),
			hideLabel: true,
		},
	],
	fewSimpleActions,
];

const props = {
	id: 'my-actions',
	actionsKey: 'actions',
	persistentActionsKey: 'persistentActions',
	getComponent: () => props => (
		<button data-testid="Action" onClick={props.onClick}>
			{props.label}
		</button>
	),
};

describe('CellTitleActions', () => {
	it('should not render actions in input mode', () => {
		// when
		render(
			<CellTitleActionsComponent
				{...props}
				displayMode={cellTitleDisplayModes.TITLE_MODE_INPUT}
				rowData={{ actions: fewSimpleActions }}
			/>,
		);

		// then
		expect(screen.queryByTestId('Action')).not.toBeInTheDocument();
	});

	it('should display all actions when there are only few (< 4)', () => {
		// when
		render(
			<CellTitleActionsComponent
				{...props}
				displayMode={cellTitleDisplayModes.TITLE_MODE_TEXT}
				rowData={{ actions: fewSimpleActions }}
			/>,
		);

		// then
		expect(screen.getAllByTestId('Action')).toHaveLength(3);
	});

	it('should display 2 actions and the rest in an ellipsis dropdown (>= 4)', () => {
		// when
		render(
			<CellTitleActionsComponent
				{...props}
				displayMode={cellTitleDisplayModes.TITLE_MODE_TEXT}
				rowData={{ actions: lotOfSimpleActions }}
			/>,
		);

		// then
		expect(screen.getAllByTestId('Action')).toHaveLength(3);
		const dd = screen.getByLabelText('Open menu');
		expect(dd).toBeVisible();
		expect(screen.getAllByRole('menuitem')).toHaveLength(2);
	});

	it('should keep definition order of dropdown and simple actions extracted out of the ellipsis dropdown', () => {
		// 1°) simple action then dropdown action
		const actionsSimpleFirst = [fewSimpleActions[0], dropdownActions[0], ...lotOfSimpleActions];

		// when
		const { rerender } = render(
			<CellTitleActionsComponent
				{...props}
				displayMode={cellTitleDisplayModes.TITLE_MODE_TEXT}
				rowData={{ actions: actionsSimpleFirst }}
			/>,
		);

		// then
		expect(screen.getAllByTestId('Action')).toHaveLength(3);
		expect(screen.getAllByTestId('Action')[0]).toHaveTextContent(actionsSimpleFirst[0].label);
		expect(screen.getAllByTestId('Action')[1]).toHaveTextContent(actionsSimpleFirst[1].label);
		expect(screen.getAllByTestId('Action')[2]).toHaveTextContent(actionsSimpleFirst[2].label);

		// 2°) dropdown action then simple action
		const actionsDropdownFirst = [dropdownActions[0], fewSimpleActions[0], ...lotOfSimpleActions];

		// when
		rerender(
			<CellTitleActionsComponent
				{...props}
				displayMode={cellTitleDisplayModes.TITLE_MODE_TEXT}
				rowData={{ actions: actionsDropdownFirst }}
			/>,
		);

		// then
		expect(screen.getAllByTestId('Action')).toHaveLength(3);
		expect(screen.getAllByTestId('Action')[0]).toHaveTextContent(actionsDropdownFirst[0].label);
		expect(screen.getAllByTestId('Action')[1]).toHaveTextContent(actionsDropdownFirst[1].label);
		expect(screen.getAllByTestId('Action')[2]).toHaveTextContent(actionsDropdownFirst[2].label);
	});

	it('should display all actions on LARGE display mode', () => {
		// when
		render(
			<CellTitleActionsComponent
				{...props}
				displayMode={cellTitleDisplayModes.TITLE_MODE_TEXT}
				rowData={{ actions: lotOfSimpleActions }}
				type={LARGE}
			/>,
		);

		// then
		expect(screen.getAllByTestId('Action')).toHaveLength(5);
	});

	it('should render persistent actions', () => {
		// when
		render(
			<CellTitleActionsComponent
				{...props}
				displayMode={cellTitleDisplayModes.TITLE_MODE_TEXT}
				rowData={{ persistentActions }}
			/>,
		);

		// then
		expect(screen.getAllByTestId('Action')).toHaveLength(2);
	});

	it('should stop keydown propagation', async () => {
		const user = userEvent.setup();

		// given
		const onKeyDown = jest.fn();
		render(
			// eslint-disable-next-line jsx-a11y/no-static-element-interactions
			<div onKeyDown={onKeyDown}>
				<CellTitleActionsComponent
					{...props}
					displayMode={cellTitleDisplayModes.TITLE_MODE_TEXT}
					rowData={{ persistentActions }}
				/>
			</div>,
		);

		// when
		screen.getAllByTestId('Action')[0].focus();
		await user.keyboard('a');

		// then
		expect(onKeyDown).not.toHaveBeenCalled();
	});

	it('should render all type of actions', () => {
		// when
		render(
			<CellTitleActionsComponent
				{...props}
				displayMode={cellTitleDisplayModes.TITLE_MODE_TEXT}
				rowData={{ actions: arraysActions, persistentActions }}
			/>,
		);

		// then
		expect(screen.getAllByTestId('Action')).toHaveLength(6);
	});

	it('should render two actions group in separator case', () => {
		// when
		render(
			<CellTitleActionsComponent
				{...props}
				displayMode={cellTitleDisplayModes.TITLE_MODE_TEXT}
				rowData={{ actions: arraysActions }}
				type={LARGE}
			/>,
		);

		// then
		const [group1, group2] = document.querySelectorAll('.tc-actions');
		expect(within(group1).getByTestId('Action')).toBeVisible();
		expect(within(group2).getAllByTestId('Action')).toHaveLength(3);
	});
});
