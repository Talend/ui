import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import omit from 'lodash/omit';
import { translate } from 'react-i18next';

import Action from '../Actions/Action';
import ActionDropdown from '../Actions/ActionDropdown';
import ActionSplitDropdown from '../Actions/ActionSplitDropdown';
import Typeahead from '../Typeahead';
import theme from './HeaderBar.scss';
import I18N_DOMAIN_COMPONENTS from '../constants';
import { DEFAULT_I18N } from '../translate';

function getRenderers(renderers) {
	return Object.assign(
		{
			Action,
			ActionDropdown,
			ActionSplitDropdown,
			Typeahead,
		},
		renderers || {},
	);
}

function Logo({ isFull, renderers, t, ...props }) {
	const icon = isFull ? 'talend-logo' : 'talend-logo-square';
	const itemClassName = classNames(theme['tc-header-bar-action'], {
		[theme.separated]: !isFull,
	});
	const actionClassName = classNames(theme['tc-header-bar-logo'], {
		[theme.full]: isFull,
	});

	return (
		<li className={itemClassName}>
			<renderers.Action
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

function Brand({ label, isSeparated, renderers, ...props }) {
	const className = classNames(theme['tc-header-bar-action'], {
		[theme.separated]: isSeparated,
	});

	return (
		<li className={className}>
			<renderers.Action
				bsStyle="link"
				className={theme['tc-header-bar-brand']}
				tooltipPlacement="bottom"
				label={label}
				{...props}
			/>
		</li>
	);
}

function Environment({ renderers, ...props }) {
	return (
		<li className={theme['tc-header-bar-action']}>
			<renderers.ActionDropdown
				bsStyle="link"
				icon="talend-environment"
				tooltipPlacement="bottom"
				{...props}
			/>
		</li>
	);
}

function Search({ renderers, ...props }) {
	const className = classNames(
		theme['tc-header-bar-action'],
		theme['tc-header-bar-search'],
		theme.separated,
		theme.flex,
	);

	return (
		<li className={className}>
			<form className="navbar-form navbar-right" role="search">
				<renderers.Typeahead {...props} />
			</form>
		</li>
	);
}

function Help({ renderers, t, ...props }) {
	const global = {
		bsStyle: 'link',
		icon: 'talend-question-circle',
		label: t('HEADERBAR_HELP', { defaultValue: 'Help' }),
		tooltipPlacement: 'bottom',
		...props,
	};

	return (
		<li className={theme['tc-header-bar-action']}>
			{props.items && props.items.length ? (
				<renderers.ActionSplitDropdown pullRight {...global} />
			) : (
				<renderers.Action {...global} />
			)}
		</li>
	);
}

function User({ name, firstName, lastName, renderers, ...rest }) {
	const className = classNames(
		theme['tc-header-bar-action'],
		theme['tc-header-bar-user'],
		theme.separated,
	);

	function getDisplayName(params) {
		if (params.firstName && params.lastName) {
			return (
				<span className={classNames(theme['user-name'], 'user-name')}>
					<span className={classNames(theme['user-firstname'], 'user-firstname')}>
						{params.firstName}
					</span>
					<span className={classNames(theme['user-lastname'], 'user-lastname')}>
						{params.lastName}
					</span>
				</span>
			);
		}
		return params.name;
	}

	return (
		<li className={className}>
			<renderers.ActionDropdown
				bsStyle="link"
				icon="talend-user-circle"
				pullRight
				tooltipPlacement="bottom"
				tooltipLabel={name}
				label={getDisplayName({ name, firstName, lastName })}
				{...rest}
			/>
		</li>
	);
}

function AppNotification({ renderers, hasUnread, t, ...props }) {
	const className = classNames(theme['tc-header-bar-action'], theme.separated);
	const global = {
		bsStyle: 'link',
		icon: hasUnread ? 'talend-bell-notification' : 'talend-bell',
		hideLabel: true,
		label: t('HEADERBAR_NOTIFICATION', { defaultValue: 'Notifications' }),
		tooltipPlacement: 'bottom',
		...props,
	};
	return (
		<li className={className}>
			<renderers.Action {...global} />
		</li>
	);
}

function Products({ renderers, t, ...props }) {
	return (
		<li className={theme['tc-header-bar-action']}>
			<renderers.ActionDropdown
				bsStyle="link"
				className={theme['tc-header-bar-products']}
				icon="talend-launcher"
				label={t('HEADERBAR_APPS', { defaultValue: 'Apps' })}
				pullRight
				hideLabel
				noCaret
				tooltipPlacement="bottom"
				{...props}
			/>
		</li>
	);
}

function HeaderBar(props) {
	const renderers = getRenderers(props.renderers);
	const Components = Object.assign(
		{
			Logo,
			Brand,
			Environment,
			Search,
			User,
			Help,
			Products,
			AppNotification,
		},
		props.renderers || {},
	);

	return (
		<nav className={classNames(theme['tc-header-bar'], 'tc-header-bar', 'navbar', 'branding-primary', 'branding-reverse')}>
			<ul className={theme['tc-header-bar-actions']}>
				{props.logo && <Components.Logo renderers={renderers} {...props.logo} t={props.t} />}
				{props.brand && (
					<Components.Brand renderers={renderers} {...props.brand} isSeparated={!!props.env} />
				)}
				{props.env && <Components.Environment renderers={renderers} {...props.env} />}
			</ul>
			<ul className={classNames(theme['tc-header-bar-actions'], theme.right)}>
				{props.search && <Components.Search renderers={renderers} {...props.search} />}
				{props.help && <Components.Help renderers={renderers} {...props.help} t={props.t} />}
				{props.user && <Components.User renderers={renderers} {...props.user} />}
				{props.notification && (
					<Components.AppNotification renderers={renderers} {...props.notification} t={props.t} />
				)}
				{props.products && (
					<Components.Products renderers={renderers} {...props.products} t={props.t} />
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
HeaderBar.User = User;
HeaderBar.Products = Products;

if (process.env.NODE_ENV !== 'production') {
	Logo.propTypes = {
		isFull: PropTypes.bool,
		renderers: PropTypes.shape({
			Action: PropTypes.func,
		}),
		t: PropTypes.func.isRequired,
	};

	Brand.propTypes = {
		isSeparated: PropTypes.bool,
		renderers: PropTypes.shape({
			Action: PropTypes.func,
		}),
	};

	Environment.propTypes = {
		renderers: PropTypes.shape({
			ActionDropdown: PropTypes.func,
		}),
	};

	Search.propTypes = {
		...Typeahead.propTypes,
		renderers: PropTypes.shape({
			Typeahead: PropTypes.func,
		}),
	};

	Help.propTypes = {
		renderers: PropTypes.shape({
			ActionSplitDropdown: PropTypes.func,
			Action: PropTypes.func,
		}),
		t: PropTypes.func.isRequired,
	};

	User.propTypes = {
		renderers: PropTypes.shape({ ActionDropdown: PropTypes.func }),
		name: PropTypes.string.isRequired,
		firstName: PropTypes.string,
		lastName: PropTypes.string,
	};

	AppNotification.propTypes = {
		hasUnread: PropTypes.bool,
		renderers: PropTypes.shape({ Action: PropTypes.func }),
		t: PropTypes.func.isRequired,
	};

	Products.propTypes = {
		renderers: PropTypes.shape({ ActionDropdown: PropTypes.func }),
		t: PropTypes.func.isRequired,
	};

	HeaderBar.propTypes = {
		logo: PropTypes.shape(omit(Logo.propTypes, 't')),
		brand: PropTypes.shape(Brand.propTypes),
		env: PropTypes.shape(Environment.propTypes),
		search: PropTypes.shape(Search.propTypes),
		help: PropTypes.shape(omit(Help.propTypes, 't')),
		user: PropTypes.shape(User.propTypes),
		notification: PropTypes.shape(AppNotification.propTypes, 't'),
		products: PropTypes.shape(omit(Products.propTypes, 't')),
		renderers: PropTypes.shape({
			Logo: PropTypes.func,
			Brand: PropTypes.func,
			Environment: PropTypes.func,
			Search: PropTypes.func,
			User: PropTypes.func,
			Products: PropTypes.func,
		}),
		t: PropTypes.func,
	};
}

export default translate(I18N_DOMAIN_COMPONENTS, { i18n: DEFAULT_I18N })(HeaderBar);
