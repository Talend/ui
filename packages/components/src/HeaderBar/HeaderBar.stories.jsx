import { action } from 'storybook/actions';
import Immutable from 'immutable';

import assetsApi from '@talend/assets-api';
import tokens from '@talend/design-tokens';

import AppSwitcher from '../AppSwitcher';
// eslint-disable-line import/no-extraneous-dependencies
import Icon from '../Icon';
import HeaderBar from './HeaderBar.component';

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
				icon: 'talend-tdp-negative',
				key: 'tdp',
				label: 'Data Preparation',
			},
			{
				icon: 'talend-tic-negative',
				key: 'tic',
				label: 'Integration Cloud',
			},
			{
				icon: 'talend-tmc-negative',
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
		width: '2rem',
		height: '2rem',
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

export default {
	title: 'Components/Navigation/HeaderBar',
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

export const WithBrandIcon = () => {
	const headerProps = Immutable.fromJS({
		...props,
		brand: {
			...props.brand,
			icon: 'talend-tmc-negative',
		},
	}).toJS();
	return <HeaderBar {...headerProps} />;
};

WithBrandIcon.story = {
	name: 'with brand icon',
	parameters: { info: { styles: infoStyle } },
};

export const WithBrandIconUrl = () => {
	const headerProps = Immutable.fromJS({
		...props,
		brand: {
			...props.brand,
			iconUrl: assetsApi.getURL('/src/svg/products/tmc-negative.svg', '@talend/icons'),
		},
	}).toJS();
	return <HeaderBar {...headerProps} />;
};

WithBrandIconUrl.story = {
	name: 'with brand icon url',
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
		bsStyle: 'info',
		className: 'btn-inverse',
		id: 'header-call-to-action',
		label: 'Subscribe now',
		onClick: action('onActionClick'),
	};
	return <HeaderBar {...headerProps} />;
};

WithCallToAction.story = {
	name: 'with callToAction',
	parameters: { info: { styles: infoStyle } },
};

export const WithGenericAction = () => {
	const headerProps = Immutable.fromJS(props).toJS();
	headerProps.genericAction = {
		bsStyle: 'link',
		id: 'header-generic-action',
		icon: 'talend-info-circle',
		label: 'Talend Experience',
		onClick: action('onActionClick'),
	};
	return <HeaderBar {...headerProps} />;
};

WithGenericAction.story = {
	name: 'with genericAction',
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
