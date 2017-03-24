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

function renderLogo({ isFull, onClick }) {
	const icon = isFull ? 'talend-logo' : 'talend-logo-square';
	const className = classNames(['tc-header-bar-logo', isFull && 'full']);
	return (
		<Action
			bsStyle="link"
			className={className}
			hideLabel
			label="Go to Portal"
			icon={icon}
			onClick={onClick}
		/>
	);
}

renderLogo.propTypes = {
	isFull: React.PropTypes.bool,
	onClick: React.PropTypes.func.isRequired,
};

function renderBrand({ name, onClick }) {
	return (
		<Action
			bsStyle="link"
			className="tc-header-bar-brand"
			label={name}
			onClick={onClick}
		/>
	);
}

renderBrand.propTypes = {
	name: React.PropTypes.string.isRequired,
	onClick: React.PropTypes.func.isRequired,
};

function renderEnvironment({ items, label }) {
	return (
		<ActionDropdown
			bsStyle="link"
			items={items}
			label={label}
			icon="talend-burger"
		/>
	);
}

renderEnvironment.propTypes = {
	items: ActionDropdown.propTypes.items,
	label: ActionDropdown.propTypes.label,
};

function renderSearch(search) {
	return <Typeahead {...search} />;
}

renderSearch.propTypes = Typeahead.propTypes;

function renderHelp({ onClick }) {
	return (
		<Action
			bsStyle="link"
			icon="talend-question-circle"
			label="Help"
			onClick={onClick}
		/>
	);
}

renderHelp.propTypes = {
	onClick: React.PropTypes.func.isRequired,
};

function renderUser({ items, name }) {
	return (
		<ActionDropdown
			bsStyle="link"
			icon="talend-user-circle"
			items={items}
			label={name}
			noCaret
		/>
	);
}

renderUser.propTypes = {
	items: ActionDropdown.propTypes.items,
	name: ActionDropdown.propTypes.label,
};

function renderProducts({ items }) {
	return (
		<ActionDropdown
			bsStyle="link"
			icon="talend-launcher"
			items={items}
			label="Apps"
			noCaret
		/>
	);
}

renderProducts.propTypes = {
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
					{renderLogo(props.logo)}
					{!props.logo.isFull && '|'}
					{renderBrand(props.brand)}
					{props.env && '|'}
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					{props.env && renderEnvironment(props.env)}
				</Nav>
				<Nav pullRight>
					|
					{renderHelp(props.help)}
					{renderUser(props.user)}
					|
					{renderProducts(props.products)}
				</Nav>
				<Navbar.Form pullRight role="search">
					{renderSearch(props.search)}
				</Navbar.Form>
			</Navbar.Collapse>
		</Navbar>
	);
}

AppHeaderBar.propTypes = {
	brand: React.PropTypes.shape(renderBrand.propTypes).isRequired,
	logo: React.PropTypes.shape(renderLogo.propTypes).isRequired,
	env: React.PropTypes.shape(renderEnvironment.propTypes),
	search: React.PropTypes.shape(renderSearch.propTypes).isRequired,
	help: React.PropTypes.shape(renderHelp.propTypes).isRequired,
	user: React.PropTypes.shape(renderUser.propTypes).isRequired,
	products: React.PropTypes.shape(renderProducts.propTypes).isRequired,
};

export default AppHeaderBar;
