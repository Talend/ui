import React, { PropTypes } from 'react';
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import uuid from 'uuid';
import _intersection from 'lodash/intersection';

import Icon from '../../../Icon';

function getIcon(selected) {
	switch (selected) {
	case 'table':
		return 'talend-table';
	case 'large':
		return 'talend-expanded';
	case 'tile':
		return 'talend-tiles';
	default:
		return 'talend-table';
	}
}

function getLabel(selected) {
	switch (selected) {
	case 'table':
		return 'Table';
	case 'large':
		return 'Expanded';
	case 'tile':
		return 'Tile';
	default:
		return 'Table';
	}
}

const options = ['table', 'large', 'tile'];

function SelectDisplayMode({ id, mode, availableModes, onChange }) {
	const selected = mode || 'table';
	const displayIcon = (<Icon name={getIcon(selected)} />);

	function onChangeMode(value, event) {
		return onChange(event, value);
	}

	function getAvailablesOptions(modes) {
		if (modes) {
			return _intersection(modes, options);
		}
		return options;
	}

	function getMenuItem(option) {
		return (
			<MenuItem
				id={id && `${id}-${option}`}
				key={option}
				eventKey={option}
			>
				<Icon name={getIcon(option)} />
				{getLabel(option)}
			</MenuItem>
		);
	}

	return (
		<Nav>
			<NavDropdown
				id={id || uuid.v4()}
				title={displayIcon}
				onSelect={onChangeMode}
			>
				{getAvailablesOptions(availableModes).map(option => getMenuItem(option))}
			</NavDropdown>
		</Nav>
	);
}

SelectDisplayMode.propTypes = {
	id: PropTypes.string,
	mode: PropTypes.string,
	availableModes: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func.isRequired,
};

export default SelectDisplayMode;
