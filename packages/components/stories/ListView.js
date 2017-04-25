import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { ListView, IconsProvider } from '../src/index';


const filterAction = {
	label: 'Filter',
	icon: 'talend-search',
	id: 'filter',
	onClick: action('header.onFilter'),
};


const ITEM_DEFAULT_HEIGHT = 33;

const props = {
	required: true,
	items: [
		'Lorem',
		'Ipsum',
		'Dolor',
		'Sit',
		'Amet',
	],
	onAddChange: action('onAddChange'),
	onAddKeyDown: action('onAddKeyDown'),
	headerLabel: 'Choose wisely',
	emptyLabel: 'Nothing here yet',
	toggleAllChecked: false,
	toggleAllLabel: 'All values',
	onToggleAll: action('onToggleAll'),
};

const selectedValuesProps = {
	...props,
};
const searchProps = {
	...props,
	searchCriteria: 'lorem',
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
	.addWithInfo('selected values', () => (
		<ListView
			{...selectedValuesProps}
		/>
	));
