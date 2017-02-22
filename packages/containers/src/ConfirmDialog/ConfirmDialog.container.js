import React, { PropTypes } from 'react';
import { api } from 'react-cmf';
import { Map } from 'immutable';
import { ConfirmDialog as Component } from 'react-talend-components';

import { statePropTypes, initState } from '../state';

export const DEFAULT_STATE = new Map({
	size: 'small',
	header: '',
	show: false,
	children: '',
	validateAction: {
		label: 'Ok',
		bsStyle: 'primary',
	},
	cancelAction: {
		label: 'No',
	},
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
		const actions = this.props.actions;
		state.validateAction.onClick = (event, data) => {
			this.props.dispatch(
				api.action.getActionCreatorFunction(
					this.context,
					actions.removeSmType
				)(event, data, this.context),
			);
		};

		state.cancelAction.onClick = (event, data) => {
			this.props.dispatch(
				api.action.getActionCreatorFunction(
					this.context,
					actions.cancelRemoveSmType
				)(event, data, this.context),
			);
		};

		return (
			<Component
				{...state}
			/>
		);
	}
}

export default ConfirmDialog;
