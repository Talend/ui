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
import { DEFAULT_I18N } from '../translate';

function Logo({ isFull, getComponent, t, ...props }) {
	const icon = isFull ? 'talend-logo' : 'talend-logo-square';
	const itemClassName = classNames(theme['tc-header-bar-action'], {
		[theme.separated]: !isFull,
	});
	const actionClassName = classNames(theme['tc-header-bar-logo'], {
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

function Brand({ label, isSeparated, getComponent, ...props }) {
	const className = classNames(theme['tc-header-bar-action'], {
		[theme.separated]: isSeparated,
	});
	const Renderers = Inject.getAll(getComponent, { Action });

	return (
		<li role="presentation" className={className}>
			<span role="heading">
				<Renderers.Action
					bsStyle="link"
					className={theme['tc-header-bar-brand']}
					tooltipPlacement="bottom"
					label={label}
					{...props}
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
		theme['tc-header-bar-search'],
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
	const className = classNames(theme['tc-header-bar-action'], theme.separated);
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

function User({ name, firstName, lastName, getComponent, ...rest }) {
	const className = classNames(
		theme['tc-header-bar-action'],
		theme['tc-header-bar-user'],
		theme.separated,
	);
	const Renderers = Inject.getAll(getComponent, { ActionDropdown });

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
		<li role="presentation" className={className}>
			<Renderers.ActionDropdown
				bsStyle="link"
				icon="talend-user-circle"
				pullRight
				label={getDisplayName({ name, firstName, lastName })}
				{...rest}
			/>
		</li>
	);
}

function AppNotification({ getComponent, hasUnread, t, ...props }) {
	const className = classNames(theme['tc-header-bar-action'], theme.separated);
	const global = {
		bsStyle: 'link',
		icon: hasUnread ? 'talend-bell-notification' : 'talend-bell',
		hideLabel: true,
		label: t('HEADERBAR_NOTIFICATION', { defaultValue: 'Notifications' }),
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

function Products({ getComponent, t, ...props }) {
	const Renderers = Inject.getAll(getComponent, { ActionDropdown });
	return (
		<li role="presentation" className={theme['tc-header-bar-action']}>
			<Renderers.ActionDropdown
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
	const Components = Inject.getAll(props.getComponent, {
		Logo,
		Brand,
		Environment,
		Search,
		User,
		Information,
		Help,
		Products,
		AppNotification,
	});

	return (
		<nav className={classNames(theme['tc-header-bar'], 'tc-header-bar', 'navbar')}>
			<ul className={theme['tc-header-bar-actions']}>
				{props.logo && (
					<Components.Logo getComponent={props.getComponent} {...props.logo} t={props.t} />
				)}
				{props.brand && (
					<Components.Brand
						getComponent={props.getComponent}
						{...props.brand}
						isSeparated={!!props.env}
					/>
				)}
				{props.env && <Components.Environment getComponent={props.getComponent} {...props.env} />}
			</ul>
			<ul className={classNames(theme['tc-header-bar-actions'], theme.right)}>
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
				{!props.user &&
					props.information && (
						<Components.Information
							getComponent={props.getComponent}
							{...props.information}
							t={props.t}
						/>
					)}
				{props.user && <Components.User getComponent={props.getComponent} {...props.user} />}
				{props.products && (
					<Components.Products getComponent={props.getComponent} {...props.products} t={props.t} />
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
HeaderBar.Products = Products;
HeaderBar.displayName = 'HeaderBar';

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

	Information.propTypes = {
		renderers: PropTypes.shape({
			ActionSplitDropdown: PropTypes.func,
			Action: PropTypes.func,
		}),
		t: PropTypes.func.isRequired,
	};

	User.propTypes = {
		renderers: PropTypes.shape({ ActionDropdown: PropTypes.func }),
		name: PropTypes.string,
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		t: PropTypes.func,
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
		information: PropTypes.shape(omit(Information.propTypes, 't')),
		user: PropTypes.shape(User.propTypes),
		notification: PropTypes.shape(AppNotification.propTypes, 't'),
		products: PropTypes.shape(omit(Products.propTypes, 't')),
		getComponent: PropTypes.func,
		t: PropTypes.func,
	};
}

export default translate(I18N_DOMAIN_COMPONENTS, { i18n: DEFAULT_I18N })(HeaderBar);
