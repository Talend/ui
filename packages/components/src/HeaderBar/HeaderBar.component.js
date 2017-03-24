import React from 'react';
import classNames from 'classnames';

import Action from '../Actions/Action';
import ActionDropdown from '../Actions/ActionDropdown';
import Typeahead from '../Typeahead';
import theme from './HeaderBar.scss';

function renderLogo({ id, isFull, onClick }) {
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

renderLogo.propTypes = {
	id: React.PropTypes.string,
	isFull: React.PropTypes.bool,
	onClick: React.PropTypes.func.isRequired,
};

function renderBrand({ id, name, onClick }) {
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

renderBrand.propTypes = {
	id: React.PropTypes.string,
	name: React.PropTypes.string.isRequired,
	onClick: React.PropTypes.func.isRequired,
};

function renderEnvironment({ id, items, label }) {
	return (
		<ActionDropdown
			bsStyle="link"
			icon="talend-burger"
			id={id}
			items={items}
			label={label}
			tooltipPlacement="bottom"
		/>
	);
}

renderEnvironment.propTypes = {
	id: React.PropTypes.string,
	items: ActionDropdown.propTypes.items,
	label: ActionDropdown.propTypes.label,
};

function renderSearch(search) {
	return <Typeahead {...search} />;
}

renderSearch.propTypes = Typeahead.propTypes;

function renderHelp({ id, onClick }) {
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

renderHelp.propTypes = {
	id: React.PropTypes.string,
	onClick: React.PropTypes.func.isRequired,
};

function renderUser({ id, items, name }) {
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

renderUser.propTypes = {
	id: React.PropTypes.string,
	items: ActionDropdown.propTypes.items,
	name: ActionDropdown.propTypes.label,
};

function renderProducts({ id, items }) {
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

renderProducts.propTypes = {
	id: React.PropTypes.string,
	items: ActionDropdown.propTypes.items,
};

function HeaderBar(props) {
	return (
		<nav className={classNames([`tc-header-bar, ${theme['tc-header-bar']}`])} >
			<div className="tc-header-bar-actions">
				{renderLogo(props.logo)}
				{!props.logo.isFull && '|'}
				{renderBrand(props.brand)}
				{props.env && '|'}
				{props.env && renderEnvironment(props.env)}
			</div>
			<div className="tc-header-bar-actions right">
				{renderSearch(props.search)}
				|
				{renderHelp(props.help)}
				{renderUser(props.user)}
				|
				{renderProducts(props.products)}
			</div>
		</nav>
	);
}

HeaderBar.propTypes = {
	brand: React.PropTypes.shape(renderBrand.propTypes).isRequired,
	logo: React.PropTypes.shape(renderLogo.propTypes).isRequired,
	env: React.PropTypes.shape(renderEnvironment.propTypes),
	search: React.PropTypes.shape(renderSearch.propTypes).isRequired,
	help: React.PropTypes.shape(renderHelp.propTypes).isRequired,
	user: React.PropTypes.shape(renderUser.propTypes).isRequired,
	products: React.PropTypes.shape(renderProducts.propTypes).isRequired,
};

export default HeaderBar;
