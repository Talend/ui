import React from 'react';
import { storiesOf, action } from '@storybook/react';

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
	searchPlaceholder: 'Search',
	headerLabel: 'Choose wisely',
	toggleAllChecked: false,
	toggleAllLabel: 'All values',
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

storiesOf('ListView', module)
	.addDecorator((story) => (
		<div>
			<IconsProvider />
			<h1>ListView</h1>
			<form>
				{story()}
			</form>
		</div>
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
	});
