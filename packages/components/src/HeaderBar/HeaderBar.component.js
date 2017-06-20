import React from 'react';
import classNames from 'classnames';

import Action from '../Actions/Action';
import ActionDropdown from '../Actions/ActionDropdown';
import Typeahead from '../Typeahead';
import theme from './HeaderBar.scss';


function getRenderers(renderers) {
	return Object.assign(
		{
			Action,
			ActionDropdown,
			Typeahead,
		},
		renderers || {},
	);
}

function Logo({ isFull, renderers, ...props }) {
	const Components = getRenderers(renderers);
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
	const icon = isFull ? 'talend-logo' : 'talend-logo-square';

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
	renderers: React.PropTypes.shape({
		Action: React.PropTypes.func,
	}),
};

function Brand({ name, isSeparated, renderers, ...props }) {
	const className = classNames(
		theme['tc-header-bar-action'],
		{
			[theme.separated]: isSeparated,
		}
	);

	const Components = getRenderers(renderers);
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
	renderers: React.PropTypes.shape({
		Action: React.PropTypes.func,
	}),
};

function Environment({ renderers, ...props }) {
	const Components = getRenderers(renderers);
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
	renderers: React.PropTypes.shape({
		ActionDropdown: React.PropTypes.func,
	}),
};

function Search({ renderers, ...props }) {
	const Components = getRenderers(renderers);
	const className = classNames(
		theme['tc-header-bar-action'],
		theme.separated,
		theme.flex,
	);

	return (
		<li className={className}>
			<Components.Typeahead {...props} />
		</li>
	);
}

Search.propTypes = Typeahead.propTypes;
Search.propTypes.renderers = React.PropTypes.shape({
	Typeahead: React.PropTypes.func,
});

function Help({ renderers, ...props }) {
	const Components = getRenderers(renderers);
	return (
		<li className={theme['tc-header-bar-action']}>
			<Components.Action
				bsStyle="link"
				icon="talend-question-circle"
				label="Help"
				tooltipPlacement="bottom"
				{...props}
			/>
		</li>
	);
}

Help.propTypes = {
	renderers: React.PropTypes.shape({
		Action: React.PropTypes.func,
	}),
};

function User({ name, renderers, ...props }) {
	const Components = getRenderers(renderers);
	const className = classNames(
		theme['tc-header-bar-action'],
		theme.separated,
	);

	return (
		<li className={className}>
			<Components.ActionDropdown
				bsStyle="link"
				icon="talend-user-circle"
				noCaret
				tooltipPlacement="bottom"
				label={name}
				{...props}
			/>
		</li>
	);
}

User.propTypes = {
	renderers: React.PropTypes.shape({
		ActionDropdown: React.PropTypes.func,
	}),
};

function Products({ renderers, ...props }) {
	const Components = getRenderers(renderers);
	return (
		<li className={theme['tc-header-bar-action']}>
			<Components.ActionDropdown
				bsStyle="link"
				className={theme['tc-header-bar-products']}
				icon="talend-launcher"
				label="Apps"
				noCaret
				pullRight
				tooltipPlacement="bottom"
				{...props}
			/>
		</li>
	);
}

Products.propTypes = {
	renderers: React.PropTypes.shape({
		ActionDropdown: React.PropTypes.func,
	}),
};

function HeaderBar(props) {
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
				<Components.Logo renderers={props.renderers} {...props.logo} />
				<Components.Brand renderers={props.renderers} {...props.brand} isSeparated={!!props.env} />
				{props.env && (<Components.Environment renderers={props.renderers} {...props.env} />)}
			</ul>
			<ul className={classNames(theme['tc-header-bar-actions'], theme.right)}>
				{props.search && (
					<Components.Search renderers={props.renderers} {...props.search} />
				)}
				{props.help && (
					<Components.Help renderers={props.renderers} {...props.help} />
				)}
				{props.user && (
					<Components.User renderers={props.renderers} {...props.user} />
				)}
				{props.products && (
					<Components.Products renderers={props.renderers} {...props.products} />
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
};

export default HeaderBar;
