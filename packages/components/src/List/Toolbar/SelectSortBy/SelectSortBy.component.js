import PropTypes from 'prop-types';
import React from 'react';
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import uuid from 'uuid';

import getDefaultT from '../../../translate';
import SortOrderToggle from '../SortOrderToggle';
import theme from './SelectSortBy.scss';

function SortByItem({ option, index, id, t }) {
	const optionLabel = option.name || option.id;
	return (
		<MenuItem
			id={id && `${id}-by-item-${option.id}`}
			key={index}
			eventKey={option}
			aria-label={t('LIST_SELECT_SORT_BY', {
				defaultValue: 'Select {{sortBy}} as current sort criteria.',
				sortBy: optionLabel,
			})}
		>
			{optionLabel}
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
	t: PropTypes.func,
};

function SelectSortBy({ field, id, isDescending, onChange, options, t }) {
	const order = isDescending || false;
	const selected = field && options.find(item => item.id === field);

	function onChangeField(newField, event) {
		return onChange(event, { field: newField.id, isDescending: order });
	}

	function onChangeOrder(event) {
		return onChange(event, { field: selected.id, isDescending: !order });
	}

	const getMenuItem = SortByItem;
	const currentSortByLabel = selected ? selected.name || selected.id : 'N.C';
	return (
		<Nav className={`${theme['tc-list-toolbar-sort-by']} separated`}>
			{options.length === 1 ? (
				<li className="navbar-text">{options[0].name}</li>
			) : (
				<NavDropdown
					id={id ? `${id}-by` : uuid.v4()}
					title={currentSortByLabel}
					onSelect={onChangeField}
					className={theme['sort-by-items']}
					aria-label={t('LIST_CHANGE_SORT_BY', {
						defaultValue: 'Change sort criteria. Current sort by {{sortBy}}.',
						sortBy: currentSortByLabel,
					})}
				>
					{options.map((option, index) =>
						getMenuItem({
							option,
							index,
							id,
							t,
						}),
					)}
				</NavDropdown>
			)}
			{selected && (<SortOrderToggle id={id && `${id}-order`} onChange={onChangeOrder} isDescending={isDescending} />)}
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
	t: PropTypes.func.isRequired,
};

SelectSortBy.defaultProps = {
	t: getDefaultT(),
};

export default SelectSortBy;
