import React, { PropTypes } from 'react';
import { Button, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import uuid from 'uuid';

import theme from './SelectSortBy.scss';

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
	const sortById = props.id && `${props.id}-sort-by`;
	return (
		<Nav className={theme['tc-list-toolbar-sort-by']}>
			<label className="navbar-text" htmlFor={sortById}>Sort by:</label>
			<NavDropdown
				id={sortById || uuid.v4()}
				title={selected ? selected.name : 'N.C'}
				onSelect={onSelectSortBy}
			>
				{props.sortBy.map((sortBy, index) => (
					<MenuItem
						id={props.id && `${props.id}-sort-by-item-${sortBy.name}`}
						key={index}
						eventKey={sortBy}
					>
						{sortBy.name}
					</MenuItem>
				))}
			</NavDropdown>
			<Button
				id={props.id && `${props.id}-sort-order`}
				className="navbar-btn btn"
				bsStyle="link"
				role="button"
				onClick={toggleSortOrder}
			>
				{props.sortDesc ? 'DESCENDING' : 'ASCENDING'}
			</Button>
		</Nav>
	);
}

SelectSortBy.propTypes = {
	id: PropTypes.string,
	onSelectSortBy: PropTypes.func,
	sortBy: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
			selected: PropTypes.bool,
		})
	),
	sortDesc: PropTypes.bool,
};

export default SelectSortBy;
