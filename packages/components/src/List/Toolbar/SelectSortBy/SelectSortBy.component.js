import React from 'react';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import uuid from 'uuid';

import theme from './SelectSortBy.scss';

function SelectSortBy({ field, id, isDescending, onChange, options }) {
	const order = isDescending || false;
	const selected = field && options.find(item => item.id === field);

	function onChangeField(newField, event) {
		return onChange(event, { field: newField.id, isDescending: order });
	}

	function onChangeOrder(event) {
		return onChange(event, { field: selected.id, isDescending: !order });
	}

	function getMenuItem(option, index) {
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

	return (
		<Nav className={theme['tc-list-toolbar-sort-by']}>
			{options.length === 1 ?
				(<li className="navbar-text">{ options[0].name }</li>) :
				(<NavDropdown
					id={id ? `${id}-by` : uuid.v4()}
					title={selected ? (selected.name || selected.id) : 'N.C'}
					onSelect={onChangeField}
				>
					{options.map((option, index) => getMenuItem(option, index, id))}
				</NavDropdown>)
			}
			{selected && (
				<NavItem
					id={id && `${id}-order`}
					onClick={onChangeOrder}
				>
					{order ? 'DESCENDING' : 'ASCENDING'}
				</NavItem>
			)}
		</Nav>
	);
}

SelectSortBy.propTypes = {
	field: React.PropTypes.string,
	id: React.PropTypes.string,
	isDescending: React.PropTypes.bool,
	onChange: React.PropTypes.func.isRequired,
	options: React.PropTypes.arrayOf(
		React.PropTypes.shape({
			id: React.PropTypes.string.isRequired,
			name: React.PropTypes.string,
		}),
	).isRequired,
};

export default SelectSortBy;
