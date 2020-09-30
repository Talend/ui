import PropTypes from 'prop-types';
import React from 'react';
import omit from 'lodash/omit';
import { withTranslation } from 'react-i18next';

import Inject from '../Inject';
import Action from '../Actions/Action';
import ActionIntercom from '../ActionIntercom';
import ActionDropdown from '../Actions/ActionDropdown';
import Typeahead from '../Typeahead';
import I18N_DOMAIN_COMPONENTS from '../constants';
import getDefaultT from '../translate';
import { getTheme } from '../theme';
import AppSwitcher from '../AppSwitcher';

import headerBarCssModule from './HeaderBar.scss';

const theme = getTheme(headerBarCssModule);

function Logo({ isFull, getComponent, t, ...props }) {
	const icon = isFull ? 'talend-logo' : 'talend-logo-square';
	const itemClassName = theme('tc-header-bar-action', 'separated');
	const actionClassName = theme('tc-header-bar-logo', {
		full: isFull,
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

function Environment({ getComponent, ...props }) {
	const Renderers = Inject.getAll(getComponent, { ActionDropdown });
	return (
		<li role="presentation" className={theme('tc-header-bar-action')}>
			<Renderers.ActionDropdown
				bsStyle="link"
				icon="talend-environment"
				tooltipPlacement="bottom"
				{...props}
			/>
		</li>
	);
}

function CallToAction({ getComponent, ...props }) {
	const actionProps = {
		bsStyle: 'info',
		className: 'btn-inverse',
		tooltipPlacement: 'bottom',
		...props,
	};
	const className = theme('tc-header-bar-action', 'tc-header-bar-call-to-action', 'separated');
	const Renderers = Inject.getAll(getComponent, { Action });
	return (
		<li role="presentation" className={className}>
			<Renderers.Action {...actionProps} />
		</li>
	);
}

function Search({ getComponent, icon, ...props }) {
	const className = theme('tc-header-bar-action', 'tc-header-bar-search', 'separated');
	const Renderers = Inject.getAll(getComponent, { Typeahead });
	const a11yIcon = icon && { ...icon, role: 'search' };

	return (
		<li role="presentation" className={className}>
			<form className="navbar-form navbar-right">
				<Renderers.Typeahead {...props} role="searchbox" icon={a11yIcon} />
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
	const className = theme('tc-header-bar-action', 'tc-header-bar-help', 'separated');
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
	const className = theme('tc-header-bar-action', 'separated');
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
	const className = theme('tc-header-bar-action', 'tc-header-bar-user', 'separated');
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
	const className = theme('tc-header-bar-action', 'separated');

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

function Intercom({ id, config, tooltipPlacement }) {
	return (
		<ActionIntercom
			className={theme('tc-header-bar-intercom-default-component', 'btn', 'btn-link')}
			id={id}
			config={React.useMemo(() => ({ ...config, vertical_padding: 70 }), [config])}
			tooltipPlacement={tooltipPlacement}
		/>
	);
}

function HeaderBar(props) {
	const Components = Inject.getAll(props.getComponent, {
		Logo,
		Environment,
		CallToAction,
		Search,
		User,
		Information,
		Help,
		AppNotification,
		Intercom,
	});

	if (props.brand && props.products) {
		console.warn('Deprecated: use @talend/ui-ee/AppSwitcher');
	}

	const AppSwitcherComponent =
		props.AppSwitcher || Inject.get(props.getComponent, 'AppSwitcher', AppSwitcher);

	let intercom;
	const { Intercom: CustomIntercom } = props;
	if (CustomIntercom) {
		intercom = <CustomIntercom />;
	} else if (props.intercom) {
		console.warn('Deprecated: use @talend/ui-ee/Intercom');
		intercom = <Components.Intercom getComponent={props.getComponent} {...props.intercom} />;
	}

	return (
		<nav className={theme('tc-header-bar', 'navbar')}>
			<ul className={theme('tc-header-bar-actions', 'navbar-nav')}>
				{props.logo && (
					<Components.Logo getComponent={props.getComponent} {...props.logo} t={props.t} />
				)}
				<AppSwitcherComponent {...props.brand} {...props.products} isSeparated={!!props.env} />
				{props.env && <Components.Environment getComponent={props.getComponent} {...props.env} />}
			</ul>
			<ul className={theme('tc-header-bar-actions', 'navbar-nav', 'right')}>
				{props.callToAction && (
					<Components.CallToAction getComponent={props.getComponent} {...props.callToAction} />
				)}
				{props.search && <Components.Search getComponent={props.getComponent} {...props.search} />}
				{props.notification && (
					<Components.AppNotification
						getComponent={props.getComponent}
						{...props.notification}
						t={props.t}
					/>
				)}
				{intercom && (
					<li
						role="presentation"
						className={theme('tc-header-bar-intercom', 'tc-header-bar-action', 'separated')}
					>
						{intercom}
					</li>
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
HeaderBar.Environment = Environment;
HeaderBar.CallToAction = CallToAction;
HeaderBar.Search = Search;
HeaderBar.Help = Help;
HeaderBar.Information = Information;
HeaderBar.User = User;
HeaderBar.displayName = 'HeaderBar';

HeaderBar.defaultProps = {
	t: getDefaultT(),
};

if (process.env.NODE_ENV !== 'production') {
	Logo.propTypes = {
		getComponent: PropTypes.func,
		isFull: PropTypes.bool,
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

	CallToAction.propTypes = {
		getComponent: PropTypes.func,
		renders: PropTypes.shape({
			Action: PropTypes.func,
		}),
	};

	Search.propTypes = {
		...Typeahead.propTypes,
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
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		getComponent: PropTypes.func,
		name: PropTypes.string,
		renderers: PropTypes.shape({ ActionDropdown: PropTypes.func }),
		t: PropTypes.func,
	};

	AppNotification.propTypes = {
		getComponent: PropTypes.func,
		hasUnread: PropTypes.bool,
		renderers: PropTypes.shape({ Action: PropTypes.func }),
		t: PropTypes.func.isRequired,
	};

	Intercom.propTypes = {
		id: PropTypes.string.isRequired,
		config: PropTypes.object.isRequired,
		tooltipPlacement: PropTypes.string,
	};

	HeaderBar.propTypes = {
		AppSwitcher: PropTypes.func,
		Intercom: PropTypes.func,
		logo: PropTypes.shape(omit(Logo.propTypes, 't')),
		brand: PropTypes.shape({
			isSeparated: PropTypes.bool,
			renderers: PropTypes.shape({
				Action: PropTypes.func,
			}),
		}),
		env: PropTypes.shape(Environment.propTypes),
		callToAction: PropTypes.shape(CallToAction.propTypes),
		search: PropTypes.shape(Search.propTypes),
		help: PropTypes.shape(omit(Help.propTypes, 't')),
		information: PropTypes.shape(omit(Information.propTypes, 't')),
		intercom: PropTypes.shape(Intercom.propTypes),
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

export default withTranslation(I18N_DOMAIN_COMPONENTS)(HeaderBar);
