import { action } from '@storybook/react';
import talendIcons from '@talend/icons/dist/react';

export const icons = {
	// side panel
	'talend-dataprep': talendIcons['talend-dataprep'],
	'talend-download': talendIcons['talend-download'],
	'talend-star': talendIcons['talend-star'],
	'talend-opener': talendIcons['talend-opener'],
	// header bar
	'talend-launcher': talendIcons['talend-launcher'],
	'talend-logo': talendIcons['talend-logo'],
	'talend-logo-dp': talendIcons['talend-logo-dp'],
	'talend-logo-ic': talendIcons['talend-logo-ic'],
	'talend-logo-mc': talendIcons['talend-logo-mc'],
	'talend-logo-square': talendIcons['talend-logo-square'],
	'talend-question-circle': talendIcons['talend-question-circle'],
	'talend-search': talendIcons['talend-search'],
	'talend-user-circle': talendIcons['talend-user-circle'],
};

export const headerProps = {
	brand: {
		id: 'header-brand',
		label: 'Example App Name',
		onClick: action('onApplicationNameClick'),
	},
	logo: {
		id: 'header-logo',
		onClick: action('onLogoClick'),
	},
	search: {
		icon: {
			name: 'talend-search',
			title: 'Search',
			bsStyle: 'link',
			tooltipPlacement: 'bottom',
		},
		id: 'header-search',
		onToggle: action('onSearchClick'),
	},
	help: {
		id: 'header-help',
		onClick: action('onHelpClick'),
	},
	user: {
		id: 'header-user',
		items: [
			{
				icon: 'talend-cog',
				label: 'Settings',
				onClick: action('onSettingsClick'),
			},
		],
		name: 'John Doe',
		firstName: 'John',
		lastName: 'Doe',
	},
	products: {
		id: 'header-products',
		items: [
			{
				icon: 'talend-logo-dp',
				key: 'tdp',
				label: 'Data Preparation',
			},
			{
				icon: 'talend-logo-ic',
				key: 'tic',
				label: 'Integration Cloud',
			},
			{
				icon: 'talend-logo-mc',
				key: 'tmc',
				label: 'Management Console',
			},
		],
		onSelect: action('onProductClick'),
	},
};

export const sidePanelProps = {
	id: 'context',
	actions: [
		{
			label: 'Preparations',
			icon: 'talend-dataprep',
			onClick: action('Preparations clicked'),
			active: true,
		},
		{
			label: 'Datasets',
			icon: 'talend-download',
			onClick: action('Datasets clicked'),
		},
		{
			label: 'Favorites',
			icon: 'talend-star',
			onClick: action('Favorites clicked'),
		},
	],
	onToggleDock: action('Toggle dock clicked'),
	tooltipPlacement: 'top',
};
