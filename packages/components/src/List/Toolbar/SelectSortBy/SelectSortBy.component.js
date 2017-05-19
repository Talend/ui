import React, { PropTypes } from 'react';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import uuid from 'uuid';

import theme from './SelectSortBy.scss';

function SortByItem({ option, index, id }) {
	return (
		<MenuItem
			id={id && `${id}-by-item-${option.id}`}
			key={index}
			eventKey={option}
		>
			{option.name || option.id}
		</MenuItem>
	);
}
SortByItem.propTypes = {
	option: PropTypes.shape({
		id: PropTypes.string,
		name: PropTypes.string,
	}),
	index: PropTypes.number,
	id: PropTypes.string,
};

function SelectSortBy({ field, id, isDescending, onChange, options }) {
	const order = isDescending || false;
	const selected = field && options.find(item => item.id === field);

	function onChangeField(newField, event) {
		return onChange(event, { field: newField.id, isDescending: order });
	}

	function onChangeOrder(event) {
		return onChange(event, { field: selected.id, isDescending: !order });
	}


	return (
		<Nav className={theme['tc-list-toolbar-sort-by']}>
			{options.length === 1 ?
				(<li className="navbar-text">{ options[0].name }</li>) :
				(<NavDropdown
					id={id ? `${id}-by` : uuid.v4()}
					title={selected ? (selected.name || selected.id) : 'N.C'}
					onSelect={onChangeField}
					className={theme['sort-by-items']}
				>
					{options.map((option, index) => <SortByItem
						option={option}
						index={index}
						id={id}
					/>)}
				</NavDropdown>)
			}
			{selected && (
				<NavItem
					id={id && `${id}-order`}
					onClick={onChangeOrder}
				>
					{order ? 'Descending' : 'Ascending'}
				</NavItem>
			)}
		</Nav>
	);
}

SelectSortBy.propTypes = {
	field: PropTypes.string,
	id: PropTypes.string,
	isDescending: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string,
		}),
	).isRequired,
};

export default SelectSortBy;
