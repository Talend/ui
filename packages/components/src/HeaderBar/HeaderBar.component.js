import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Action from '../Actions/Action';
import ActionDropdown from '../Actions/ActionDropdown';
import ActionSplitDropdown from '../Actions/ActionSplitDropdown';
import Typeahead from '../Typeahead';
import theme from './HeaderBar.scss';


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

function Logo({ isFull, renderers, ...props }) {
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
				label="Go to Portal"
				icon={icon}
				tooltipPlacement="bottom"
				{...props}
			/>
		</li>
	);
}

Logo.propTypes = {
	isFull: PropTypes.bool,
	renderers: PropTypes.shape({
		Action: PropTypes.func,
	}),
};

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

Brand.propTypes = {
	isSeparated: PropTypes.bool,
	renderers: PropTypes.shape({
		Action: PropTypes.func,
	}),
};

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

Environment.propTypes = {
	renderers: PropTypes.shape({
		ActionDropdown: PropTypes.func,
	}),
};

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

Search.propTypes = Typeahead.propTypes;
Search.propTypes.renderers = PropTypes.shape({
	Typeahead: PropTypes.func,
});

function Help({ renderers, ...props }) {
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
				<renderers.ActionSplitDropdown pullRight {...global} />
			) : (
				<renderers.Action {...global} />
			)}
		</li>
	);
}

Help.propTypes = {
	renderers: PropTypes.shape({
		ActionSplitDropdown: PropTypes.func,
		Action: PropTypes.func,
	}),
};


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

User.propTypes = {
	renderers: PropTypes.shape({
		ActionDropdown: PropTypes.func,
		name: PropTypes.string.isRequired,
		firstName: PropTypes.string,
		lastName: PropTypes.string,
	}),
};

function Products({ renderers, ...props }) {
	return (
		<li className={theme['tc-header-bar-action']}>
			<renderers.ActionDropdown
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
	renderers: PropTypes.shape({
		ActionDropdown: PropTypes.func,
	}),
};

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
				{ props.logo && <Components.Logo renderers={renderers} {...props.logo} /> }
				{ props.brand &&
				<Components.Brand renderers={renderers} {...props.brand} isSeparated={!!props.env} /> }
				{ props.env && <Components.Environment renderers={renderers} {...props.env} /> }
			</ul>
			<ul className={classNames(theme['tc-header-bar-actions'], theme.right)}>
				{ props.search && <Components.Search renderers={renderers} {...props.search} /> }
				{ props.help && <Components.Help renderers={renderers} {...props.help} /> }
				{ props.user && <Components.User renderers={renderers} {...props.user} /> }
				{ props.products && <Components.Products renderers={renderers} {...props.products} /> }
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
	logo: PropTypes.shape(Logo.propTypes),
	brand: PropTypes.shape(Brand.propTypes),
	env: PropTypes.shape(Environment.propTypes),
	search: PropTypes.shape(Search.propTypes),
	help: PropTypes.shape(Help.propTypes),
	user: PropTypes.shape(User.propTypes),
	products: PropTypes.shape(Products.propTypes),
	renderers: PropTypes.shape({
		Logo: PropTypes.func,
		Brand: PropTypes.func,
		Environment: PropTypes.func,
		Search: PropTypes.func,
		User: PropTypes.func,
		Products: PropTypes.func,
	}),
};

export default HeaderBar;
