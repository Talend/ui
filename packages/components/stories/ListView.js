import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { I18nextProvider } from 'react-i18next';

import i18n, { LanguageSwitcher } from './config/i18n';
import { ListView, IconsProvider } from '../src/index';

const filterAction = {
	label: 'Filter',
	icon: 'talend-search',
	id: 'filter',
	onClick: action('header.onFilter'),
};

const props = {
	required: true,
	items: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'].map(v => ({
		label: v,
		value: v,
		onChange: action('onChange'),
	})),
	headerDefault: [filterAction],
	getItemHeight: () => 33,
	onAddChange: action('onAddChange'),
	onAddKeyDown: action('onAddKeyDown'),
	headerLabel: 'Choose wisely',
	toggleAllChecked: false,
	onToggleAll: action('onToggleAll'),
};

const searchProps = {
	...props,
	displayMode: 'DISPLAY_MODE_SEARCH',
	headerInput: [
		{
			label: 'Remove search',
			icon: 'talend-cross',
			id: 'abort',
			onClick: action('abort'),
		},
	],
	searchCriteria: 'ore',
};

const noResultsSearch = {
	...searchProps,
	items: [],
	searchCriteria: 'nopnopnop',
};
const withSwitchBox = {
	...props,
	isSwitchBox: true,
};

const withNestedItems = {
	required: true,
	isSwitchBox: true,
	items: [
		{
			label: 'LoremParent',
			value: 'LoremParent',
			onChange: action('onChange'),
			onExpandToggle: action('onExpandToggle'),
			expanded: false,
			children: [
				{
					label: 'Lorem',
					value: 'Lorem',
					onChange: action('onChange'),
				},
				{
					label: 'Ipsum',
					value: 'Ipsum',
					onChange: action('onChange'),
				},
				{
					label: 'Dolor',
					value: 'Dolor',
					onChange: action('onChange'),
				},
			],
		},
		{
			label: 'IpsumParent',
			value: 'IpsumParent',
			onChange: action('onChange'),
			onExpandToggle: action('onExpandToggle'),
			expanded: true,
			children: [
				{
					label: 'Lorem2',
					value: 'Lorem2',
					onChange: action('onChange'),
				},
				{
					label: 'Ipsum2',
					value: 'Ipsum2',
					onChange: action('onChange'),
				},
				{
					label: 'Dolor2',
					value: 'Dolor2',
					onChange: action('onChange'),
				},
			],
		},
	],
	headerDefault: [filterAction],
	getItemHeight: () => 33,
	onAddChange: action('onAddChange'),
	onAddKeyDown: action('onAddKeyDown'),
	headerLabel: 'Choose wisely',
	toggleAllChecked: false,
	onToggleAll: action('onToggleAll'),
	showToggleAll: false,
};

storiesOf('ListView', module)
	.addDecorator(story => (
		<I18nextProvider i18n={i18n}>
			<div>
				<LanguageSwitcher />
				<IconsProvider />
				<h1>ListView</h1>
				<form>{story()}</form>
			</div>
		</I18nextProvider>
	))
	.add('empty', () => {
		const emptyProps = { ...props };
		emptyProps.items = [];
		return (
			<div id="listview-empty">
				<ListView {...emptyProps} />
			</div>
		);
	})
	.add('single entry', () => {
		const singleEntryProps = { ...props };
		singleEntryProps.items = [props.items[0]];
		return (
			<div id="listview-single">
				<ListView {...singleEntryProps} />
			</div>
		);
	})
	.add('several values', () => (
		<div id="listview-several">
			<ListView {...props} />
		</div>
	))
	.add('search mode', () => (
		<div id="listview-search">
			<ListView {...searchProps} />
		</div>
	))
	.add('search mode without results', () => (
		<div id="listview-search-no-result">
			<ListView {...noResultsSearch} />
		</div>
	))
	.add('selected values', () => {
		const selectedValuesProps = { ...props };

		selectedValuesProps.items[1].checked = true;

		return (
			<div id="listview-selected">
				<ListView {...selectedValuesProps} />
			</div>
		);
	})
	.add('with switch box', () => {
		return (
			<div id="listview-switch">
				<ListView {...withSwitchBox} />
			</div>
		);
	})
	.add('with nested items', () => {
		return (
			<div id="listview-nested">
				<ListView {...withNestedItems} />
			</div>
		);
	})
	.add('without toggleAll', () => {
		const withoutToggleALLProps = { ...props };
		withoutToggleALLProps.showToggleAll = false;

		return (
			<div id="listview-without-toggle-all">
				<ListView {...withoutToggleALLProps} />
			</div>
		);
	});
