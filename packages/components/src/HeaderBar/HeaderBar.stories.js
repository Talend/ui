import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import { makeDecorator } from '@storybook/addons';

import Immutable from 'immutable'; // eslint-disable-line import/no-extraneous-dependencies
import talendIcons from '@talend/icons/dist/react';

import IconsProvider from '../IconsProvider';
import HeaderBar from './HeaderBar.component';

import { TALEND_T7_THEME_APPS as apps, TALEND_T7_THEME_CLASSNAME } from '../Layout/constants';

const icons = {
	'talend-bubbles': talendIcons['talend-bubbles'],
	'talend-burger': talendIcons['talend-burger'],
	'talend-cog': talendIcons['talend-cog'],
	'talend-cross': talendIcons['talend-cross'],
	'talend-environment': talendIcons['talend-environment'],
	'talend-filter': talendIcons['talend-filter'],
	'talend-info-circle': talendIcons['talend-info-circle'],
	'talend-launcher': talendIcons['talend-launcher'],
	'talend-logo': talendIcons['talend-logo'],
	'talend-tdp-colored': talendIcons['talend-tdp-colored'],
	'talend-tic-colored': talendIcons['talend-tic-colored'],
	'talend-tmc-colored': talendIcons['talend-tmc-colored'],
	'talend-logo-square': talendIcons['talend-logo-square'],
	'talend-question-circle': talendIcons['talend-question-circle'],
	'talend-search': talendIcons['talend-search'],
	'talend-share-alt': talendIcons['talend-share-alt'],
	'talend-star': talendIcons['talend-star'],
	'talend-user-circle': talendIcons['talend-user-circle'],
	'talend-board': talendIcons['talend-board'],
	'talend-bell': talendIcons['talend-bell'],
	'talend-bell-notification': talendIcons['talend-bell-notification'],
	'talend-tdc-negative': talendIcons['talend-tdc-negative'],
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
				title:
					'title 2 les elephants elementaires ont des aile cum erat inquam controversia autem mihi utrumqo',
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
		icon: 'talend-question-circle',
		onClick: action('onHelpClick'),
	},
	user: {
		id: 'header-user',
		items: [
			{
				id: 'settings',
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
				icon: 'talend-tdp-colored',
				key: 'tdp',
				label: 'Data Preparation',
			},
			{
				icon: 'talend-tic-colored',
				key: 'tic',
				label: 'Integration Cloud',
			},
			{
				icon: 'talend-tmc-colored',
				key: 'tmc',
				label: 'Management Console',
			},
		],
		onSelect: action('onProductClick'),
	},
};

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

const withIcons = makeDecorator({
	name: 'withIcons',
	wrapper: (getStory, context) => {
		const story = getStory(context);
		return (
			<div>
				<IconsProvider defaultIcons={icons} />
				{story}
				<div className="container" style={{ paddingTop: 40 }} />
			</div>
		);
	},
});

const decoratedStories = storiesOf('Navigation/HeaderBar', module);

decoratedStories
	.addDecorator(withIcons)
	.add(
		'default',
		() => {
			const headerProps = Immutable.fromJS(props).toJS();
			return <HeaderBar {...headerProps} />;
		},
		{ info: { styles: infoStyle } },
	)
	.add(
		'with full logo',
		() => {
			const headerProps = Immutable.fromJS(props).toJS();
			headerProps.logo.isFull = true;
			return <HeaderBar {...headerProps} />;
		},
		{ info: { styles: infoStyle } },
	)
	.add(
		'without products',
		() => {
			const headerProps = Immutable.fromJS({
				...props,
				products: null,
			}).toJS();
			headerProps.logo.isFull = true;
			return <HeaderBar {...headerProps} />;
		},
		{ info: { styles: infoStyle } },
	)
	.add(
		'with environment dropdown',
		() => {
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
		},
		{ info: { styles: infoStyle } },
	)
	.add(
		'with unread notifications',
		() => {
			const headerProps = Immutable.fromJS(props).toJS();
			headerProps.notification = {
				hasUnread: true,
			};
			return <HeaderBar {...headerProps} />;
		},
		{ info: { styles: infoStyle } },
	)
	.add(
		'with read notifications',
		() => {
			const headerProps = Immutable.fromJS(props).toJS();
			headerProps.notification = {
				hasUnread: false,
			};
			return <HeaderBar {...headerProps} />;
		},
		{ info: { styles: infoStyle } },
	)
	.add(
		'with help split dropdown',
		() => {
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
		},
		{ info: { styles: infoStyle } },
	)
	.add(
		'with search input',
		() => {
			const headerProps = Immutable.fromJS(props).toJS();
			headerProps.search = {
				placeholder: 'Search...',
				onBlur: action('onSearchBlur'),
				onChange: action('onSearchChange'),
			};
			return <HeaderBar {...headerProps} />;
		},
		{ info: { styles: infoStyle } },
	)
	.add(
		'while searching',
		() => {
			const headerProps = Immutable.fromJS(props).toJS();
			headerProps.search = {
				position: 'right',
				value: 'le',
				searching: true,
				onBlur: action('onSearchBlur'),
				onChange: action('onSearchChange'),
			};
			return <HeaderBar {...headerProps} />;
		},
		{ info: { styles: infoStyle } },
	)
	.add(
		'with search results',
		() => {
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
		},
		{ info: { styles: infoStyle } },
	)
	.add(
		'with no search result',
		() => {
			const headerProps = Immutable.fromJS(props).toJS();
			headerProps.search = {
				position: 'right',
				value: 'le',
				items: [],
				onBlur: action('onSearchBlur'),
				onChange: action('onSearchChange'),
			};
			return <HeaderBar {...headerProps} />;
		},
		{ info: { styles: infoStyle } },
	)
	.add(
		'with callToAction',
		() => {
			const headerProps = Immutable.fromJS(props).toJS();
			headerProps.callToAction = {
				id: 'header-call-to-action',
				bsStyle: 'info',
				className: 'btn-inverse',
				label: 'Subscribe now',
				onClick: action('onActionClick'),
			};
			return <HeaderBar {...headerProps} />;
		},
		{ info: { styles: infoStyle } },
	)
	.add(
		'without user and with information',
		() => {
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
		},
		{ info: { styles: infoStyle } },
	)
	.add(
		'intercom',
		() => (
			<HeaderBar
				logo={props.logo}
				brand={props.brand}
				{...props}
				intercom={{ id: 'intercom', config: { app_id: 'j9pqsz4w', email: 'toto@gmail.com' } }}
			/>
		),
		{ info: { styles: infoStyle } },
	)
	.add('barebone', () => <HeaderBar />, { info: { styles: infoStyle } });

const appStyle = require('../../stories/config/themes.scss');

apps.forEach(app => {
	const headerProps = Immutable.fromJS(props).toJS();
	decoratedStories.add(`🎨 [${app.toUpperCase()}] HeaderBar`, () => (
		<div className={appStyle[app]}>
			<div className={TALEND_T7_THEME_CLASSNAME}>
				<div role="banner">
					<HeaderBar {...headerProps} />
				</div>
			</div>
		</div>
	));
});
