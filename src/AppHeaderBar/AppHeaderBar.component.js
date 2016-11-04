import React from 'react';
import {
	Button,
	FormGroup,
	FormControl,
	MenuItem,
	Navbar,
	Nav,
	NavDropdown,
	NavItem,
} from 'react-bootstrap';
import Icon from '../Icon';

const NAV_ITEM = 'navItem';
const DROPDOWN = 'dropdown';

export function renderNavItem(props, index) {
	const { icon, ...rest } = props;
	return (
		<NavItem key={index} {...rest}>
			<Icon name={icon} />
		</NavItem>
	);
}
renderNavItem.propTypes = {
	icon: React.PropTypes.string,
	...NavItem.propTypes,
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
	icon: React.PropTypes.string,
	name: React.PropTypes.string,
	onClick: React.PropTypes.func,
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
	dropdown: React.PropTypes.shape(NavDropdown.propTypes),
	items: React.PropTypes.arrayOf(
		React.PropTypes.shape(renderDropdownItem.propTypes)
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
	nav: React.PropTypes.shape(Nav.propTypes),
	navItems: React.PropTypes.arrayOf(
		React.PropTypes.shape({
			type: React.PropTypes.oneOf([NAV_ITEM, DROPDOWN]),
			item: React.PropTypes.oneOfType([
				React.PropTypes.shape(renderNavItem.propTypes),
				React.PropTypes.shape(renderDropdown.propTypes),
			]),
		})
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
	formgroup: React.PropTypes.shape(FormGroup.propTypes),
	formcontrol: React.PropTypes.shape(FormControl.propTypes),
};

export function renderForm(props, index) {
	return (
		<Navbar.Form {...props.form} key={index}>
			{props.formgroups ? props.formgroups.map(renderFormGroup) : null}
			<Button {...props.button}>
				{props.icon ? (<Icon name={props.icon} />) : null}
				{props.buttonLabel}
			</Button>
		</Navbar.Form>
	);
}
renderForm.propTypes = {
	form: React.PropTypes.shape(Navbar.Form.propTypes),
	formgroups: React.PropTypes.arrayOf(
		React.PropTypes.shape(renderFormGroup.propTypes)
	),
	button: React.PropTypes.shape(Button.propTypes),
	buttonLabel: React.PropTypes.string,
};

export function renderContent(props) {
	if (props.navs) {
		return props.navs.map(renderNav);
	}
	if (props.forms) {
		return props.forms.map(renderForm);
	}
	return null;
}
renderContent.propTypes = {
	navs: React.PropTypes.arrayOf(
		React.PropTypes.shape(renderNav.propTypes)
	),
	forms: React.PropTypes.arrayOf(
		React.PropTypes.shape(renderForm.propTypes)
	),
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
		<Navbar fluid fixedTop inverse className="tc-app-header-bar">
			<Navbar.Header>
				<Navbar.Brand>
					{brandLink}
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				{props.content ? props.content.map(renderContent) : null}
			</Navbar.Collapse>
		</Navbar>
	);
}
AppHeaderBar.propTypes = {
	app: React.PropTypes.string.isRequired,
	brandLink: React.PropTypes.shape({
		onClick: React.PropTypes.func,
		className: React.PropTypes.string,
	}),
	content: React.PropTypes.arrayOf(
		React.PropTypes.shape(renderContent.propTypes)
	),
};

export default AppHeaderBar;
