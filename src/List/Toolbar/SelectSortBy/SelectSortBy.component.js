import React from 'react';
import { Button, Nav, NavDropdown, MenuItem } from 'react-bootstrap';

/**
 * @param {object} props react props
 * @example
 <SelectSortBy name="Hello world"></SelectSortBy>
 */
function SelectSortBy(props) {
	let selected;
	props.sortBy.forEach((sortBy) => {
		if (sortBy.selected) {
			selected = sortBy;
		}
	});
	return (
		<Nav>
			<label className="navbar-text">Sort by:</label>
			<NavDropdown
				title={selected.name}
				id="tc-list-toolbar-sort-by"
				onSelect={props.onSelectSortBy}
			>
				{props.sortBy.map((sortBy, index) => (
					<MenuItem key={index} eventKey={sortBy}>{sortBy.name}</MenuItem>
				))}
			</NavDropdown>
			<Button className="navbar-btn" onClick={props.onSelectSortBy}>
				<i className={props.sortDesc ? 'fa fa-sort-desc' : 'fa fa-sort-asc'} />
				{props.sortDesc ? 'DESCENDING' : 'ASCENDING'}
			</Button>
		</Nav>
	);
}

SelectSortBy.propTypes = {
	sortBy: React.PropTypes.arrayOf(
		React.PropTypes.shape({
			id: React.PropTypes.string,
			name: React.PropTypes.string,
		})
	),
	onSelectSortBy: React.PropTypes.func,
	sortDesc: React.PropTypes.bool,
};

export default SelectSortBy;
