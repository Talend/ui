import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ActionIconToggle } from '../../../Actions';
import getDefaultT from '../../../translate';

import theme from './DisplayModeToggle.scss';

const options = ['table', 'large'];
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

function DisplayModeToggle({ id, displayModes, onChange, mode, t }) {
	const [active, setActive] = useState(mode);

	const modes = displayModes || options;

	function getActionIcon(option) {
		return (<ActionIconToggle
			key={option}
			id={`${id}-${option}`}
			icon={option === 'table' ? 'talend-table' : 'talend-expanded'}
			label={getLabel(option, t)}
			aria-label={t('LIST_SELECT_DISPLAY_MODE', {
				defaultValue: 'Set {{displayMode}} as current display mode.',
				displayMode: option,
			})}
			active={active === option}
			disabled={active === option}
			onClick={e => {
				setActive(option);
				onChange(e, option);
			}}
		/>);
	}

	return (<div className={classNames(theme['tc-display-mode-toggle'], 'tc-display-mode-toggle')}>
		{ modes.map(getActionIcon) }
	</div>);
}

DisplayModeToggle.propTypes = {
	id: PropTypes.string,
	mode: PropTypes.string,
	displayModes: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

DisplayModeToggle.defaultProps = {
	t: getDefaultT(),
};

export default DisplayModeToggle;
