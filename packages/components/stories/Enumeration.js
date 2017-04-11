import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { Enumeration, IconsProvider } from '../src/index';

import {
	DISPLAY_MODE_DEFAULT,
	DISPLAY_MODE_ADD,
	DISPLAY_MODE_EDIT,
	DISPLAY_MODE_SEARCH,
} from '../lib/Enumeration/Enumeration.component';

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
	onClick: () => {
	},
};

const filterAction = {
	label: 'Filter',
	icon: 'talend-search',
	id: 'filter',
	onClick: action('header.onFilter'),
};

const deleteItemAction = {
	label: 'Remove selected values',
	icon: 'talend-trash',
	id: 'del',
	onClick: action('headerDefault.deleteAll'),
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

const props = {
	required: true,
	displayMode: DISPLAY_MODE_DEFAULT,
	headerDefault: [filterAction, addItemAction, loadingAction],
	headerInput: [validateAction, abortAction],
	items: Array(1000).fill('').map((item, index) => ({
		values: [`Lorem ipsum dolor sit amet ${index}`],
	})),
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
	headerLabel: 'Choose wisely',
	emptyLabel: 'Nothing here yet',
	toggleAllChecked: false,
	toggleAllLabel: 'All values',
	onToggleAll: action('onToggleAll'),
	onInputChange: action('onInputChange'),
};

const addProps = {
	...props,
	displayMode: DISPLAY_MODE_ADD,
};
const editItemProps = {
	...props,
	displayMode: DISPLAY_MODE_DEFAULT,
	currentEdit: {
		validate: {
			disabled: false,
		},
	},
};
const selectedValuesProps = {
	...props,
};
const searchProps = {
	...props,
	displayMode: DISPLAY_MODE_SEARCH,
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

if (selectedValuesProps.items.filter(item => !!item.isSelected).length > 1) {
	const computedHeaderDefault = selectedValuesProps.headerDefault.slice();
	computedHeaderDefault.unshift(deleteItemAction);
	selectedValuesProps.headerDefault = computedHeaderDefault;
}

const headerErrorProps = {
	...props,
	displayMode: DISPLAY_MODE_ADD,
};
headerErrorProps.headerError = 'an error occured';

const editItemPropsWithError = {
	...props,
	displayMode: DISPLAY_MODE_DEFAULT,
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
	displayMode: DISPLAY_MODE_EDIT,
	error: 'an error occured',
};

storiesOf('Enumeration', module)
	.addDecorator((story) => (
		<div>
			<IconsProvider />
			<h1>Enumeration</h1>
			<form>
				{story()}
			</form>
		</div>
	))
	.addWithInfo('empty', () => {
		const emptyProps = { ...props };
		emptyProps.items = [];
		return (
			<Enumeration
				{...emptyProps}
			/>
		);
	})
	.addWithInfo('single entry', () => {
		const singleEntryProps = { ...props };
		singleEntryProps.items = [props.items[0]];
		return (
			<Enumeration
				{...singleEntryProps}
			/>
		);
	})
	.addWithInfo('several values', () => (
		<Enumeration
			{...props}
		/>
	))
	.addWithInfo('add mode', () => (
		<Enumeration
			{...addProps}
		/>
	))
	.addWithInfo('edit mode', () => (
		<Enumeration
			{...editItemProps}
		/>
	))
	.addWithInfo('search mode', () => (
		<Enumeration
			{...searchProps}
		/>
	))
	.addWithInfo('selected values', () => (
		<Enumeration
			{...selectedValuesProps}
		/>
	))
	.addWithInfo('with header error', () => (
		<Enumeration
			{...headerErrorProps}
		/>
	))
	.addWithInfo('with item in error', () => (
		<Enumeration
			{...editItemPropsWithError}
		/>
	));
