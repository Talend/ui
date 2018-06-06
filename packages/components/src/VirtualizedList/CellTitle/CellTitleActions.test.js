import React from 'react';
import { shallow } from 'enzyme';
import { CellTitleActionsComponent } from './CellTitleActions.component';
import { cellTitleDisplayModes, listTypes } from '../utils/constants';

const { LARGE } = listTypes;

const simpleActions = [
	{
		id: 'edit',
		label: 'edit',
		'data-feature': 'list.item.edit',
		icon: 'talend-pencil',
		onClick: jest.fn(),
		hideLabel: true,
	},
	{
		id: 'delete',
		label: 'delete',
		'data-feature': 'list.item.delete',
		icon: 'talend-trash',
		onClick: jest.fn(),
		hideLabel: true,
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
				rowData={{ actions: simpleActions }}
			/>,
		);

		// then
		expect(wrapper.find('.main-title-actions-group').getElement()).toMatchSnapshot();
	});

	it('should render a menu containing simple actions', () => {
		// when
		const wrapper = shallow(
			<CellTitleActionsComponent
				{...props}
				displayMode={cellTitleDisplayModes.TITLE_MODE_TEXT}
				rowData={{ actions: simpleActions }}
			/>,
		);

		// then
		expect(wrapper.find('.main-title-actions-group').getElement()).toMatchSnapshot();
	});

	it('should render all actions when the type is LARGE', () => {
		// when
		const wrapper = shallow(
			<CellTitleActionsComponent
				{...props}
				displayMode={cellTitleDisplayModes.TITLE_MODE_TEXT}
				rowData={{ actions: simpleActions }}
				type={LARGE}
			/>,
		);

		// then
		expect(wrapper.find('.main-title-actions-group').getElement()).toMatchSnapshot();
	});

	it('should extract and render each dropdown actions', () => {
		// when
		const wrapper = shallow(
			<CellTitleActionsComponent
				{...props}
				displayMode={cellTitleDisplayModes.TITLE_MODE_TEXT}
				rowData={{ actions: dropdownActions.concat(simpleActions) }}
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
