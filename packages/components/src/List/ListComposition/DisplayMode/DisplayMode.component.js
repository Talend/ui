import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavDropdown, Nav, MenuItem } from 'react-bootstrap';
import uuid from 'uuid';

import useDisplayMode from './useDisplayMode';
import { useListContext } from '../context';
import Icon from '../../../Icon';

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
			return option;
	}
}

function DisplayMode(props) {
	const { propagateDisplayMode, t } = useListContext();
	const { initialDisplayMode, onChange = propagateDisplayMode } = props;
	const [displayMode, setDisplayMode] = useDisplayMode(initialDisplayMode, onChange);
	const { id, displayModes, selectedDisplayMode = displayMode } = props;

	return (
		<React.Fragment>
			<Navbar.Text>
				<label htmlFor={id}>{t('LIST_TOOLBAR_DISPLAY', { defaultValue: 'Display:' })}</label>
			</Navbar.Text>
			<Nav>
				<NavDropdown
					id={id}
					title={<Icon name={getIcon(selectedDisplayMode)} />}
					onSelect={(value, event) => setDisplayMode(event, value)}
					aria-label={t('LIST_CHANGE_DISPLAY_MODE', {
						defaultValue: 'Change display mode. Current display mode: {{displayMode}}.',
						displayMode: selectedDisplayMode,
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
	initialDisplayMode: 'table',
};
DisplayMode.propTypes = {
	displayModes: PropTypes.arrayOf(PropTypes.string),
	id: PropTypes.string,
	initialDisplayMode: PropTypes.string,
	onChange: PropTypes.func,
	selectedDisplayMode: PropTypes.string,
};

export default DisplayMode;
