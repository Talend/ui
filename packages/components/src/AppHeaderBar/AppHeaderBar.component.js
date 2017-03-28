import React from 'react';
import {
	Navbar,
	Nav,
} from 'react-bootstrap';
import classNames from 'classnames';

import Action from '../Actions/Action';
import ActionDropdown from '../Actions/ActionDropdown';
import Typeahead from '../Typeahead';
import theme from './AppHeaderBar.scss';

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
		/>
	);
}

Brand.propTypes = {
	id: React.PropTypes.string,
	name: React.PropTypes.string.isRequired,
	onClick: React.PropTypes.func.isRequired,
};

function Environment({ id, items, label }) {
	return (
		<ActionDropdown
			bsStyle="link"
			id={id}
			items={items}
			label={label}
			icon="talend-burger"
		/>
	);
}

Environment.propTypes = {
	id: React.PropTypes.string.isRequired,
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
		/>
	);
}

User.propTypes = {
	id: React.PropTypes.string.isRequired,
	items: ActionDropdown.propTypes.items,
	name: ActionDropdown.propTypes.label,
};

function Products({ id, items }) {
	return (
		<ActionDropdown
			bsStyle="link"
			icon="talend-launcher"
			id={id}
			items={items}
			label="Apps"
			noCaret
		/>
	);
}

Products.propTypes = {
	id: React.PropTypes.string.isRequired,
	items: ActionDropdown.propTypes.items,
};

/**
 * The top bar is the place where the user finds useful information and tools
 * to describe the application
 * the logo, the name of the application, an optional global search,
 * few icons for feedback & onboarding and a menu to access logout
 * and profile information.
 * @param {object} props   react props
 */
function AppHeaderBar(props) {
	return (
		<Navbar fluid fixedTop inverse className={`tc-app-header-bar ${theme['tc-app-header-bar']}`}>
			<Navbar.Header>
				<Navbar.Brand>
					<Logo {...props.logo} />
					{!props.logo.isFull && '|'}
					<Brand {...props.brand} />
					{props.env && '|'}
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					{props.env && (<Environment {...props.env} />)}
				</Nav>
				<Nav pullRight>
					|
					<Help {...props.help} />
					<User {...props.user} />
					|
					<Products {...props.products} />
				</Nav>
				<Navbar.Form pullRight role="search">
					<Search {...props.search} />
				</Navbar.Form>
			</Navbar.Collapse>
		</Navbar>
	);
}

AppHeaderBar.propTypes = {
	logo: React.PropTypes.shape(Logo.propTypes).isRequired,
	brand: React.PropTypes.shape(Brand.propTypes).isRequired,
	env: React.PropTypes.shape(Environment.propTypes),
	search: React.PropTypes.shape(Search.propTypes).isRequired,
	help: React.PropTypes.shape(Help.propTypes).isRequired,
	user: React.PropTypes.shape(User.propTypes).isRequired,
	products: React.PropTypes.shape(Products.propTypes).isRequired,
};

export default AppHeaderBar;
