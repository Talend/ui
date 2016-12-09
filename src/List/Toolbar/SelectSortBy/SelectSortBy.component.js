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
	if (props.sortBy) {
		selected = props.sortOptions.find(item => item.id === props.sortBy);
	}
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
	const toggleSortOrder = (event) => {
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
				{props.sortOptions.map((option, index) => (
					<MenuItem
						id={props.id && `${props.id}-sort-by-item-${option.name}`}
						key={index}
						eventKey={option}
					>
						{option.name}
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
	sortOptions: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string,
		})
	),
	sortBy: PropTypes.string,
	sortDesc: PropTypes.bool,
};

export default SelectSortBy;
