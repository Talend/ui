import PropTypes from 'prop-types';
import React from 'react';
import { translate } from 'react-i18next';
import { Navbar, NavDropdown, Nav, MenuItem } from 'react-bootstrap';
import uuid from 'uuid';

import { useListContext } from '../context';
import Icon from '../../../Icon';
import getDefaultT from '../../../translate';
import I18N_DOMAIN_COMPONENTS from '../../../constants';

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

function getLabel(option, t) {
	switch (option) {
		case 'table':
			return t('LIST_SELECT_DISPLAY_MODE_TABLE', { defaultValue: 'Table' });
		case 'large':
			return t('LIST_SELECT_DISPLAY_MODE_LARGE', { defaultValue: 'Expanded' });
		default:
			return t('LIST_SELECT_DISPLAY_MODE_TABLE', { defaultValue: 'Table' });
	}
}

function DisplayMode(props) {
	const { displayMode, onDisplayModeChange } = useListContext();
	const { id, displayModes, mode = displayMode, onChange = onDisplayModeChange, t } = props;
	return (
		<React.Fragment>
			<Navbar.Text>
				<label htmlFor={id}>{t('LIST_TOOLBAR_DISPLAY', { defaultValue: 'Display:' })}</label>
			</Navbar.Text>
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
					{displayModes.map(option => (
						<MenuItem
							id={`${id}-${option}`}
							key={option}
							eventKey={option}
							aria-label={t('LIST_SELECT_DISPLAY_MODE', {
								defaultValue: 'Set {{displayMode}} as current display mode.',
								displayMode: getLabel(option, t),
							})}
						>
							<Icon name={getIcon(option)} />
							{getLabel(option, t)}
						</MenuItem>
					))}
				</NavDropdown>
			</Nav>
		</React.Fragment>
	);
}
DisplayMode.displayName = 'List.DisplayMode';
DisplayMode.defaultProps = {
	id: uuid.v4(),
	displayModes: ['table', 'large'],
	mode: 'table',
	t: getDefaultT(),
};
DisplayMode.propTypes = {
	displayModes: PropTypes.arrayOf(PropTypes.string),
	id: PropTypes.string,
	mode: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	t: PropTypes.func,
};

export default translate(I18N_DOMAIN_COMPONENTS)(DisplayMode);
