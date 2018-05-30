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

const props = {
	id: 'my-actions',
	actionsKey: 'actions',
	persistentActionsKey: 'persistentActions',
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
});
