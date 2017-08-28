import PropTypes from 'prop-types';
import React from 'react';
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import uuid from 'uuid';

import defaultTranslateFn from '../../../translate';
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

function getLabel(selected, t) {
	switch (selected) {
	case 'table':
		return t('LIST_SELECT_DISPLAY_MODE_TABLE', { defaultValue: 'Table' });
	case 'large':
		return t('LIST_SELECT_DISPLAY_MODE_LARGE', { defaultValue: 'Expanded' });
	case 'tile':
		return t('LIST_SELECT_DISPLAY_MODE_TILE', { defaultValue: 'Tile' });
	default:
		return t('LIST_SELECT_DISPLAY_MODE_TABLE', { defaultValue: 'Table' });
	}
}

const options = ['table', 'large', 'tile'];

function SelectDisplayMode({ id, mode, displayModes, onChange, t }) {
	const selected = mode || 'table';
	const modes = displayModes || options;
	const displayIcon = (<Icon name={getIcon(selected)} />);

	function onChangeMode(value, event) {
		return onChange(event, value);
	}

	function getMenuItem(option) {
		return (
			<MenuItem
				id={id && `${id}-${option}`}
				key={option}
				eventKey={option}
			>
				<Icon name={getIcon(option)} />
				{getLabel(option, t)}
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
				{modes.map(option => getMenuItem(option))}
			</NavDropdown>
		</Nav>
	);
}

SelectDisplayMode.defaultProps = {
	t: defaultTranslateFn,
};

SelectDisplayMode.propTypes = {
	id: PropTypes.string,
	mode: PropTypes.string,
	displayModes: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

export default SelectDisplayMode;
