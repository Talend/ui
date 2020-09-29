import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import { makeDecorator } from '@storybook/addons';

import Immutable from 'immutable'; // eslint-disable-line import/no-extraneous-dependencies

import IconsProvider from '../IconsProvider';
import Icon from '../Icon';
import HeaderBar from './HeaderBar.component';
import AppSwitcher from '../AppSwitcher';
import Layout from '../Layout';

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

function AppSwitcherComponent() {
	return <AppSwitcher {...props.brand} />;
}

function IntercomComponent() {
	const style = {
		color: 'white',
		margin: '0 10px',
		width: '3.2rem',
		height: '3.2rem',
		borderRadius: '50%',
		background: 'green',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	};

	return (
		<div style={style}>
			<Icon name="talend-bubbles" />
		</div>
	);
}

const withIcons = makeDecorator({
	name: 'withIcons',
	wrapper: (getStory, context) => {
		const story = getStory(context);
		return (
			<div>
				<IconsProvider />
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
	.add('barebone', () => <HeaderBar />, { info: { styles: infoStyle } })
	.add('Custom AppSwitcher', () => <HeaderBar AppSwitcher={AppSwitcherComponent} />, {
		info: { styles: infoStyle },
	})
	.add('Custom Intercom', () => <HeaderBar Intercom={IntercomComponent} />, {
		info: { styles: infoStyle },
	});

const appStyle = require('../../stories/config/themes.scss');

Layout.TALEND_T7_THEME_APPS.forEach(app => {
	const headerProps = Immutable.fromJS(props).toJS();
	if (app.toLocaleLowerCase() === 'portal') {
		headerProps.logo.isFull = true;
	}
	decoratedStories.add(`🎨 [${app.toUpperCase()}] HeaderBar`, () => (
		<div className={appStyle[app]}>
			<div className={Layout.TALEND_T7_THEME_CLASSNAME}>
				<div role="banner">
					<HeaderBar {...headerProps} />
				</div>
			</div>
		</div>
	));
});
