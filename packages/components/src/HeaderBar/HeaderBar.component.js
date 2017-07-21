import React from 'react';
import classNames from 'classnames';

import Action from '../Actions/Action';
import ActionDropdown from '../Actions/ActionDropdown';
import ActionSplitDropdown from '../Actions/ActionSplitDropdown';
import Typeahead from '../Typeahead';
import theme from './HeaderBar.scss';


function getComponents(Components) {
	return Object.assign(
		{
			Action,
			ActionDropdown,
			ActionSplitDropdown,
			Typeahead,
		},
		Components || {},
	);
}

function Logo({ isFull, Components, ...props }) {
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
			<Components.Action
				bsStyle="link"
				className={actionClassName}
				hideLabel
				label="Go to Portal"
				icon={icon}
				tooltipPlacement="bottom"
				{...props}
			/>
		</li>
	);
}

Logo.propTypes = {
	isFull: React.PropTypes.bool,
	Components: React.PropTypes.shape({
		Action: React.PropTypes.func,
	}),
};

function Brand({ name, isSeparated, Components, ...props }) {
	const className = classNames(
		theme['tc-header-bar-action'],
		{
			[theme.separated]: isSeparated,
		}
	);

	return (
		<li className={className}>
			<Components.Action
				bsStyle="link"
				className={theme['tc-header-bar-brand']}
				tooltipPlacement="bottom"
				label={name}
				{...props}
			/>
		</li>
	);
}

Brand.propTypes = {
	isSeparated: React.PropTypes.bool,
	Components: React.PropTypes.shape({
		Action: React.PropTypes.func,
	}),
};

function Environment({ Components, ...props }) {
	return (
		<li className={theme['tc-header-bar-action']}>
			<Components.ActionDropdown
				bsStyle="link"
				icon="talend-environment"
				tooltipPlacement="bottom"
				{...props}
			/>
		</li>
	);
}

Environment.propTypes = {
	Components: React.PropTypes.shape({
		ActionDropdown: React.PropTypes.func,
	}),
};

function Search({ Components, ...props }) {
	const className = classNames(
		theme['tc-header-bar-action'],
		theme['tc-header-bar-search'],
		theme.separated,
		theme.flex,
	);

	return (
		<li className={className}>
			<form className="navbar-form navbar-right" role="search">
				<Components.Typeahead {...props} />
			</form>
		</li>
	);
}

Search.propTypes = Typeahead.propTypes;
Search.propTypes.Components = React.PropTypes.shape({
	Typeahead: React.PropTypes.func,
});

function Help({ Components, ...props }) {
	const global = {
		bsStyle: 'link',
		icon: 'talend-question-circle',
		label: 'Help',
		tooltipPlacement: 'bottom',
		...props,
	};

	return (
		<li className={theme['tc-header-bar-action']}>
			{ props.items && props.items.length ? (
				<Components.ActionSplitDropdown pullRight {...global} />
			) : (
				<Components.Action {...global} />
			)}
		</li>
	);
}

Help.propTypes = {
	Components: React.PropTypes.shape({
		ActionSplitDropdown: React.PropTypes.func,
		Action: React.PropTypes.func,
	}),
};


function User({ name, firstName, lastName, Components, ...rest }) {
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
			<Components.ActionDropdown
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

User.propTypes = {
	Components: React.PropTypes.shape({
		ActionDropdown: React.PropTypes.func,
		name: React.PropTypes.string.isRequired,
		firstName: React.PropTypes.string,
		lastName: React.PropTypes.string,
	}),
};

function Products({ Components, ...props }) {
	return (
		<li className={theme['tc-header-bar-action']}>
			<Components.ActionDropdown
				bsStyle="link"
				className={theme['tc-header-bar-products']}
				icon="talend-launcher"
				label="Apps"
				pullRight
				hideLabel
				noCaret
				tooltipPlacement="bottom"
				{...props}
			/>
		</li>
	);
}

Products.propTypes = {
	Components: React.PropTypes.shape({
		ActionDropdown: React.PropTypes.func,
	}),
};

function HeaderBar({ logo, brand, env, search, help, user, products, renderers }) {
	const Components = Object.assign({
		Logo,
		Brand,
		Environment,
		Search,
		User,
		Help,
		Products,
	}, getComponents(renderers) || {});

	return (
		<nav className={classNames(theme['tc-header-bar'], 'tc-header-bar')}>
			<ul className={theme['tc-header-bar-actions']}>
				{ logo && <Components.Logo {...{ Components }} {...logo} />}
				{ brand && <Components.Brand {...{ Components }} isSeparated={!!env} {...brand} />}
				{ env && <Components.Environment {...{ Components }} {...env} /> }
			</ul>
			<ul className={classNames(theme['tc-header-bar-actions'], theme.right)}>
				{ search && <Components.Search {...{ Components }} {...search} /> }
				{ help && <Components.Help {...{ Components }} {...help} /> }
				{ user && <Components.User {...{ Components }} {...user} /> }
				{ products && <Components.Products {...{ Components }} {...products} /> }
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

HeaderBar.propTypes = {
	logo: React.PropTypes.shape(Logo.propTypes),
	brand: React.PropTypes.shape(Brand.propTypes),
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
};

export default HeaderBar;
