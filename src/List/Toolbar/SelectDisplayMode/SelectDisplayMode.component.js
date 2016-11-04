import React, { PropTypes } from 'react';
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import Icon from '../../../Icon';

function getIcon(selected) {
	switch (selected) {
	case 'table': return 'fa-bars';
	case 'large': return 'fa-list-alt';
	case 'tile': return 'fa-th-large';
	default: return 'fa-bars';
	}
}

function getLabel(selected) {
	switch (selected) {
	case 'table': return 'Table';
	case 'large': return 'Expanded';
	case 'tile': return 'Tile';
	default: return 'Table';
	}
}

const displayModes = ['table', 'large', 'tile'];

function SelectDisplayMode({ displayMode, onSelectDisplayMode }) {
	const selected = displayMode || 'table';
	const displayIcon = (<Icon name={getIcon(selected)} />);
	const onSelectMode = (value, e) => {
		onSelectDisplayMode(e, value);
	};
	return (
		<Nav>
			<label className="navbar-text" htmlFor="tc-list-toolbar-display-mode">Display:</label>
			<NavDropdown title={displayIcon} id="tc-list-toolbar-display-mode" onSelect={onSelectMode}>
				{displayModes.map(mode => (
					<MenuItem key={mode} eventKey={mode}>
						<Icon name={getIcon(mode)} /> {getLabel(mode)}
					</MenuItem>
				))}
			</NavDropdown>
		</Nav>
	);
}
SelectDisplayMode.propTypes = {
	onSelectDisplayMode: PropTypes.func,
	displayMode: PropTypes.string,
};

export default SelectDisplayMode;
