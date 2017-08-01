import React from 'react';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import i18n from 'i18next';

import Action from '../Actions/Action';
import ActionDropdown from '../Actions/ActionDropdown';
import ActionSplitDropdown from '../Actions/ActionSplitDropdown';
import Typeahead from '../Typeahead';
import theme from './HeaderBar.scss';
import NAME_SPACE_I18N_COMPONENTS from '../utils/nameSpaceI18n';

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
	const itemClassName = classNames(
		theme['tc-header-bar-action'],
		{
			[theme.separated]: !isFull,
		},
	);
	const actionClassName = classNames(
		theme['tc-header-bar-logo'],
		{
			[theme.full]: isFull,
		}
	);

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

function Brand({ name, isSeparated, renderers, ...props }) {
	const className = classNames(
		theme['tc-header-bar-action'],
		{
			[theme.separated]: isSeparated,
		}
	);

	return (
		<li className={className}>
			<renderers.Action
				bsStyle="link"
				className={theme['tc-header-bar-brand']}
				tooltipPlacement="bottom"
				label={name}
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
			{ props.items && props.items.length ? (
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
					<span className={classNames(theme['user-firstname'], 'user-firstname')}>{params.firstName}</span>
					<span className={classNames(theme['user-lastname'], 'user-lastname')}>{params.lastName}</span>
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
	const Components = Object.assign({
		Logo,
		Brand,
		Environment,
		Search,
		User,
		Help,
		Products,
	}, props.renderers || {});

	return (
		<nav className={classNames(theme['tc-header-bar'], 'tc-header-bar')}>
			<ul className={theme['tc-header-bar-actions']}>
				{ props.logo && <Components.Logo renderers={renderers} {...props.logo} t={props.t} /> }
				{ props.brand &&
				<Components.Brand renderers={renderers} {...props.brand} isSeparated={!!props.env} /> }
				{ props.env && <Components.Environment renderers={renderers} {...props.env} /> }
			</ul>
			<ul className={classNames(theme['tc-header-bar-actions'], theme.right)}>
				{ props.search && <Components.Search renderers={renderers} {...props.search} /> }
				{ props.help && <Components.Help renderers={renderers} {...props.help} t={props.t} /> }
				{ props.user && <Components.User renderers={renderers} {...props.user} /> }
				{
					props.products &&
					<Components.Products renderers={renderers} {...props.products} t={props.t} />
				}
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
		isFull: React.PropTypes.bool,
		renderers: React.PropTypes.shape({
			Action: React.PropTypes.func,
		}),
		t: React.PropTypes.func.isRequired,
	};

	Brand.propTypes = {
		isSeparated: React.PropTypes.bool,
		renderers: React.PropTypes.shape({
			Action: React.PropTypes.func,
		}),
	};

	Environment.propTypes = {
		renderers: React.PropTypes.shape({
			ActionDropdown: React.PropTypes.func,
		}),
	};

	Search.propTypes = {
		...Typeahead.propTypes,
		renderers: React.PropTypes.shape({
			Typeahead: React.PropTypes.func,
		}),
	};

	Help.propTypes = {
		renderers: React.PropTypes.shape({
			ActionSplitDropdown: React.PropTypes.func,
			Action: React.PropTypes.func,
		}),
		t: React.PropTypes.func.isRequired,
	};

	User.propTypes = {
		renderers: React.PropTypes.shape({
			ActionDropdown: React.PropTypes.func,
			name: React.PropTypes.string.isRequired,
			firstName: React.PropTypes.string,
			lastName: React.PropTypes.string,
		}),
	};

	Products.propTypes = {
		renderers: React.PropTypes.shape({
			ActionDropdown: React.PropTypes.func,
		}),
		t: React.PropTypes.func.isRequired,
	};

	HeaderBar.propTypes = {
		logo: React.PropTypes.shape(Logo.propTypes).isRequired,
		brand: React.PropTypes.shape(Brand.propTypes).isRequired,
		env: React.PropTypes.shape(Environment.propTypes),
		search: React.PropTypes.shape(Search.propTypes),
		help: React.PropTypes.shape(Help.propTypes),
		user: React.PropTypes.shape(User.propTypes),
		products: React.PropTypes.shape(Products.propTypes),
		renderers: React.PropTypes.shape({
			Logo: React.PropTypes.func,
			Brand: React.PropTypes.func,
			Environment: React.PropTypes.func,
			Search: React.PropTypes.func,
			User: React.PropTypes.func,
			Products: React.PropTypes.func,
		}),
		t: React.PropTypes.func, // react-i18next
	};
}

export {
	HeaderBar,
};

export default translate(NAME_SPACE_I18N_COMPONENTS, { i18n })(HeaderBar);
