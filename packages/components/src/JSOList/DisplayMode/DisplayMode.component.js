import PropTypes from 'prop-types';
import React from 'react';
import { translate } from 'react-i18next';
import { Nav, NavDropdown, Navbar, MenuItem } from 'react-bootstrap';
import uuid from 'uuid';

import { ListContext } from '../context';
import Icon from '../../Icon';
import getDefaultT from '../../translate';
import I18N_DOMAIN_COMPONENTS from '../../constants';

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

class DisplayMode extends React.Component {
	static displayName = 'List.DisplayMode';
	static propTypes = {
		displayModes: PropTypes.arrayOf(PropTypes.string),
		id: PropTypes.string,
		mode: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		t: PropTypes.func,
	};
	static defaultProps = {
		id: uuid.v4(),
		displayModes: ['table', 'large'],
		mode: 'table',
		t: getDefaultT(),
	};

	getLabel(mode) {
		const { t } = this.props;
		switch (mode) {
			case 'table':
				return t('LIST_SELECT_DISPLAY_MODE_TABLE', { defaultValue: 'Table' });
			case 'large':
				return t('LIST_SELECT_DISPLAY_MODE_LARGE', { defaultValue: 'Expanded' });
			default:
				return t('LIST_SELECT_DISPLAY_MODE_TABLE', { defaultValue: 'Table' });
		}
	}

	getMenuItems() {
		return this.props.displayModes.map(option => {
			const displayModeLabel = this.getLabel(option);
			const { id, t } = this.props;
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
		});
	}

	render() {
		const { id, mode, onChange, t } = this.props;
		const items = this.getMenuItems();
		return (
			<Nav>
				<Navbar.Text>
					<label htmlFor={id}>{t('LIST_TOOLBAR_DISPLAY', { defaultValue: 'Display:' })}</label>
				</Navbar.Text>
				<NavDropdown
					id={id}
					title={<Icon name={getIcon(mode)} />}
					onSelect={(value, event) => onChange(event, value)}
					aria-label={t('LIST_CHANGE_DISPLAY_MODE', {
						defaultValue: 'Change display mode. Current display mode: {{displayMode}}.',
						displayMode: mode,
					})}
				>
					{items}
				</NavDropdown>
			</Nav>
		);
	}
}

function ContextualDisplayMode(props) {
	return (
		<ListContext.Consumer>
			{({ displayMode, onDisplayModeChange }) => (
				<DisplayMode mode={displayMode} onChange={onDisplayModeChange} {...props} />
			)}
		</ListContext.Consumer>
	);
}
ContextualDisplayMode.displayName = 'ListContext(List.DisplayMode)';

export default translate(I18N_DOMAIN_COMPONENTS)(ContextualDisplayMode);
