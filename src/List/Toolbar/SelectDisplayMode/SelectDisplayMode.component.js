import React, { PropTypes } from 'react';
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import uuid from 'uuid';
import Icon from '../../../Icon';

function getIcon(selected) {
	switch (selected) {
	case 'table': return 'talend-table';
	case 'large': return 'talend-expanded';
	case 'tile': return 'talend-tiles';
	default: return 'talend-table';
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

const options = ['table', 'large', 'tile'];

function SelectDisplayMode({ id, mode, onChange }) {
	const selected = mode || 'table';
	const displayIcon = (<Icon name={getIcon(selected)} />);
	const onChangeMode = (value, event) => {
		onChange(event, value);
	};
	const getMenuItem = option => (
		<MenuItem
			id={id && `${id}-${option}`}
			key={option}
			eventKey={option}
		>
			<Icon name={getIcon(option)} />
			{getLabel(option)}
		</MenuItem>
	);
	return (
		<Nav>
			<NavDropdown
				id={id || uuid.v4()}
				title={displayIcon}
				onSelect={onChangeMode}
			>
				{options.map(option => getMenuItem(option))}
			</NavDropdown>
		</Nav>
	);
}
SelectDisplayMode.propTypes = {
	id: PropTypes.string,
	mode: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default SelectDisplayMode;
