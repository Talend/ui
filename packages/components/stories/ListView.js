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
	items: [
		'Lorem',
		'Ipsum',
		'Dolor',
		'Sit',
		'Amet',
	].map(v => ({
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
	headerInput: [{
		label: 'Abort',
		icon: 'talend-cross',
		id: 'abort',
		onClick: action('abort'),
	}],
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
			expanded: true,
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
			]
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
			]
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
				<LanguageSwitcher/>
				<IconsProvider/>
				<h1>ListView</h1>
				<form>{story()}</form>
			</div>
		</I18nextProvider>
	))
	.addWithInfo('empty', () => {
		const emptyProps = { ...props };
		emptyProps.items = [];
		return (
			<ListView
				{...emptyProps}
			/>
		);
	})
	.addWithInfo('single entry', () => {
		const singleEntryProps = { ...props };
		singleEntryProps.items = [props.items[0]];
		return (
			<ListView
				{...singleEntryProps}
			/>
		);
	})
	.addWithInfo('several values', () => (
		<ListView
			{...props}
		/>
	))
	.addWithInfo('search mode', () => (
		<ListView
			{...searchProps}
		/>
	))
	.addWithInfo('search mode without results', () => (
		<ListView
			{...noResultsSearch}
		/>
	))
	.addWithInfo('selected values', () => {
		const selectedValuesProps = { ...props };

		selectedValuesProps.items[1].checked = true;

		return (
			<ListView
				{...selectedValuesProps}
			/>
		);
	})
	.addWithInfo('with switch box', () => {
		return (
			<ListView
				{...withSwitchBox}
			/>
		);
	})
	.addWithInfo('with nested items', () => {
		return (
			<ListView
				{...withNestedItems}
			/>
		);
	})
	.addWithInfo('without toggleAll', () => {
		const withoutToggleALLProps = { ...props };
		withoutToggleALLProps.showToggleAll = false;

		return (
			<ListView
				{...withoutToggleALLProps}
			/>
		);
	});
