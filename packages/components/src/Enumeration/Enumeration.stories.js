import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Enumeration from './Enumeration.component';

import theme from './Enumeration.stories.scss';

const addItemAction = {
	label: 'Add item',
	icon: 'talend-plus',
	id: 'add',
	onClick: action('header.onAdd'),
};

const loadingAction = {
	label: 'loading',
	icon: 'talend-cross',
	inProgress: true,
	id: 'loading',
};

const searchAction = {
	disabled: false,
	label: 'search',
	icon: 'talend-search',
	id: 'search',
};

const importAction = {
	disabled: false,
	label: 'import',
	icon: 'talend-download',
	id: 'upload',
	displayMode: 'dropdown',
	items: [
		{
			label: 'add',
			id: 'append-uploding',
		},
		{
			label: 'overwrite',
			id: 'append-uploding',
		},
	],
};

const deleteItemAction = {
	label: 'Remove selected values',
	icon: 'talend-trash',
	id: 'del',
	onClick: action('headerSelected.deleteAll'),
};

const validateAction = {
	disabled: false,
	label: 'Validate',
	icon: 'talend-check',
	id: 'validate',
	onClick: action('headerInput.onValidate'),
};

const abortAction = {
	label: 'Abort',
	icon: 'talend-cross',
	id: 'abort',
	onClick: action('headerInput.onAbort'),
};

const ITEM_DEFAULT_HEIGHT = 33;

const items = [];
for (let i = 0; i < 1000; i += 1) {
	items.push({ values: [`Lorem ipsum dolor sit amet ${i}`] });
}

const props = {
	required: true,
	displayMode: 'DISPLAY_MODE_DEFAULT',
	headerDefault: [addItemAction, loadingAction, importAction],
	headerSelected: [deleteItemAction],
	headerInput: [validateAction, abortAction],
	items,
	itemsProp: {
		key: 'values',
		onSubmitItem: action('itemEdit.onSubmit'),
		onItemChange: action('itemEdit.onItemchange'),
		onAbortItem: action('itemEdit.onCancel'),
		onSelectItem: action('itemEdit.onSelect'),
		getItemHeight: () => ITEM_DEFAULT_HEIGHT,
		onLoadData: action('items.onLoadData'),
		actionsDefault: [
			{
				disabled: false,
				label: 'Edit',
				icon: 'talend-pencil',
				id: 'edit',
				onClick: action('item.onEnterEditMode'),
			},
			{
				label: 'Remove value',
				icon: 'talend-trash',
				id: 'delete',
				onClick: action('item.onDelete'),
			},
		],
		actionsEdit: [
			{
				disabled: false,
				label: 'Validate',
				icon: 'talend-check',
				id: 'validate',
				onClick: action('itemEdit.onSubmit'),
			},
			{
				label: 'Abort',
				icon: 'talend-cross',
				id: 'abort',
				onClick: action('itemEdit.onCancel'),
			},
			{
				label: 'Delete',
				icon: 'talend-trash',
				id: 'abort',
				onClick: action('itemEdit.onDelete'),
			},
		],
	},
	onAddChange: action('onAddChange'),
	onAddKeyDown: action('onAddKeyDown'),
};

const defaultEmptyListProps = { ...props, items: [] };

const searchModeEmptyListProps = { ...defaultEmptyListProps, displayMode: 'DISPLAY_MODE_SEARCH' };

const dropDownActionsProps = {
	...props,
	headerDefault: [
		{
			...props.headerDefault[0],
			displayMode: 'dropdown',
			items: [
				{
					label: 'Add values from a file',
					id: 'add-value',
					onClick: action('add values'),
				},
				{
					label: 'Overwrite existing values',
					id: 'append-uploding',
					onClick: action('overwrite'),
				},
			],
		},
	],
};

const addProps = {
	...props,
	displayMode: 'DISPLAY_MODE_ADD',
};
const editItemProps = {
	...props,
	displayMode: 'DISPLAY_MODE_DEFAULT',
	currentEdit: {
		validate: {
			disabled: false,
		},
	},
};
const selectedValuesProps = {
	...props,
	displayMode: 'DISPLAY_MODE_SELECTED',
};
const searchProps = {
	...props,
	displayMode: 'DISPLAY_MODE_SEARCH',
	searchCriteria: 'lorem',
};

// custom edit props
editItemProps.items = Array(100000)
	.fill('')
	.map((item, index) => ({
		values: [`Lorem ipsum dolor sit amet ${index}`],
	}));
editItemProps.items[0] = {
	values: ['Lorem ipsum dolor sit amet 0'],
	displayMode: 'DISPLAY_MODE_EDIT',
};

// custom selected props
selectedValuesProps.items = Array(50)
	.fill('')
	.map((item, index) => ({
		values: [`Lorem ipsum dolor sit amet ${index}`],
		isSelected: index % 2 === 0,
	}));

const selectedValuesCheckboxesProps = {
	...selectedValuesProps,
	showCheckboxes: true,
};

const headerErrorProps = {
	...props,
	displayMode: 'DISPLAY_MODE_ADD',
};
headerErrorProps.headerError = 'an error occured';

const editItemPropsWithError = {
	...props,
	displayMode: 'DISPLAY_MODE_DEFAULT',
	currentEdit: {
		validate: {
			disabled: false,
		},
	},
};
// custom edit props
editItemPropsWithError.items = Array(50)
	.fill('')
	.map((item, index) => ({
		values: [`Lorem ipsum dolor sit amet ${index}`],
	}));
editItemPropsWithError.items[0] = {
	values: ['Lorem ipsum dolor sit amet 0'],
	displayMode: 'DISPLAY_MODE_EDIT',
	error: 'an error occured',
};

const customLabelProps = {
	...props,
	label: 'Users',
};

const headerDisabled = {
	...props,
	headerDefault: [
		{ ...addItemAction, disabled: true },
		{ ...importAction, disabled: true },
		{ ...searchAction },
	],
};
headerDisabled.itemsProp.actionsDefault[0].disabled = true;
headerDisabled.itemsProp.actionsDefault[1].disabled = true;

const withIconProps = {
	...props,
	items: [
		{
			icon: {
				name: 'talend-warning',
				title: 'A warning',
			},
			values: ['An item with an icon appended'],
		},
		{
			icon: {
				name: 'talend-world',
				title: 'The world',
			},
			values: ['An item with a world appended'],
		},
	],
};

const withClassProps = {
	...props,
	className: theme['enum-with-class'],
	items: [
		{
			values: ['User 1'],
		},
		{
			icon: {
				name: 'talend-warning',
				title: 'Inactive user',
			},
			className: theme.inactive,
			values: ['User 2'],
		},
		{
			values: ['User 3'],
		},
	],
};

const withCustomActions = {
	...props,
	itemsProp: {
		...props.itemsProp,
		actionsDefault: item => {
			if (item.index % 2 === 0) {
				return [
					{
						label: 'Remove value',
						icon: 'talend-trash',
						id: 'delete',
						onClick: action('item.onDelete'),
					},
				];
			}
			return [
				{
					label: 'Action with popover',
					icon: 'talend-bell',
					id: 'notify',
					overlayComponent: <p>I'm an overlay!</p>,
					overlayPlacement: 'left',
					onClick: action('item.onNotify'),
				},
				{
					disabled: false,
					label: 'Edit',
					icon: 'talend-pencil',
					id: 'edit',
					onClick: action('item.onEnterEditMode'),
				},
			];
		},
		actionsDefaultPersistent: item => {
			if (item.index % 2 === 0) {
				return [
					{
						label: 'Added notification',
						icon: 'talend-bell',
						id: 'notification',
						onClick: action('item.onNotify'),
					},
				];
			}
			return [];
		}
	},
};

storiesOf('Form/Controls/Enumeration', module)
	.add('default', () => (
		<div>
			<p>By default :</p>

			<Enumeration {...props} />
		</div>
	))
	.add('default header action disabled', () => (
		<div>
			<p>By default :</p>

			<Enumeration {...headerDisabled} />
		</div>
	))
	.add('default - empty list', () => (
		<div>
			<p>Empty list by default:</p>

			<Enumeration {...defaultEmptyListProps} />
		</div>
	))
	.add('default with dropdown', () => (
		<div>
			<p>By default :</p>

			<Enumeration {...dropDownActionsProps} />
		</div>
	))
	.add('add', () => (
		<div>
			<p>By default :</p>

			<Enumeration {...addProps} />
		</div>
	))
	.add('edit mode', () => (
		<div>
			<p>By default :</p>

			<Enumeration {...editItemProps} />
		</div>
	))
	.add('search mode', () => (
		<div>
			<p>By default :</p>

			<Enumeration {...searchProps} />
		</div>
	))
	.add('search mode - empty list', () => (
		<div>
			<p>empty list in search mode :</p>

			<Enumeration {...searchModeEmptyListProps} />
		</div>
	))
	.add('selected values', () => (
		<div>
			<p>By default :</p>

			<Enumeration {...selectedValuesProps} />
		</div>
	))
	.add('selected values with checkboxes', () => (
		<div>
			<p>By default :</p>

			<form>
				<Enumeration {...selectedValuesCheckboxesProps} />
			</form>
		</div>
	))
	.add('with header error', () => (
		<div>
			<p>By default :</p>

			<Enumeration {...headerErrorProps} />
		</div>
	))
	.add('with item in error', () => (
		<div>
			<p>By default :</p>

			<Enumeration {...editItemPropsWithError} />
		</div>
	))
	.add('with custom label', () => (
		<div>
			<p>Should be 'Users' instead of 'Values'</p>

			<Enumeration {...customLabelProps} />
		</div>
	))
	.add('with icon', () => (
		<div>
			<p>By default: </p>

			<Enumeration {...withIconProps} />
		</div>
	))
	.add('with custom class for row', () => (
		<div>
			<p>With custom class on second row: </p>

			<Enumeration {...withClassProps} />
		</div>
	))
	.add('with dynamic height', () => (
		<div>
			<p>With dynamic height: </p>

			<EnumerationDynamicHeight />
		</div>
	))
	.add('with custom actions', () => (
		<div>
			<p>
				With custom actions: <br />
				You can pass a function to{' '}
				<i>
					<b>itemsProp.actionsDefaultPersistent</b>
				</i>{' '}
				or{' '}
				<i>
					<b>itemsProp.actionsDefault</b>
				</i>{' '}
				or{' '}
				<i>
					<b>itemsProp.actionsEdit</b>
				</i>
				<br />
				The function takes a single argument, item data(including index). returns an array of
				actions. 
				<br />
				actionsDefaultPersistent will always be visiable in default mode whereas actionsDefault will appear on hover.
			</p>

			<Enumeration {...withCustomActions} />
		</div>
	));

const EnumerationDynamicHeight = () => {
	const [list, setList] = useState([]);
	const ROW_HEIGHT = 30;
	const enumerationProps = {
		displayMode: 'DISPLAY_MODE_ADD',
		inputPlaceholder: 'New entry',
		headerDefault: [],
		headerInput: [
			{
				label: 'Validate',
				icon: 'talend-check',
				id: 'validate',
				onClick: (_, input) => {
					const tmp = [...list];
					tmp.push({ values: [input.value] });
					setList(tmp);
				},
			},
			{
				label: 'Abort',
				icon: 'talend-cross',
				id: 'abort',
				onClick: () => {
					const tmp = [...list];
					tmp.pop();
					setList(tmp);
				},
			},
		],
		items: list,
		onAddChange: () => {},
		onAddKeyDown: () => {},
		itemsProp: {
			calculateListHeight: listItems => (listItems.length ? listItems.length * ROW_HEIGHT : 0),
			getItemHeight: () => ROW_HEIGHT,
			actionsDefault: [],
			key: 'values',
		},
	};
	return <Enumeration {...enumerationProps} />;
};
