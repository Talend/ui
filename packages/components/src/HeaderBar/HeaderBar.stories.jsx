/* eslint-disable no-console */
import Immutable from 'immutable';
import assetsApi from '@talend/assets-api';
import tokens from '@talend/design-tokens';
import AppSwitcher from '../AppSwitcher';
import Icon from '../Icon';
import HeaderBar from './HeaderBar.component';

const props = {
	brand: {
		id: 'header-brand',
		label: 'Example App Name',
		onClick: () => console.log('onApplicationNameClick'),
	},
	logo: {
		id: 'header-logo',
		onClick: () => console.log('onLogoClick'),
	},
	help: {
		id: 'header-help',
		icon: 'talend-question-circle',
		onClick: () => console.log('onHelpClick'),
	},
	user: {
		id: 'header-user',
		items: [
			{
				id: 'settings',
				icon: 'talend-cog',
				label: 'Settings',
				onClick: () => console.log('onSettingsClick'),
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
		onSelect: () => console.log('onProductClick'),
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

const meta = {
	title: 'Components/Navigation/HeaderBar',
	component: HeaderBar,
	tags: ['autodocs'],
};

export default meta;

export const Default = {
	render: () => {
		const headerProps = Immutable.fromJS(props).toJS();
		return <HeaderBar {...headerProps} />;
	},
	parameters: { info: { styles: infoStyle } },
};

export const WithFullLogo = {
	render: () => {
		const headerProps = Immutable.fromJS(props).toJS();
		headerProps.logo.isFull = true;
		return <HeaderBar {...headerProps} />;
	},
	parameters: { info: { styles: infoStyle } },
};

export const WithoutProducts = {
	render: () => {
		const headerProps = Immutable.fromJS({
			...props,
			products: null,
		}).toJS();
		headerProps.logo.isFull = true;
		return <HeaderBar {...headerProps} />;
	},
	parameters: { info: { styles: infoStyle } },
};

export const WithBrandIcon = {
	render: () => {
		const headerProps = Immutable.fromJS({
			...props,
			brand: {
				...props.brand,
				icon: 'talend-tmc-negative',
			},
		}).toJS();
		return <HeaderBar {...headerProps} />;
	},
	parameters: { info: { styles: infoStyle } },
};

export const WithBrandIconUrl = {
	render: () => {
		const headerProps = Immutable.fromJS({
			...props,
			brand: {
				...props.brand,
				iconUrl: assetsApi.getURL('/src/svg/products/tmc-negative.svg', '@talend/icons'),
			},
		}).toJS();
		return <HeaderBar {...headerProps} />;
	},
	parameters: { info: { styles: infoStyle } },
};

export const WithEnvironmentDropdown = {
	render: () => {
		const headerProps = Immutable.fromJS(props).toJS();
		headerProps.env = {
			id: 'header-environment',
			items: [
				{
					label: 'Runtime Environment',
					onClick: () => console.log('onEnvClick'),
				},
			],
			label: 'Default',
		};
		return <HeaderBar {...headerProps} />;
	},
	parameters: { info: { styles: infoStyle } },
};

export const WithUnreadNotifications = {
	render: () => {
		const headerProps = Immutable.fromJS(props).toJS();
		headerProps.notification = {
			hasUnread: true,
		};
		return <HeaderBar {...headerProps} />;
	},
	parameters: { info: { styles: infoStyle } },
};

export const WithReadNotifications = {
	render: () => {
		const headerProps = Immutable.fromJS(props).toJS();
		headerProps.notification = {
			hasUnread: false,
		};
		return <HeaderBar {...headerProps} />;
	},
	parameters: { info: { styles: infoStyle } },
};

export const WithHelpSplitDropdown = {
	render: () => {
		const headerProps = Immutable.fromJS(props).toJS();
		headerProps.help.items = [
			{
				icon: 'talend-board',
				label: 'Onboarding',
				onClick: () => console.log('onOnboardingClick'),
			},
			{
				icon: 'talend-cog',
				label: 'About',
				onClick: () => console.log('onAboutClick'),
			},
		];
		return <HeaderBar {...headerProps} />;
	},
	parameters: { info: { styles: infoStyle } },
};

export const WithCallToAction = {
	render: () => {
		const headerProps = Immutable.fromJS(props).toJS();
		headerProps.callToAction = {
			bsStyle: 'info',
			className: 'btn-inverse',
			id: 'header-call-to-action',
			label: 'Subscribe now',
			onClick: () => console.log('onActionClick'),
		};
		return <HeaderBar {...headerProps} />;
	},
	parameters: { info: { styles: infoStyle } },
};

export const WithGenericAction = {
	render: () => {
		const headerProps = Immutable.fromJS(props).toJS();
		headerProps.genericAction = {
			bsStyle: 'link',
			id: 'header-generic-action',
			icon: 'talend-info-circle',
			label: 'Talend Experience',
			onClick: () => console.log('onActionClick'),
		};
		return <HeaderBar {...headerProps} />;
	},
	parameters: { info: { styles: infoStyle } },
};

export const WithoutUserAndWithInformation = {
	render: () => {
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
					onClick: () => console.log('onOnboardingClick'),
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
	parameters: { info: { styles: infoStyle } },
};

export const Intercom = {
	render: () => (
		<HeaderBar
			logo={props.logo}
			brand={props.brand}
			{...props}
			intercom={{ id: 'intercom', config: { app_id: 'j9pqsz4w', email: 'toto@gmail.com' } }}
		/>
	),
	parameters: { info: { styles: infoStyle } },
};

export const Barebone = {
	render: () => <HeaderBar />,
	parameters: { info: { styles: infoStyle } },
};

export const CustomAppSwitcher = {
	render: () => <HeaderBar AppSwitcher={AppSwitcherComponent} />,
	parameters: { info: { styles: infoStyle } },
};

export const CustomIntercom = {
	render: () => <HeaderBar Intercom={IntercomComponent} />,
	parameters: { info: { styles: infoStyle } },
};
