import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';

import { Enumeration, IconsProvider } from '../src/index';
import i18n from './config/i18n';

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
		actionsDefault: [{
			disabled: false,
			label: 'Edit',
			icon: 'talend-pencil',
			id: 'edit',
			onClick: action('item.onEnterEditMode'),
		}, {
			label: 'Remove value',
			icon: 'talend-trash',
			id: 'delete',
			onClick: action('item.onDelete'),
		}],
		actionsEdit: [{
			disabled: false,
			label: 'Validate',
			icon: 'talend-check',
			id: 'validate',
			onClick: action('itemEdit.onSubmit'),
		}, {
			label: 'Abort',
			icon: 'talend-cross',
			id: 'abort',
			onClick: action('itemEdit.onCancel'),
		}],
	},
	onAddChange: action('onAddChange'),
	onAddKeyDown: action('onAddKeyDown'),
};

const defaultEmptyListProps = Object.assign({}, props, { items: [] });

const searchModeEmptyListProps = Object.assign(
		{},
		defaultEmptyListProps,
		{ displayMode: 'DISPLAY_MODE_SEARCH' }
);

const dropDownActionsProps = {
	...props,
	headerDefault: [{
		...props.headerDefault[0],
		displayMode: 'dropdown',
		items: [{
			label: 'Add values from a file',
			id: 'add-value',
			onClick: action('add values'),
		}, {
			label: 'Overwrite existing values',
			id: 'append-uploding',
			onClick: action('overwrite'),
		}],
	}],
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
editItemProps.items = Array(100000).fill('').map((item, index) => ({
	values: [`Lorem ipsum dolor sit amet ${index}`],
}));
editItemProps.items[0] = {
	values: ['Lorem ipsum dolor sit amet 0'],
	displayMode: 'DISPLAY_MODE_EDIT',
};

// custom selected props
selectedValuesProps.items = Array(50).fill('').map((item, index) => ({
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
editItemPropsWithError.items = Array(50).fill('').map((item, index) => ({
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
		{ ...addItemAction, disabled: true},
		{ ...importAction, disabled: true},
		{ ...searchAction },
	]
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

storiesOf('Enumeration', module)
	.addDecorator(checkA11y)
	.addWithInfo('default', () => (
		<div>
			<p>By default :</p>
			<IconsProvider />
			<Enumeration
				{...props}
			/>
		</div>
	))
	.addWithInfo('default header action disabled', () => (
		<div>
			<p>By default :</p>
			<IconsProvider />
			<Enumeration
				{...headerDisabled}
			/>
		</div>
	))
	.addWithInfo('default - empty list with i18n', () => (
		<div>
			<p>Empty list by default:</p>
			<button onClick={() => i18n.changeLanguage('fr')}>fr</button>
			<button onClick={() => i18n.changeLanguage('it')}>it</button>
			<IconsProvider />
			<I18nextProvider i18n={i18n}>
				<Enumeration
					{...defaultEmptyListProps}
				/>
			</I18nextProvider>
		</div>
	))
	.addWithInfo('default - empty list', () => (
		<div>
			<p>Empty list by default:</p>
			<IconsProvider />
			<Enumeration
				{...defaultEmptyListProps}
			/>
		</div>
	))
	.addWithInfo('default with dropdown', () => (
		<div>
			<p>By default :</p>
			<IconsProvider />
			<Enumeration
				{...dropDownActionsProps}
			/>
		</div>
	))
	.addWithInfo('add', () => (
		<div>
			<p>By default :</p>
			<IconsProvider />
			<Enumeration
				{...addProps}
			/>
		</div>
	))
	.addWithInfo('edit mode', () => (
		<div>
			<p>By default :</p>
			<IconsProvider />
			<Enumeration
				{...editItemProps}
			/>
		</div>
	))
	.addWithInfo('search mode', () => (
		<div>
			<p>By default :</p>
			<IconsProvider />
			<Enumeration
				{...searchProps}
			/>
		</div>
	))
	.addWithInfo('search mode - empty list', () => (
			<div>
				<p>empty list in search mode :</p>
				<IconsProvider />
				<Enumeration
						{...searchModeEmptyListProps}
				/>
			</div>
	))
	.addWithInfo('selected values', () => (
		<div>
			<p>By default :</p>
			<IconsProvider />
			<Enumeration
				{...selectedValuesProps}
			/>
		</div>
	))
	.addWithInfo('selected values with checkboxes', () => (
		<div>
			<p>By default :</p>
			<IconsProvider />
			<form>
				<Enumeration
					{...selectedValuesCheckboxesProps}
				/>
			</form>
		</div>
	))
	.addWithInfo('with header error', () => (
		<div>
			<p>By default :</p>
			<IconsProvider />
			<Enumeration
				{...headerErrorProps}
			/>
		</div>
	))
	.addWithInfo('with item in error', () => (
		<div>
			<p>By default :</p>
			<IconsProvider />
			<Enumeration
				{...editItemPropsWithError}
			/>
		</div>
	))
	.addWithInfo('with custom label', () => (
		<div>
			<p>Should be 'Users' instead of 'Values'</p>
			<IconsProvider />
			<Enumeration
				{...customLabelProps}
			/>
		</div>
	))
	.addWithInfo('with icon', () => (
		<div>
			<p>By default: </p>
			<IconsProvider />
			<Enumeration
				{...withIconProps}
			/>
		</div>
	));
