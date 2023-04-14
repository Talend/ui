import { action } from '@storybook/addon-actions';

import ListView from '.';

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
	onAddChange: action('onAddChange'),
	onAddKeyDown: action('onAddKeyDown'),
	headerLabel: 'Choose wisely',
	toggleAllChecked: false,
	onToggleAll: action('onToggleAll'),
	dataTest: 'item',
};

const searchProps = {
	...props,
	displayMode: ListView.DISPLAY_MODES.DISPLAY_MODE_SEARCH,
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
	onAddChange: action('onAddChange'),
	onAddKeyDown: action('onAddKeyDown'),
	headerLabel: 'Choose wisely',
	toggleAllChecked: false,
	onToggleAll: action('onToggleAll'),
	showToggleAll: false,
	dataTest: 'item',
};

const withIconProps = {
	...props,
	items: [
		{
			label: 'Lorem',
			icon: {
				name: 'talend-warning',
				title: 'A warning',
			},
		},
		{
			label: 'Ipsum',
			icon: {
				name: 'talend-world',
				title: 'The world',
			},
		},
	],
};

export default {
	title: 'Form/Controls/ListView',

	decorators: [
		story => (
			<div>
				<h1>ListView</h1>
				<form>{story()}</form>
			</div>
		),
	],
};

export const Empty = () => {
	const emptyProps = { ...props };
	emptyProps.items = [];
	return (
		<div id="listview-empty">
			<ListView {...emptyProps} />
		</div>
	);
};

export const SingleEntry = () => {
	const singleEntryProps = { ...props };
	singleEntryProps.items = [props.items[0]];
	return (
		<div id="listview-single">
			<ListView {...singleEntryProps} />
		</div>
	);
};

export const SeveralValues = () => (
	<div id="listview-several">
		<ListView {...props} />
	</div>
);

export const SearchMode = () => (
	<div id="listview-search">
		<ListView {...searchProps} />
	</div>
);

export const SearchModeWithoutResults = () => (
	<div id="listview-search-no-result">
		<ListView {...noResultsSearch} />
	</div>
);

export const SelectedValues = () => {
	const selectedValuesProps = { ...props };

	selectedValuesProps.items[1].checked = true;

	return (
		<div id="listview-selected">
			<ListView {...selectedValuesProps} />
		</div>
	);
};

export const WithSwitchBox = () => {
	return (
		<div id="listview-switch">
			<ListView {...withSwitchBox} />
		</div>
	);
};

export const WithNestedItems = () => {
	return (
		<div id="listview-nested">
			<ListView {...withNestedItems} />
		</div>
	);
};

export const WithIcons = () => (
	<div id="listview-with-icon">
		<ListView {...withIconProps} />
	</div>
);

export const WithoutToggleAll = () => {
	const withoutToggleALLProps = { ...props };
	withoutToggleALLProps.showToggleAll = false;

	return (
		<div id="listview-without-toggle-all">
			<ListView {...withoutToggleALLProps} />
		</div>
	);
};
