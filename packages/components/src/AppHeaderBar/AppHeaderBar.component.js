import PropTypes from 'prop-types';
import React from 'react';
import {
	Button,
	FormGroup,
	FormControl,
	MenuItem,
	Navbar,
	Nav,
	NavDropdown,
} from 'react-bootstrap';

import Icon from '../Icon';
import Action from '../Actions/Action';
import Typeahead from '../Typeahead';
import theme from './AppHeaderBar.scss';

const NAV_ITEM = 'navItem';
const DROPDOWN = 'dropdown';

function NavListItem(props) {
	const { item, ...rest } = props;
	return (
		<li>
			<Action
				{...item}
				hideLabel
				label={item.name}
				bsStyle={'link'}
				{...rest}
			/>
		</li>
	);
}

NavListItem.propTypes = {
	item: PropTypes.shape(Action.propTypes),
};

export function renderNavItem(item, index) {
	return <NavListItem item={item} key={index} />;
}

renderNavItem.propTypes = {
	item: NavListItem.propTypes,
	index: PropTypes.number,
};

export function renderDropdownItem(props, index) {
	const { icon, name, ...rest } = props;
	return (
		<MenuItem key={index} {...rest}>
			<Icon name={icon} />
			{name}
		</MenuItem>
	);
}

renderDropdownItem.propTypes = {
	icon: PropTypes.string,
	name: PropTypes.string,
	onClick: PropTypes.func,
};

export function renderDropdown(props, index) {
	let dropdownProps = props.dropdown;
	if (dropdownProps.onSelect) {
		dropdownProps = {
			...props.dropdown,
			onSelect: (eventKey, event) => dropdownProps.onSelect(event, eventKey),
		};
	}
	return (
		<NavDropdown {...dropdownProps} key={index}>
			{props.items.map(renderDropdownItem)}
		</NavDropdown>
	);
}
renderDropdown.propTypes = {
	dropdown: PropTypes.shape(NavDropdown.propTypes),
	items: PropTypes.arrayOf(
		PropTypes.shape(renderDropdownItem.propTypes),
	),
};

export function renderNav(props) {
	return (
		<Nav {...props.nav}>
			{props.navItems.map((itemDef, index) => {
				const { type, item } = itemDef;
				switch (type) {
				case NAV_ITEM:
					return renderNavItem(item, index);
				case DROPDOWN:
					return renderDropdown(item, index);
				default:
					return null;
				}
			})}
		</Nav>
	);
}
renderNav.propTypes = {
	nav: PropTypes.shape(Nav.propTypes),
	navItems: PropTypes.arrayOf(
		PropTypes.shape({
			type: PropTypes.oneOf([NAV_ITEM, DROPDOWN]),
			item: PropTypes.oneOfType([
				PropTypes.shape(renderNavItem.propTypes),
				PropTypes.shape(renderDropdown.propTypes),
			]),
		}),
	),
};

export function renderFormGroup(props, index) {
	return (
		<FormGroup key={index} {...props.formgroup}>
			<FormControl {...props.formcontrol} />
		</FormGroup>
	);
}
renderFormGroup.propTypes = {
	formgroup: PropTypes.shape(FormGroup.propTypes),
	formcontrol: PropTypes.shape(FormControl.propTypes),
};

export function renderForm(props, index) {
	return (
		<form className="navbar-form navbar-right" role="search" {...props.form} key={index}>
			{props.formgroups && props.formgroups.map(renderFormGroup)}
			<Button {...props.button}>
				{props.icon && <Icon name={props.icon} />}
				{props.buttonLabel}
			</Button>
		</form>
	);
}
renderForm.propTypes = {
	form: PropTypes.shape(Navbar.Form.propTypes),
	formgroups: PropTypes.arrayOf(
		PropTypes.shape(renderFormGroup.propTypes),
	),
	button: PropTypes.shape(Button.propTypes),
	buttonLabel: PropTypes.string,
};

export function renderTypeahead(search, index) {
	return (
		<form className="navbar-form navbar-right" role="search" key={index}>
			<Typeahead {...search} />
		</form>
	);
}
renderTypeahead.propTypes = PropTypes.shape(Typeahead.propTypes);

export function renderContent(props, index) {
	if (props.navs) {
		return props.navs.map(renderNav);
	}
	if (props.forms) {
		return props.forms.map(renderForm);
	}
	if (props.search) {
		return renderTypeahead(props.search, index);
	}
	return null;
}
renderContent.propTypes = {
	navs: PropTypes.arrayOf(
		PropTypes.shape(renderNav.propTypes),
	),
	forms: PropTypes.arrayOf(
		PropTypes.shape(renderForm.propTypes),
	),
	search: PropTypes.shape(Typeahead.propTypes),
};

/**
 * The top bar is the place where the user finds useful information and tools
 * to describe the application
 * the logo, the name of the application, an optionnal global search,
 * few icons for feedback & onboarding and a menu to access logout
 * and profile information.
 * @param {object} props   react props
 */
function AppHeaderBar(props) {
	let brandLink;
	if (props.brandLink) {
		brandLink = (
			<Button
				bsStyle="link"
				role="link"
				{...props.brandLink}
			>
				{props.app}
			</Button>
		);
	} else {
		brandLink = (
			<span>{props.app}</span>
		);
	}

	return (
		<Navbar fluid fixedTop inverse className={`tc-app-header-bar ${theme['tc-app-header-bar']}`}>
			<Navbar.Header>
				<Navbar.Brand>
					{brandLink}
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				{props.content && props.content.map(renderContent)}
			</Navbar.Collapse>
		</Navbar>
	);
}

AppHeaderBar.propTypes = {
	app: PropTypes.string.isRequired,
	brandLink: PropTypes.shape({
		onClick: PropTypes.func,
		className: PropTypes.string,
	}),
	content: PropTypes.arrayOf(
		PropTypes.shape(renderContent.propTypes),
	),
};
AppHeaderBar.displayName = 'AppHeaderBar';

export default AppHeaderBar;
