import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';

import Immutable from 'immutable'; // eslint-disable-line import/no-extraneous-dependencies
import talendIcons from '@talend/icons/dist/react';

import { I18nextProvider } from 'react-i18next';
import i18n from './config/i18n';

import { HeaderBar, IconsProvider } from '../src';

import { TALEND_T7_THEME_APPS as apps, TALEND_T7_THEME_CLASSNAME } from '../src/Layout/constants';

const icons = {
	'talend-burger': talendIcons['talend-burger'],
	'talend-cog': talendIcons['talend-cog'],
	'talend-environment': talendIcons['talend-environment'],
	'talend-filter': talendIcons['talend-filter'],
	'talend-info-circle': talendIcons['talend-info-circle'],
	'talend-launcher': talendIcons['talend-launcher'],
	'talend-logo': talendIcons['talend-logo'],
	'talend-logo-dp': talendIcons['talend-logo-dp'],
	'talend-logo-ic': talendIcons['talend-logo-ic'],
	'talend-logo-mc': talendIcons['talend-logo-mc'],
	'talend-logo-square': talendIcons['talend-logo-square'],
	'talend-question-circle': talendIcons['talend-question-circle'],
	'talend-search': talendIcons['talend-search'],
	'talend-share-alt': talendIcons['talend-share-alt'],
	'talend-star': talendIcons['talend-star'],
	'talend-user-circle': talendIcons['talend-user-circle'],
	'talend-board': talendIcons['talend-board'],
	'talend-bell': talendIcons['talend-bell'],
	'talend-bell-notification': talendIcons['talend-bell-notification'],
};

const typeaheadItems = [
	{
		title: 'category 1',
		icon: {
			name: 'talend-filter',
			title: 'icon',
		},
		suggestions: [
			{
				title: 'le title 1',
				description:
					'description: Uxoresque est in pacto est marito est hastam nomine in eos discessura incredibile tempus ardore.',
			},
			{
				title: 'title 2 les elephants elementaires ont des aile cum erat inquam controversia autem mihi utrumqo',
				description:
					'description: Aut aut cum satis inter Epicuri quidem cum erat inquam controversia autem mihi utrumque Attico.',
			},
		],
	},
	{
		title: 'category 2',
		icon: {
			name: 'talend-star',
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
		icon: {
			name: 'talend-share-alt',
			title: 'icon',
		},
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
		],
	},
];

const props = {
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
		docked: true,
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

const decoratedStories = storiesOf('HeaderBar', module).addDecorator(story => (
	<I18nextProvider i18n={i18n}>
		<div>
			{story()}
			<div className="container" style={{ paddingTop: 40 }} />
			<IconsProvider defaultIcons={icons} />
		</div>
	</I18nextProvider>
));

if (!decoratedStories.addWithInfo) {
	decoratedStories.addWithInfo = decoratedStories.add;
}
const infoStyle = stylesheet => ({
	...stylesheet,
	button: {
		...stylesheet.button,
		topRight: {
			...stylesheet.button.topRight,
			top: '48px',
		},
	},
});

decoratedStories
	.addWithInfo('default', () => {
		const headerProps = Immutable.fromJS(props).toJS();
		return <HeaderBar {...headerProps} />;
	}, { styles: infoStyle })
	.addWithInfo('with full logo', () => {
		const headerProps = Immutable.fromJS(props).toJS();
		headerProps.logo.isFull = true;
		return <HeaderBar {...headerProps} />;
	}, { styles: infoStyle })
	.addWithInfo('without products', () => {
		const headerProps = Immutable.fromJS({
			...props,
			products: null,
		}).toJS();
		headerProps.logo.isFull = true;
		return <HeaderBar {...headerProps} />;
	}, { styles: infoStyle })
	.addWithInfo('with environment dropdown', () => {
		const headerProps = Immutable.fromJS(props).toJS();
		headerProps.env = {
			id: 'header-environment',
			items: [
				{
					label: 'Runtime Environment',
					onClick: action('onEnvClick'),
				},
			],
			label: 'Default',
		};
		return <HeaderBar {...headerProps} />;
	}, { styles: infoStyle })
	.addWithInfo('with unread notifications', () => {
		const headerProps = Immutable.fromJS(props).toJS();
		headerProps.notification = {
			hasUnread: true,
		};
		return <HeaderBar {...headerProps} />;
	}, { styles: infoStyle })
	.addWithInfo('with read notifications', () => {
		const headerProps = Immutable.fromJS(props).toJS();
		headerProps.notification = {
			hasUnread: false,
		};
		return <HeaderBar {...headerProps} />;
	}, { styles: infoStyle })
	.addWithInfo('with help split dropdown', () => {
		const headerProps = Immutable.fromJS(props).toJS();
		headerProps.help.items = [
			{
				icon: 'talend-board',
				label: 'Onboarding',
				onClick: action('onOnboardingClick'),
			},
			{
				icon: 'talend-cog',
				label: 'About',
				onClick: action('onAboutClick'),
			},
		];
		return <HeaderBar {...headerProps} />;
	}, { styles: infoStyle })
	.addWithInfo('with search input', () => {
		const headerProps = Immutable.fromJS(props).toJS();
		headerProps.search = {
			placeholder: 'Search...',
			onBlur: action('onSearchBlur'),
			onChange: action('onSearchChange'),
		};
		return <HeaderBar {...headerProps} />;
	}, { styles: infoStyle })
	.addWithInfo('while searching', () => {
		const headerProps = Immutable.fromJS(props).toJS();
		headerProps.search = {
			position: 'right',
			value: 'le',
			searching: true,
			onBlur: action('onSearchBlur'),
			onChange: action('onSearchChange'),
		};
		return <HeaderBar {...headerProps} />;
	}, { styles: infoStyle })
	.addWithInfo('with search results', () => {
		const headerProps = Immutable.fromJS(props).toJS();
		headerProps.search = {
			position: 'right',
			value: 'le',
			items: typeaheadItems,
			onBlur: action('onSearchBlur'),
			onChange: action('onSearchChange'),
			onSelect: action('onSearchResultSelect'),
		};
		return <HeaderBar {...headerProps} />;
	}, { styles: infoStyle })
	.addWithInfo('with no search result', () => {
		const headerProps = Immutable.fromJS(props).toJS();
		headerProps.search = {
			position: 'right',
			value: 'le',
			items: [],
			onBlur: action('onSearchBlur'),
			onChange: action('onSearchChange'),
		};
		return <HeaderBar {...headerProps} />;
	}, { styles: infoStyle })
	.addWithInfo('without user and with information', () => {
		const headerProps = Immutable.fromJS(props).toJS();
		headerProps.user = null;
		headerProps.information = {
			id: 'header-info',
			bsStyle: 'link',
			icon: 'talend-info-circle',
			label: 'Information',
			hideLabel: true,
			pullRight: true,
			noCaret: true,
			tooltipPlacement: 'bottom',
			displayMode: 'dropdown',
			items: [
				{
					label: 'Guided tour',
					onClick: action('onOnboardingClick'),
				},
				{
					divider: true,
				},
				{
					label: 'Community',
					target: '_blank',
					href: 'https://community.talend.com/',
				},
				{
					label: 'Support',
					target: '_blank',
					href: 'https://www.talend.com/services/technical-support/',
				},
			],
		};
		return <HeaderBar {...headerProps} />;
	}, { styles: infoStyle })
	.addWithInfo('barebone', () => <HeaderBar />, { styles: infoStyle });

const appStyle = require('./config/themes.scss');

apps.forEach(app => {
	const headerProps = Immutable.fromJS(props).toJS();
	decoratedStories.addWithInfo(`🎨 [${app.toUpperCase()}] HeaderBar`, () => (
		<div className={appStyle[app]}>
			<div className={TALEND_T7_THEME_CLASSNAME}>
				<div role="banner">
					<HeaderBar {...headerProps} />
				</div>
			</div>
		</div>
	));
});
