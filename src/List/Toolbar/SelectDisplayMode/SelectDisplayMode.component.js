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

/**
 * @param {object} props react props
 */
function SelectDisplayMode(props) {
	const selected = props.selected ? props.selected : 'table';
	const displayIcon = (<Icon name={getIcon(selected)} />);
	const onSelectDisplayMode = (value, e) => {
		props.onSelectDisplayMode(e, value);
	};
	return (
		<Nav>
			<label className="navbar-text">Display:</label>
			<NavDropdown title={displayIcon} id="grid" onSelect={onSelectDisplayMode}>
				{displayModes.map(mode => (
					<MenuItem eventKey={mode}><Icon name={getIcon(mode)} /> {getLabel(mode)}</MenuItem>

				))}
			</NavDropdown>
		</Nav>
	);
}
SelectDisplayMode.propTypes = {
	onSelectDisplayMode: PropTypes.func,
	selected: PropTypes.string,
};

export default SelectDisplayMode;
