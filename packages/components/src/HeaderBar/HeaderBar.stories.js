import React from 'react';
import { action } from '@storybook/addon-actions';
import { makeDecorator } from '@storybook/addons';

import Immutable from 'immutable'; // eslint-disable-line import/no-extraneous-dependencies

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
				{story}
				<div className="container" style={{ paddingTop: 40 }} />
			</div>
		);
	},
});

export default {
	title: 'Navigation/HeaderBar',
};

export const Default = () => {
	const headerProps = Immutable.fromJS(props).toJS();
	return <HeaderBar {...headerProps} />;
};

Default.story = {
	name: 'default',
	parameters: { info: { styles: infoStyle } },
};

export const WithFullLogo = () => {
	const headerProps = Immutable.fromJS(props).toJS();
	headerProps.logo.isFull = true;
	return <HeaderBar {...headerProps} />;
};

WithFullLogo.story = {
	name: 'with full logo',
	parameters: { info: { styles: infoStyle } },
};

export const WithoutProducts = () => {
	const headerProps = Immutable.fromJS({
		...props,
		products: null,
	}).toJS();
	headerProps.logo.isFull = true;
	return <HeaderBar {...headerProps} />;
};

WithoutProducts.story = {
	name: 'without products',
	parameters: { info: { styles: infoStyle } },
};

export const WithEnvironmentDropdown = () => {
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
};

WithEnvironmentDropdown.story = {
	name: 'with environment dropdown',
	parameters: { info: { styles: infoStyle } },
};

export const WithUnreadNotifications = () => {
	const headerProps = Immutable.fromJS(props).toJS();
	headerProps.notification = {
		hasUnread: true,
	};
	return <HeaderBar {...headerProps} />;
};

WithUnreadNotifications.story = {
	name: 'with unread notifications',
	parameters: { info: { styles: infoStyle } },
};

export const WithReadNotifications = () => {
	const headerProps = Immutable.fromJS(props).toJS();
	headerProps.notification = {
		hasUnread: false,
	};
	return <HeaderBar {...headerProps} />;
};

WithReadNotifications.story = {
	name: 'with read notifications',
	parameters: { info: { styles: infoStyle } },
};

export const WithHelpSplitDropdown = () => {
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
};

WithHelpSplitDropdown.story = {
	name: 'with help split dropdown',
	parameters: { info: { styles: infoStyle } },
};

export const WithCallToAction = () => {
	const headerProps = Immutable.fromJS(props).toJS();
	headerProps.callToAction = {
		id: 'header-call-to-action',
		bsStyle: 'info',
		className: 'btn-inverse',
		label: 'Subscribe now',
		onClick: action('onActionClick'),
	};
	return <HeaderBar {...headerProps} />;
};

WithCallToAction.story = {
	name: 'with callToAction',
	parameters: { info: { styles: infoStyle } },
};

export const WithoutUserAndWithInformation = () => {
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
};

WithoutUserAndWithInformation.story = {
	name: 'without user and with information',
	parameters: { info: { styles: infoStyle } },
};

export const _Intercom = () => (
	<HeaderBar
		logo={props.logo}
		brand={props.brand}
		{...props}
		intercom={{ id: 'intercom', config: { app_id: 'j9pqsz4w', email: 'toto@gmail.com' } }}
	/>
);

_Intercom.story = {
	name: 'intercom',
	parameters: { info: { styles: infoStyle } },
};

export const Barebone = () => <HeaderBar />;

Barebone.story = {
	name: 'barebone',
	parameters: { info: { styles: infoStyle } },
};

export const CustomAppSwitcher = () => <HeaderBar AppSwitcher={AppSwitcherComponent} />;

CustomAppSwitcher.story = {
	name: 'Custom AppSwitcher',

	parameters: {
		info: { styles: infoStyle },
	},
};

export const CustomIntercom = () => <HeaderBar Intercom={IntercomComponent} />;

CustomIntercom.story = {
	parameters: {
		info: { styles: infoStyle },
	},
};
