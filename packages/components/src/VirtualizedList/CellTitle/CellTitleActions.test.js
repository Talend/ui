import React from 'react';
import { shallow } from 'enzyme';
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

const lotsOfDropdownActions = dropdownActions.concat([
	{
		id: 'open-with-tfd',
		displayMode: 'dropdown',
		label: 'Open with Streams',
		icon: 'talend-datastreams-colored',
		items: [
			{
				label: 'Stream 1',
				onClick: jest.fn(),
			},
			{
				label: 'Stream 2',
				onClick: jest.fn(),
			},
		],
	},
	{
		id: 'open-with-tdp',
		displayMode: 'dropdown',
		label: 'Open with Data Preparation',
		icon: 'talend-tdp-colored',
		items: [
			{
				label: 'Prep 1',
				onClick: jest.fn(),
			},
		],
	},
]);

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
	getComponent: jest.fn(),
};

describe('CellTitleActions', () => {
	it('should not render actions in input mode', () => {
		// when
		const wrapper = shallow(
			<CellTitleActionsComponent
				{...props}
				displayMode={cellTitleDisplayModes.TITLE_MODE_INPUT}
				rowData={{ actions: fewSimpleActions }}
			/>,
		);

		// then
		expect(wrapper.find('.main-title-actions-group').length).toBe(0);
	});

	it('should display all actions when there are only few (< 4)', () => {
		// when
		const wrapper = shallow(
			<CellTitleActionsComponent
				{...props}
				displayMode={cellTitleDisplayModes.TITLE_MODE_TEXT}
				rowData={{ actions: fewSimpleActions }}
			/>,
		);

		// then
		expect(wrapper.find('.main-title-actions-group').getElement()).toMatchSnapshot();
	});

	it('should display 2 actions and the rest in an ellipsis dropdown (>= 4)', () => {
		// when
		const wrapper = shallow(
			<CellTitleActionsComponent
				{...props}
				displayMode={cellTitleDisplayModes.TITLE_MODE_TEXT}
				rowData={{ actions: lotOfSimpleActions }}
			/>,
		);

		// then
		expect(wrapper.find('.main-title-actions-group').getElement()).toMatchSnapshot();
	});

	it('should extract dropdown actions, completed with simple actions, to display out of ellipsis dropdown', () => {
		// when
		const wrapper = shallow(
			<CellTitleActionsComponent
				{...props}
				displayMode={cellTitleDisplayModes.TITLE_MODE_TEXT}
				rowData={{ actions: lotOfSimpleActions.concat(dropdownActions) }}
			/>,
		);

		// then
		expect(wrapper.find('.main-title-actions-group').getElement()).toMatchSnapshot();
	});

	it('should extract only dropdown actions, when there are lot of them', () => {
		// when
		const wrapper = shallow(
			<CellTitleActionsComponent
				{...props}
				displayMode={cellTitleDisplayModes.TITLE_MODE_TEXT}
				rowData={{ actions: lotOfSimpleActions.concat(lotsOfDropdownActions) }}
			/>,
		);

		// then
		expect(wrapper.find('.main-title-actions-group').getElement()).toMatchSnapshot();
	});

	it('should keep definition order of dropdown and simple actions extracted out of the ellipsis dropdown', () => {
		// 1°) simple action then dropdown action
		const actionsSimpleFirst = [fewSimpleActions[0], dropdownActions[0], ...lotOfSimpleActions];

		// when
		const wrapperSimpleFirst = shallow(
			<CellTitleActionsComponent
				{...props}
				displayMode={cellTitleDisplayModes.TITLE_MODE_TEXT}
				rowData={{ actions: actionsSimpleFirst }}
			/>,
		);

		// then
		expect(
			wrapperSimpleFirst
				.find('.cell-title-actions')
				.childAt(1)
				.props().displayMode,
		).toEqual('dropdown');

		// -------------

		// 2°) dropdown action then simple action
		const actionsDropdownFirst = [dropdownActions[0], fewSimpleActions[0], ...lotOfSimpleActions];

		// when
		const wrapperDropdownFirst = shallow(
			<CellTitleActionsComponent
				{...props}
				displayMode={cellTitleDisplayModes.TITLE_MODE_TEXT}
				rowData={{ actions: actionsDropdownFirst }}
			/>,
		);

		// then
		expect(
			wrapperDropdownFirst
				.find('.cell-title-actions')
				.childAt(0)
				.props().displayMode,
		).toEqual('dropdown');
	});

	it('should display all actions on LARGE display mode', () => {
		// when
		const wrapper = shallow(
			<CellTitleActionsComponent
				{...props}
				displayMode={cellTitleDisplayModes.TITLE_MODE_TEXT}
				rowData={{ actions: lotOfSimpleActions }}
				type={LARGE}
			/>,
		);

		// then
		expect(wrapper.find('.main-title-actions-group').getElement()).toMatchSnapshot();
	});

	it('should render persistent actions', () => {
		// when
		const wrapper = shallow(
			<CellTitleActionsComponent
				{...props}
				displayMode={cellTitleDisplayModes.TITLE_MODE_TEXT}
				rowData={{ persistentActions }}
			/>,
		);

		// then
		expect(wrapper.find('.main-title-actions-group').getElement()).toMatchSnapshot();
	});

	it('should stop keydown propagation', () => {
		// given
		const wrapper = shallow(
			<CellTitleActionsComponent
				{...props}
				displayMode={cellTitleDisplayModes.TITLE_MODE_TEXT}
				rowData={{ persistentActions }}
			/>,
		);

		const event = { stopPropagation: jest.fn() };

		// when
		wrapper.simulate('keydown', event);

		// then
		expect(event.stopPropagation).toBeCalled();
	});

	it('should render all type of actions', () => {
		// when
		const wrapper = shallow(
			<CellTitleActionsComponent
				{...props}
				displayMode={cellTitleDisplayModes.TITLE_MODE_TEXT}
				rowData={{ actions: arraysActions, persistentActions }}
			/>,
		);

		// then
		expect(wrapper.find('.main-title-actions-group').getElement()).toMatchSnapshot();
	});

	it('should render two actions group in separator case', () => {
		// when
		const wrapper = shallow(
			<CellTitleActionsComponent
				{...props}
				displayMode={cellTitleDisplayModes.TITLE_MODE_TEXT}
				rowData={{ actions: arraysActions }}
				type={LARGE}
			/>,
		);

		// then
		expect(wrapper.find('.cell-title-actions').length).toBe(2);
	});
});
