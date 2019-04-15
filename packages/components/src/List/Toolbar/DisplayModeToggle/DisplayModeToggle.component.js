import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'react-bootstrap';
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

function DisplayModeToggle({id, displayModes, onChange, mode, t}) {

    const [active, setActive] = useState(mode);

    const modes = displayModes || options;

    function getActionIcon(mode) {
        return (<ActionIconToggle
            id={`${id}-${mode}`}
            icon={mode === 'table'? 'talend-table':'talend-expaned'}
            label={getLabel(mode, t)}
            aria-label={t('LIST_SELECT_DISPLAY_MODE', {
                defaultValue: 'Set {{displayMode}} as current display mode.',
                displayMode: mode,
            })}
            active={active === mode}
            disabled={active === mode}
            onClick={(e) => {
                setActive(mode);
                onChange(e, mode);
            }}
        />);
    }

    return (<MenuItem className={theme['tc-display-mode-toggle']}>
        {modes.map(getActionIcon)}
    </MenuItem>);
}

DisplayModeToggle.propTypes = {
    id: PropTypes.string,
    mode: PropTypes.string,
    displayModes: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
}

DisplayModeToggle.defaultProps = {
    t: getDefaultT(),
};

export default DisplayModeToggle;