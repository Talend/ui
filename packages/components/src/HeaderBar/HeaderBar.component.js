import React from 'react';
import classNames from 'classnames';

import Action from '../Actions/Action';
import ActionDropdown from '../Actions/ActionDropdown';
import Typeahead from '../Typeahead';
import theme from './HeaderBar.scss';

function Logo({ id, isFull, onClick }) {
	const icon = isFull ? 'talend-logo' : 'talend-logo-square';
	const itemClassName = classNames(['tc-header-bar-action', !isFull && 'separated']);
	const actionClassName = classNames(['tc-header-bar-logo', isFull && 'full']);
	return (
		<li className={itemClassName}>
			<Action
				bsStyle="link"
				className={actionClassName}
				hideLabel
				id={id}
				label="Go to Portal"
				icon={icon}
				onClick={onClick}
				tooltipPlacement="bottom"
			/>
		</li>
	);
}

Logo.propTypes = {
	id: React.PropTypes.string,
	isFull: React.PropTypes.bool,
	onClick: React.PropTypes.func.isRequired,
};

function Brand({ id, isSeparated, name, onClick }) {
	const className = classNames(['tc-header-bar-action', isSeparated && 'separated']);
	return (
		<li className={className}>
			<Action
				bsStyle="link"
				className="tc-header-bar-brand"
				id={id}
				label={name}
				onClick={onClick}
				tooltipPlacement="bottom"
			/>
		</li>
	);
}

Brand.propTypes = {
	id: React.PropTypes.string,
	isSeparated: React.PropTypes.bool,
	name: React.PropTypes.string.isRequired,
	onClick: React.PropTypes.func.isRequired,
};

function Environment(props) {
	return (
		<li className="tc-header-bar-action">
			<ActionDropdown
				bsStyle="link"
				icon="talend-environment"
				id={props.id}
				items={props.items}
				label={props.label}
				tooltipPlacement="bottom"
			/>
		</li>
	);
}

Environment.propTypes = {
	id: React.PropTypes.string,
	items: ActionDropdown.propTypes.items,
	label: ActionDropdown.propTypes.label,
};

function Search(props) {
	return (
		<li className="tc-header-bar-action separated flex">
			<Typeahead {...props} />
		</li>
	);
}

Search.propTypes = Typeahead.propTypes;

function Help({ id, onClick }) {
	return (
		<li className="tc-header-bar-action">
			<Action
				bsStyle="link"
				icon="talend-question-circle"
				id={id}
				label="Help"
				onClick={onClick}
				tooltipPlacement="bottom"
			/>
		</li>
	);
}

Help.propTypes = {
	id: React.PropTypes.string,
	onClick: React.PropTypes.func.isRequired,
};

function User({ id, items, name }) {
	return (
		<li className="tc-header-bar-action separated">
			<ActionDropdown
				bsStyle="link"
				icon="talend-user-circle"
				id={id}
				items={items}
				label={name}
				noCaret
				tooltipPlacement="bottom"
			/>
		</li>
	);
}

User.propTypes = {
	id: React.PropTypes.string,
	items: ActionDropdown.propTypes.items,
	name: ActionDropdown.propTypes.label,
};

function Products({ id, items }) {
	return (
		<li className="tc-header-bar-action">
			<ActionDropdown
				bsStyle="link"
				className="tc-header-bar-products"
				id={id}
				icon="talend-launcher"
				items={items}
				label="Apps"
				noCaret
				pullRight
				tooltipPlacement="bottom"
			/>
		</li>
	);
}

Products.propTypes = {
	id: React.PropTypes.string,
	items: ActionDropdown.propTypes.items,
};

function HeaderBar(props) {
	return (
		<nav className={classNames(theme['tc-header-bar'], 'tc-header-bar')}>
			<ul className="tc-header-bar-actions">
				<Logo {...props.logo} />
				<Brand {...props.brand} isSeparated={!!props.env} />
				{props.env && (<Environment {...props.env} />)}
			</ul>
			<ul className="tc-header-bar-actions right">
				{props.search && (<Search {...props.search} />)}
				{props.help && (<Help {...props.help} />)}
				{props.user && (<User {...props.user} />)}
				{props.products && (<Products {...props.products} />)}
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
};

export default HeaderBar;
