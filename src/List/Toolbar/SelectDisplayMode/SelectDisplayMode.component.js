import React from 'react';
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';

/**
 * @param {object} props react props
 */
function SelectDisplayMode(props) {
	const displayIcon = (<i className="fa fa-bars" />);
	return (
		<Nav>
			<label className="navbar-text">Display:</label>
			<NavDropdown title={displayIcon} id="grid" onSelect={props.onSelectDisplayMode}>
				<MenuItem eventKey="table"><i className="fa fa-bars" /> Table</MenuItem>
				<MenuItem eventKey="expanded"><i className="fa fa-list-alt" /> Expanded</MenuItem>
				<MenuItem eventKey="tile"><i className="fa fa-th-large" /> Tile</MenuItem>
			</NavDropdown>
		</Nav>
	);
}
SelectDisplayMode.propTypes = {
	onSelectDisplayMode: React.PropTypes.func,
};

export default SelectDisplayMode;
