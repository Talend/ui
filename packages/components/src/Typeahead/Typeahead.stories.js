import React from 'react';
import { action } from '@storybook/addon-actions';
import Typeahead from './Typeahead.component';

const items = [
	{
		title: 'Search in',
		hint: true,
		suggestions: [
			{
				title: 'First hint example',
			},
			{
				title: 'Second hint example',
			},
		],
	},
	{
		title: 'category 1',
		icon: {
			name: 'talend-smiley-satisfied',
			title: 'icon',
		},
		suggestions: [
			{
				title: 'le title 1',
				description:
					'description: Uxoresque est in pacto est marito est hastam nomine in eos discessura incredibile tempus ardore.',
			},
			{
				title: 'title 2 Les elephants elementaires ont des aile ',
				disabled: true,
				description:
					'description: Aut aut cum satis inter Epicuri quidem cum erat inquam controversia autem mihi utrumque Attico.',
			},
			{
				title: 'title 3 Les elephants elementaires ont des aile ',
				description:
					'description: Aut aut cum satis inter Epicuri quidem cum erat inquam controversia autem mihi utrumque Attico.',
			},
		],
	},
	{
		title: 'category 2',
		icon: {
			name: 'talend-smiley-sleep',
			title: 'icon',
		},
		suggestions: [
			{
				title: 'title 3',
				description:
					'description: In sanciatur libere audeamus exspectemus amicitia et dum ne audeamus causa monendum honesta studium valeat.',
			},
		],
	},
	{
		title: 'category 3',
		suggestions: [
			{
				title: 'title 4',
				description:
					'description: Praesentibus genero ne in Africani mandavi saepius ipsam C in libro et hoc Laeli cum.',
			},
			{
				title: 'title 5',
				description:
					'description: Feceris unde tot illo tot clientes dederis numerando et indiscretus cum paria et unde ubi.',
			},
			{
				title: 'title 6',
				description:
					'description: Gradu quos cedentium sunt appeterent ita ancoralia instar luna sunt etiam ubi incendente nihil observabant.',
			},
			{
				title: 'without description',
			},
			{
				description: 'without title',
			},
		],
	},
];

const noHeaderItems = [
	{
		suggestions: [
			{
				title: 'le title 1',
				description:
					'description: Uxoresque est in pacto est marito est hastam nomine in eos discessura incredibile tempus ardore.',
			},
			{
				title: 'title 2 les elephants elementaires ont des aile ',
				description:
					'description: Aut aut cum satis inter Epicuri quidem cum erat inquam controversia autem mihi utrumque Attico.',
			},
		],
	},
];

export default {
	title: 'Form/Inline form/Typeahead',
};

export const DefaultWithDebounceInput = () => {
	const props = {
		placeholder: 'Search...',
		onBlur: action('onBlur'),
		onChange: action('onChange'),
		debounceTimeout: 300,
		role: 'searchbox',
	};
	return <Typeahead {...props} />;
};

export const Searching = () => {
	const props = {
		value: 'Lorem ipsum',
		items: [],
		onBlur: action('onBlur'),
		onChange: action('onChange'),
		searching: true,
		role: 'searchbox',
	};
	return <Typeahead {...props} />;
};

export const WithResults = () => {
	const props = {
		value: 'le',
		items,
		onBlur: action('onBlur'),
		onChange: action('onChange'),
		onSelect: action('onSelect'),
		role: 'searchbox',
		'data-feature': 'data-feature-typeahead',
		icon: {
			name: 'talend-search',
			title: 'Toggle search input',
		},
	};
	return <Typeahead {...props} />;
};

export const WithUnmanagedNavigation = () => {
	const props = {
		value: 'le',
		items,
		onBlur: action('onBlur'),
		onChange: action('onChange'),
		onSelect: action('onSelect'),
		role: 'searchbox',
		'data-feature': 'data-feature-typeahead',
		icon: {
			name: 'talend-search',
			title: 'Toggle search input',
		},
		onKeyDown: action('onKeyDown -> internal nav is bypassed'),
		manageNavigation: true,
	};
	return <Typeahead {...props} />;
};

export const WithResultsButLoading = () => {
	const props = {
		value: 'le',
		items,
		onBlur: action('onBlur'),
		onChange: action('onChange'),
		onSelect: action('onSelect'),
		role: 'searchbox',
		'data-feature': 'data-feature-typeahead',
		isLoading: true,
	};
	return <Typeahead {...props} />;
};

export const WithResultsAndIcon = () => {
	const props = {
		value: 'le',
		items,
		onBlur: action('onBlur'),
		onChange: action('onChange'),
		onSelect: action('onSelect'),
		role: 'searchbox',
		'data-feature': 'data-feature-typeahead',
		icon: {
			name: 'talend-search',
			title: 'Toggle search input',
		},
	};
	return <Typeahead {...props} />;
};

export const WithDebounceInputAndResults = () => {
	const props = {
		value: 'le',
		items,
		onBlur: action('onBlur'),
		onChange: action('onChange'),
		debounceTimeout: 300,
		onSelect: action('onSelect'),
		role: 'searchbox',
		'data-feature': 'data-feature-typeahead',
	};
	return <Typeahead {...props} />;
};

export const WithoutResults = () => {
	const props = {
		value: 'Text without results',
		onBlur: action('onBlur'),
		onChange: action('onChange'),
		items: [],
		role: 'searchbox',
	};
	return <Typeahead {...props} />;
};

export const OnTheRight = () => {
	const props = {
		value: 'le',
		items,
		onBlur: action('onBlur'),
		onChange: action('onChange'),
		onSelect: action('onSelect'),
		position: 'right',
		role: 'searchbox',
	};
	return <Typeahead {...props} />;
};

export const WithToggleButton = () => {
	const props = {
		icon: {
			name: 'talend-search',
			title: 'Toggle search input',
			role: 'search',
			bsStyle: 'link',
		},
		onToggle: action('onToggle'),
		docked: true,
	};
	return <Typeahead {...props} />;
};

export const WithFocusedItem = () => {
	const props = {
		icon: {
			name: 'talend-search',
			title: 'Toggle search input',
		},
		onKeyDown: action('onKeyDown'),
		items,
		focusedSectionIndex: 1,
		focusedItemIndex: 0,
		role: 'searchbox',
	};
	return <Typeahead {...props} />;
};

export const WithoutSectionHeader = () => {
	const props = {
		value: 'le',
		items: noHeaderItems,
		onBlur: action('onBlur'),
		onChange: action('onChange'),
		onSelect: action('onSelect'),
		role: 'searchbox',
	};
	return <Typeahead {...props} />;
};
