import React, { useState } from 'react';
import { ActionIconToggle } from '../../../Actions';

import theme from './DisplayModeToggle.scss';

/**
 * TODO:
 *  label translations
 */
function DisplayModeToggle(props) {

    const [active, setActive] = useState(props.mode);

        return (<span className={theme['tc-display-mode-toggle']}>
            <ActionIconToggle
                icon="talend-table"
                label="table"
                active={active === 'table'}
                disabled={active === 'table'}
                onClick={() => setActive('table')}
            />
            <ActionIconToggle
                icon="talend-expanded"
                label="large"
                active={active === 'large'}
                disabled={active === 'large'}
                onClick={() => setActive('large')}
            />
        </span>);
}

export default DisplayModeToggle;