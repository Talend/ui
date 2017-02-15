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
	items: Array(50).fill('').map((item, index) => {
		return {
			values: [`Lorem ipsum dolor sit amet ${index}`],
		};
	}),
	itemsProp: {
		key: 'values',
		onSubmitItem: action('itemEdit.onSubmit'),
        onItemChange: action('itemEdit.onItemchange'),
        onAbortItem: action('itemEdit.onCancel'),
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
		}, /* {
			label: 'Abort',
			icon: 'talend-cross',
			id: 'abort',
			onClick: action('itemEdit.onCancel'),
		} */],
	},
	onAddChange: action('onAddChange'),
	onAddKeyDown: action('onAddKeyDown'),
};

const addProps = { ...props, displayMode: 'DISPLAY_MODE_ADD' };
const editItemProps = { ...props, displayMode: 'DISPLAY_MODE_DEFAULT' };
editItemProps.items = Array(50).fill('').map((item, index) => {
	return {
		values: [`Lorem ipsum dolor sit amet ${index}`],
	};
});

editItemProps.items[0] = {
	values: ['Lorem ipsum dolor sit amet 0'],
	displayMode: 'DISPLAY_MODE_EDIT',
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
	));
