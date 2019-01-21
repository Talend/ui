import PropTypes from 'prop-types';
import React from 'react';
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import uuid from 'uuid';

import getDefaultT from '@talend/react-components/lib/translate';
import Icon from '@talend/react-components/lib/Icon';

function getIcon(selected) {
	switch (selected) {
		case 'table':
			return 'talend-table';
		case 'large':
			return 'talend-expanded';
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
		default:
			return t('LIST_SELECT_DISPLAY_MODE_TABLE', { defaultValue: 'Table' });
	}
}

function SelectDisplayMode({ id, mode, displayModes, onChange, t }) {
	function getMenuItem(option) {
		const displayModeLabel = getLabel(option, t);
		return (
			<MenuItem
				id={id && `${id}-${option}`}
				key={option}
				eventKey={option}
				aria-label={t('LIST_SELECT_DISPLAY_MODE', {
					defaultValue: 'Set {{displayMode}} as current display mode.',
					displayMode: displayModeLabel,
				})}
			>
				<Icon name={getIcon(option)} />
				{displayModeLabel}
			</MenuItem>
		);
	}

	return (
		<Nav>
			<NavDropdown
				id={id}
				title={<Icon name={getIcon(mode)} />}
				onSelect={(value, event) => onChange(event, value)}
				aria-label={t('LIST_CHANGE_DISPLAY_MODE', {
					defaultValue: 'Change display mode. Current display mode: {{displayMode}}.',
					displayMode: mode,
				})}
			>
				{displayModes.map(getMenuItem)}
			</NavDropdown>
		</Nav>
	);
}

SelectDisplayMode.propTypes = {
	id: PropTypes.string,
	mode: PropTypes.string,
	displayModes: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

SelectDisplayMode.defaultProps = {
	id: uuid.v4(),
	displayModes: ['table', 'large'],
	mode: 'table',
	t: getDefaultT(),
};

export default SelectDisplayMode;
