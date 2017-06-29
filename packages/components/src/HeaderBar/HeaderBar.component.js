import React from 'react';
import classNames from 'classnames';
import { translate } from 'react-i18next';

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
console.log(t && t.toString())
	return (
		<li className={itemClassName}>
			<renderers.Action
				bsStyle="link"
				className={actionClassName}
				hideLabel
				label={t('GO_PORTAL', 'Go to Portal')}
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
	t: React.PropTypes.func.isRequired,
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
	isSeparated: React.PropTypes.bool,
	renderers: React.PropTypes.shape({
		Action: React.PropTypes.func,
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
	renderers: React.PropTypes.shape({
		ActionDropdown: React.PropTypes.func,
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
Search.propTypes.renderers = React.PropTypes.shape({
	Typeahead: React.PropTypes.func,
});

function Help({ renderers, t, ...props }) {
	const global = {
		bsStyle: 'link',
		icon: 'talend-question-circle',
		label: t('HELP', 'Help'),
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
	items: React.PropTypes.arrayOf(React.PropTypes.object),
	renderers: React.PropTypes.shape({
		ActionSplitDropdown: React.PropTypes.func,
		Action: React.PropTypes.func,
	}),
	t: React.PropTypes.func.isRequired,
};

function User({ name, renderers, ...props }) {
	const className = classNames(
		theme['tc-header-bar-action'],
		theme.separated,
	);

	return (
		<li className={className}>
			<renderers.ActionDropdown
				bsStyle="link"
				icon="talend-user-circle"
				pullRight
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

function Products({ renderers, t, ...props }) {
	return (
		<li className={theme['tc-header-bar-action']}>
			<renderers.ActionDropdown
				bsStyle="link"
				className={theme['tc-header-bar-products']}
				icon="talend-launcher"
				label={t('APPS', 'Apps')}
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
	t: React.PropTypes.func.isRequired,
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
				<Components.Logo renderers={renderers} {...props.logo} t={props.t} />
				<Components.Brand renderers={renderers} {...props.brand} isSeparated={!!props.env} />
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
HeaderBar.defaultProps = {
	t: () => {},
};

export default translate('tui-components-headerBar')(HeaderBar);
