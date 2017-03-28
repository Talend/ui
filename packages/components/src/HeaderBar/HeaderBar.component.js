import React from 'react';
import classNames from 'classnames';

import Action from '../Actions/Action';
import ActionDropdown from '../Actions/ActionDropdown';
import Typeahead from '../Typeahead';
import theme from './HeaderBar.scss';

function Logo({ id, isFull, onClick }) {
	const icon = isFull ? 'talend-logo' : 'talend-logo-square';
	const className = classNames(['tc-header-bar-logo', isFull && 'full']);
	return (
		<Action
			bsStyle="link"
			className={className}
			hideLabel
			id={id}
			label="Go to Portal"
			icon={icon}
			onClick={onClick}
			tooltipPlacement="bottom"
		/>
	);
}

Logo.propTypes = {
	id: React.PropTypes.string,
	isFull: React.PropTypes.bool,
	onClick: React.PropTypes.func.isRequired,
};

function Brand({ id, name, onClick }) {
	return (
		<Action
			bsStyle="link"
			className="tc-header-bar-brand"
			id={id}
			label={name}
			onClick={onClick}
			tooltipPlacement="bottom"
		/>
	);
}

Brand.propTypes = {
	id: React.PropTypes.string,
	name: React.PropTypes.string.isRequired,
	onClick: React.PropTypes.func.isRequired,
};

function Environment(props) {
	return (
		<ActionDropdown
			bsStyle="link"
			icon="talend-burger"
			id={props.id}
			items={props.items}
			label={props.label}
			tooltipPlacement="bottom"
		/>
	);
}

Environment.propTypes = {
	id: React.PropTypes.string,
	items: ActionDropdown.propTypes.items,
	label: ActionDropdown.propTypes.label,
};

function Search(props) {
	return <Typeahead {...props} />;
}

Search.propTypes = Typeahead.propTypes;

function Help({ id, onClick }) {
	return (
		<Action
			bsStyle="link"
			icon="talend-question-circle"
			id={id}
			label="Help"
			onClick={onClick}
			tooltipPlacement="bottom"
		/>
	);
}

Help.propTypes = {
	id: React.PropTypes.string,
	onClick: React.PropTypes.func.isRequired,
};

function User({ id, items, name }) {
	return (
		<ActionDropdown
			bsStyle="link"
			icon="talend-user-circle"
			id={id}
			items={items}
			label={name}
			noCaret
			tooltipPlacement="bottom"
		/>
	);
}

User.propTypes = {
	id: React.PropTypes.string,
	items: ActionDropdown.propTypes.items,
	name: ActionDropdown.propTypes.label,
};

function Products({ id, items }) {
	return (
		<ActionDropdown
			bsStyle="link"
			id={id}
			icon="talend-launcher"
			items={items}
			label="Apps"
			noCaret
			tooltipPlacement="bottom"
		/>
	);
}

Products.propTypes = {
	id: React.PropTypes.string,
	items: ActionDropdown.propTypes.items,
};

function HeaderBar(props) {
	return (
		<nav className={classNames([`tc-header-bar, ${theme['tc-header-bar']}`])} >
			<div className="tc-header-bar-actions">
				<Logo {...props.logo} />
				{!props.logo.isFull && '|'}
				<Brand {...props.brand} />
				{props.env && '|'}
				{props.env && (<Environment {...props.env} />)}
			</div>
			<div className="tc-header-bar-actions right">
				{props.search && (<Search {...props.search} />)}
				|
				<Help {...props.help} />
				<User {...props.user} />
				|
				<Products {...props.products} />
			</div>
		</nav>
	);
}

HeaderBar.propTypes = {
	brand: React.PropTypes.shape(Brand.propTypes).isRequired,
	logo: React.PropTypes.shape(Logo.propTypes).isRequired,
	env: React.PropTypes.shape(Environment.propTypes),
	search: React.PropTypes.shape(Search.propTypes),
	help: React.PropTypes.shape(Help.propTypes).isRequired,
	user: React.PropTypes.shape(User.propTypes).isRequired,
	products: React.PropTypes.shape(Products.propTypes).isRequired,
};

export default HeaderBar;
