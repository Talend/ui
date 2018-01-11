import React from 'react';
import { storiesOf, action } from '@storybook/react';
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
	.addWithInfo('without toggleAll', () => {
		const withoutToggleALLProps = { ...props };
		withoutToggleALLProps.toggleAllShown = false;

		return (
			<ListView
				{...withoutToggleALLProps}
			/>
		);
	});
