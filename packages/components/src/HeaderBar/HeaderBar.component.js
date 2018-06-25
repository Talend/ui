import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import omit from 'lodash/omit';
import { translate } from 'react-i18next';

import Inject from '../Inject';
import Action from '../Actions/Action';
import ActionDropdown from '../Actions/ActionDropdown';
import Typeahead from '../Typeahead';
import theme from './HeaderBar.scss';
import I18N_DOMAIN_COMPONENTS from '../constants';
import '../translate';

function Logo({ isFull, getComponent, t, ...props }) {
	const icon = isFull ? 'talend-logo' : 'talend-logo-square';
	const itemClassName = classNames(theme['tc-header-bar-action'], {
		[theme.separated]: !isFull,
	});
	const actionClassName = classNames(theme['tc-header-bar-logo'], 'tc-header-bar-logo', {
		[theme.full]: isFull,
	});
	const Renderers = Inject.getAll(getComponent, { Action });
	return (
		<li role="presentation" className={itemClassName}>
			<Renderers.Action
				bsStyle="link"
				className={actionClassName}
				hideLabel
				label={t('HEADERBAR_GO_PORTAL', { defaultValue: 'Go to Portal' })}
				icon={icon}
				tooltipPlacement="bottom"
				{...props}
			/>
		</li>
	);
}

function Brand({ label, isSeparated, getComponent, t, ...props }) {
	const className = classNames(theme['tc-header-bar-action'], {
		[theme.separated]: isSeparated,
	});
	const Renderers = Inject.getAll(getComponent, { ActionDropdown, Action });

	let ActionComponent;
	let clickAction;
	let ariaLabel;
	if (props && props.items) {
		ActionComponent = Renderers.ActionDropdown;
		ariaLabel = t('HEADER_BAR_APP_SWITCHER', {
			defaultValue: 'Switch to another application. Current application: {{appName}}',
			appName: label,
		});
	} else {
		ActionComponent = Renderers.Action;
		clickAction = props.onClick;
	}

	return (
		<li role="presentation" className={className}>
			<span role="heading">
				<ActionComponent
					bsStyle="link"
					className={classNames(theme['tc-header-bar-brand'], 'tc-header-bar-brand')}
					tooltipPlacement="bottom"
					label={label}
					{...props}
					aria-label={ariaLabel}
					onClick={clickAction}
				/>
			</span>
		</li>
	);
}

function Environment({ getComponent, ...props }) {
	const Renderers = Inject.getAll(getComponent, { ActionDropdown });
	return (
		<li role="presentation" className={theme['tc-header-bar-action']}>
			<Renderers.ActionDropdown
				bsStyle="link"
				icon="talend-environment"
				tooltipPlacement="bottom"
				{...props}
			/>
		</li>
	);
}

function Search({ getComponent, ...props }) {
	const className = classNames(
		theme['tc-header-bar-action'],
		'tc-header-bar-action',
		theme['tc-header-bar-search'],
		'tc-header-bar-search',
		theme.separated,
		theme.flex,
	);
	const Renderers = Inject.getAll(getComponent, { Typeahead });

	return (
		<li role="presentation" className={className}>
			<form className="navbar-form navbar-right" role="search">
				<Renderers.Typeahead {...props} />
			</form>
		</li>
	);
}

function Help({ getComponent, t, ...props }) {
	const global = {
		bsStyle: 'link',
		icon: 'talend-question-circle',
		label: t('HEADERBAR_HELP', { defaultValue: 'Help' }),
		tooltipPlacement: 'bottom',
		...props,
	};
	const className = classNames(
		theme['tc-header-bar-action'],
		'tc-header-bar-help',
		theme.separated,
	);
	const Renderers = Inject.getAll(getComponent, { Action });

	return (
		<li role="presentation" className={className}>
			<Renderers.Action {...global} />
		</li>
	);
}

function Information({ getComponent, t, ...props }) {
	const global = {
		bsStyle: 'link',
		icon: 'talend-info-circle',
		label: t('HEADERBAR_INFO', { defaultValue: 'Information' }),
		tooltipPlacement: 'bottom',
		...props,
	};
	const className = classNames(
		theme['tc-header-bar-action'],
		'tc-header-bar-action',
		theme.separated,
	);
	const Renderers = Inject.getAll(getComponent, { Action, ActionDropdown });

	return (
		<li role="presentation" className={className}>
			{props.items && props.items.length ? (
				<Renderers.ActionDropdown pullRight noCaret hideLabel {...global} />
			) : (
				<Renderers.Action hideLabel {...global} />
			)}
		</li>
	);
}

function User({ name, firstName, lastName, getComponent, t, ...rest }) {
	const className = classNames(
		theme['tc-header-bar-action'],
		theme['tc-header-bar-user'],
		'tc-header-bar-user',
		theme.separated,
	);
	const Renderers = Inject.getAll(getComponent, { ActionDropdown });

	function getDisplayName(params) {
		if (params.firstName && params.lastName) {
			return `${params.firstName} ${params.lastName}`;
		}
		return params.name;
	}

	const displayName = getDisplayName({ name, firstName, lastName });
	const ariaLabel = t('HEADERBAR_USER_MENU', {
		defaultValue: 'Open user menu. Current user: {{name}}',
		name: displayName,
	});

	return (
		<li role="presentation" className={className}>
			<Renderers.ActionDropdown
				bsStyle="link"
				icon="talend-user-circle"
				pullRight
				label={displayName}
				aria-label={ariaLabel}
				{...rest}
			/>
		</li>
	);
}

function AppNotification({ getComponent, hasUnread, t, ...props }) {
	const className = classNames(theme['tc-header-bar-action'], theme.separated);

	let icon;
	let label;
	if (hasUnread) {
		icon = 'talend-bell-notification';
		label = t('HEADERBAR_NOTIFICATION_UNREAD', {
			defaultValue: 'Notifications (you have unread notifications)',
		});
	} else {
		icon = 'talend-bell';
		label = t('HEADERBAR_NOTIFICATION', {
			defaultValue: "Notifications (you don't have unread notifications)",
		});
	}

	const global = {
		bsStyle: 'link',
		hideLabel: true,
		icon,
		label,
		tooltipPlacement: 'bottom',
		...props,
	};
	const Renderers = Inject.getAll(getComponent, { Action });

	return (
		<li role="presentation" className={className}>
			<Renderers.Action {...global} />
		</li>
	);
}

function HeaderBar(props) {
	const Components = Inject.getAll(props.getComponent, {
		Logo,
		Brand,
		Environment,
		Search,
		User,
		Information,
		Help,
		AppNotification,
	});

	return (
		<nav className={classNames(theme['tc-header-bar'], 'tc-header-bar', 'navbar')}>
			<ul
				className={classNames(
					theme['tc-header-bar-actions'],
					'tc-header-bar-actions',
					'navbar-nav',
				)}
			>
				{props.logo && (
					<Components.Logo getComponent={props.getComponent} {...props.logo} t={props.t} />
				)}
				{props.brand && (
					<Components.Brand
						getComponent={props.getComponent}
						{...props.brand}
						{...props.products}
						isSeparated={!!props.env}
						t={props.t}
					/>
				)}
				{props.env && <Components.Environment getComponent={props.getComponent} {...props.env} />}
			</ul>
			<ul
				className={classNames(
					theme['tc-header-bar-actions'],
					'tc-header-bar-actions',
					'navbar-nav',
					theme.right,
				)}
			>
				{props.search && <Components.Search getComponent={props.getComponent} {...props.search} />}
				{props.notification && (
					<Components.AppNotification
						getComponent={props.getComponent}
						{...props.notification}
						t={props.t}
					/>
				)}
				{props.help && (
					<Components.Help getComponent={props.getComponent} {...props.help} t={props.t} />
				)}
				{!props.user && props.information && (
					<Components.Information
						getComponent={props.getComponent}
						{...props.information}
						t={props.t}
					/>
				)}
				{props.user && (
					<Components.User getComponent={props.getComponent} {...props.user} t={props.t} />
				)}
			</ul>
		</nav>
	);
}

HeaderBar.Logo = Logo;
HeaderBar.Brand = Brand;
HeaderBar.Environment = Environment;
HeaderBar.Search = Search;
HeaderBar.Help = Help;
HeaderBar.Information = Information;
HeaderBar.User = User;
HeaderBar.displayName = 'HeaderBar';

if (process.env.NODE_ENV !== 'production') {
	Logo.propTypes = {
		getComponent: PropTypes.func,
		isFull: PropTypes.bool,
		renderers: PropTypes.shape({
			Action: PropTypes.func,
		}),
		t: PropTypes.func.isRequired,
	};

	Brand.propTypes = {
		onClick: PropTypes.func,
		getComponent: PropTypes.func,
		isSeparated: PropTypes.bool,
		items: PropTypes.array,
		label: PropTypes.string,
		renderers: PropTypes.shape({
			Action: PropTypes.func,
		}),
		t: PropTypes.func.isRequired,
	};

	Environment.propTypes = {
		getComponent: PropTypes.func,
		renderers: PropTypes.shape({
			ActionDropdown: PropTypes.func,
		}),
	};

	Search.propTypes = {
		...Typeahead.propTypes,
		getComponent: PropTypes.func,
		renderers: PropTypes.shape({
			Typeahead: PropTypes.func,
		}),
	};

	Help.propTypes = {
		getComponent: PropTypes.func,
		renderers: PropTypes.shape({
			ActionSplitDropdown: PropTypes.func,
			Action: PropTypes.func,
		}),
		t: PropTypes.func.isRequired,
	};

	Information.propTypes = {
		getComponent: PropTypes.func,
		items: PropTypes.array,
		renderers: PropTypes.shape({
			ActionSplitDropdown: PropTypes.func,
			Action: PropTypes.func,
		}),
		t: PropTypes.func.isRequired,
	};

	User.propTypes = {
		getComponent: PropTypes.func,
		renderers: PropTypes.shape({ ActionDropdown: PropTypes.func }),
		name: PropTypes.string,
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		t: PropTypes.func,
	};

	AppNotification.propTypes = {
		getComponent: PropTypes.func,
		hasUnread: PropTypes.bool,
		renderers: PropTypes.shape({ Action: PropTypes.func }),
		t: PropTypes.func.isRequired,
	};

	HeaderBar.propTypes = {
		logo: PropTypes.shape(omit(Logo.propTypes, 't')),
		brand: PropTypes.shape(Brand.propTypes),
		env: PropTypes.shape(Environment.propTypes),
		search: PropTypes.shape(Search.propTypes),
		help: PropTypes.shape(omit(Help.propTypes, 't')),
		information: PropTypes.shape(omit(Information.propTypes, 't')),
		user: PropTypes.shape(User.propTypes),
		notification: PropTypes.shape(omit(AppNotification.propTypes, 't')),
		products: PropTypes.shape({
			items: PropTypes.array,
			onSelect: PropTypes.func,
		}),
		getComponent: PropTypes.func,
		t: PropTypes.func,
	};
}

export default translate(I18N_DOMAIN_COMPONENTS)(HeaderBar);
