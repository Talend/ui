import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import { ConfirmDialog as Component } from 'react-talend-components';

import { getActionsProps } from '../actionAPI';
import { statePropTypes, initState } from '../state';

export const DEFAULT_STATE = new Map({
	show: false,
});

class ConfirmDialog extends React.Component {
	static displayName = 'CMFContainer(ConfirmDialog)';
	static propTypes = {
		...statePropTypes,
	};

	static contextTypes = {
		store: PropTypes.object,
		registry: PropTypes.object,
	};

	componentDidMount() {
		initState(this.props);
	}

	render() {
		const state = (this.props.state || DEFAULT_STATE).toJS();
		if (!state.validateAction || !state.cancelAction) {
			return null;
		}
		// looking for the given action setting
		// and adding onClick event using the retrieved  action creator
		state.validateAction = getActionsProps(this.context, state.validateAction, state.model);
		state.cancelAction = getActionsProps(this.context, state.cancelAction, state.model);

		return (
			<Component
				{...state}
			/>
		);
	}
}

export default ConfirmDialog;
