import PropTypes from 'prop-types';
import React from 'react';
import { Map } from 'immutable';
import omit from 'lodash/omit';
import { ConfirmDialog as Component } from '@talend/react-components';
import { componentState, cmfConnect } from '@talend/react-cmf';

import { getActionsProps } from '../actionAPI';

export const DEFAULT_STATE = new Map({
	show: false,
});

class ConfirmDialog extends React.Component {
	static displayName = 'CMFContainer(ConfirmDialog)';
	static propTypes = {
		...componentState.propTypes,
	};
	static contextTypes = {
		store: PropTypes.object,
		registry: PropTypes.object,
		router: PropTypes.object,
	};

	render() {
		const state = (this.props.state || DEFAULT_STATE).toJS();
		const props = Object.assign({}, omit(this.props, cmfConnect.INJECTED_PROPS), state);
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
