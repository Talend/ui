import React, { PropTypes } from 'react';
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import uuid from 'uuid';
import Icon from '../../../Icon';

function getIcon(selected) {
	switch (selected) {
	case 'table': return 'fa-bars';
	case 'large': return 'fa-list-alt';
	case 'tile': return 'fa-th-large';
	default: return 'fa-bars';
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

const displayModes = ['table', 'large', 'tile'];

function SelectDisplayMode({ id, displayMode, onSelectDisplayMode }) {
	const selected = displayMode || 'table';
	const displayIcon = (<Icon name={getIcon(selected)} />);
	const onSelectMode = (value, e) => {
		onSelectDisplayMode(e, value);
	};
	const displayModeId = id && `${id}-display-mode`;
	return (
		<Nav>
			<NavDropdown
				id={displayModeId || uuid.v4()}
				title={displayIcon}
				onSelect={onSelectMode}
			>
				{displayModes.map(mode => (
					<MenuItem
						id={id && `${displayModeId}-${mode}`}
						key={mode}
						eventKey={mode}
					>
						<Icon name={getIcon(mode)} />
						{getLabel(mode)}
					</MenuItem>
				))}
			</NavDropdown>
		</Nav>
	);
}
SelectDisplayMode.propTypes = {
	id: PropTypes.string,
	displayMode: PropTypes.string,
	onSelectDisplayMode: PropTypes.func,
};

export default SelectDisplayMode;
