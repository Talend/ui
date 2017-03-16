import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { Enumeration, IconsProvider } from '../src/index';

const props = {
	displayMode: 'DISPLAY_MODE_DEFAULT',

	headerDefault: [{
		label: 'Add item',
		icon: 'talend-plus',
		id: 'add',
		onClick: action('header.onAdd'),
	}],
	headerSelected: [{
		label: 'Delete items',
		icon: 'talend-trash',
		id: 'del',
		onClick: action('headerSelected.deleteAll'),
	}],
	headerInput: [{
		disabled: false,
		label: 'Validate',
		icon: 'talend-check',
		id: 'validate',
		onClick: action('headerInput.onValidate'),
	}, {
		label: 'Abort',
		icon: 'talend-cross',
		id: 'abort',
		onClick: action('headerInput.onAbort'),
	}],
	items: Array(50).fill('').map((item, index) => ({
		values: [`Lorem ipsum dolor sit amet ${index}`],
	})),
	itemsProp: {
		key: 'values',
		onSubmitItem: action('itemEdit.onSubmit'),
		onItemChange: action('itemEdit.onItemchange'),
		onAbortItem: action('itemEdit.onCancel'),
		onSelectItem:  action('itemEdit.onSelect'),
		actionsDefault: [{
			disabled: false,
			label: 'Edit',
			icon: 'talend-pencil',
			id: 'edit',
			onClick: action('item.onEnterEditMode'),
		}, {
			label: 'Delete',
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

const addProps = {
	...props,
	displayMode: 'DISPLAY_MODE_ADD'
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

// custom edit props
editItemProps.items = Array(50).fill('').map((item, index) => ({
    values: [`Lorem ipsum dolor sit amet ${index}`],
}));
editItemProps.items[0] = {
    values: ['Lorem ipsum dolor sit amet 0'],
    displayMode: 'DISPLAY_MODE_EDIT',
};

// custom selected props
selectedValuesProps.items = Array(50).fill('').map((item, index) => ({
    values: [`Lorem ipsum dolor sit amet ${index}`],
    isSelected: index%2===0,
}));

const headerErrorProps = {
	...props,
	displayMode: 'DISPLAY_MODE_ADD',
};
headerErrorProps.addInputError = 'an error occured';

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

storiesOf('Enumeration', module)
	.addWithInfo('default', () => (
		<div>
			<p>By default :</p>
			<IconsProvider />
			<Enumeration
				{...props}
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
	.addWithInfo('selected values', () => (
		<div>
			<p>By default :</p>
			<IconsProvider />
			<Enumeration
				{...selectedValuesProps}
			/>
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
	));
