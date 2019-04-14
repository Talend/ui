import React from 'react';
import { ActionIconToggle } from '../../../Actions';

import theme from './DisplayModeToggle.scss';

/**
 * TODO:
 *  hook
 *  label translations
 */
class DisplayModeToggle extends React.Component {
    constructor(props){
        super(props);
        // can I use hook here?
        this.state = {
            active: props.mode || 'table',
        }
    }

    render() {
        return (<span className={theme['tc-display-mode-toggle']}>
            <ActionIconToggle
                icon="talend-table"
                label="table"
                active={this.state.active === 'table'}
                disabled={this.state.active === 'table'}
                onClick={() => this.state.active = 'table'}
            />
            <ActionIconToggle
                icon="talend-expanded"
                label="large"
                active={this.state.active === 'large'}
                disabled={this.state.active === 'large'}
                onClick={() => this.state.active = 'large'}
            />
        </span>);
    }
}

export default DisplayModeToggle;