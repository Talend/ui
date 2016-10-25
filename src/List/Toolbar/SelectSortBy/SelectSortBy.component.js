import React from 'react';
import { Button, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import Icon from '../../../Icon';

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
	let onSelectSortBy = props.onSelectSortBy;
	if (onSelectSortBy) {
		onSelectSortBy = (key, event) => props.onSelectSortBy(
			event,
			{
				sortBy: key.id,
				sortDesc: !!props.sortDesc,
			}
		);
	}
	const toggleSortOrder = () => {
		if (props.onSelectSortBy) {
			props.onSelectSortBy(
				event,
				{
					sortBy: selected.id,
					sortDesc: !props.sortDesc,
				}
			);
		}
	};
	return (
		<Nav>
			<label className="navbar-text" htmlFor="tc-list-toolbar-sort-by">Sort by:</label>
			<NavDropdown
				title={selected.name}
				id="tc-list-toolbar-sort-by"
				onSelect={onSelectSortBy}
			>
				{props.sortBy.map((sortBy, index) => (
					<MenuItem key={index} eventKey={sortBy}>{sortBy.name}</MenuItem>
				))}
			</NavDropdown>
			<Button className="navbar-btn" bsStyle="link" role="button" onClick={toggleSortOrder}>
				<Icon name={props.sortDesc ? 'fa-sort-desc' : 'fa-sort-asc'} />
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
