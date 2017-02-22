import React, { PropTypes } from 'react';
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
		label: 'No !',
	},
});

class ConfirmDialog extends React.Component {
	static displayName = 'CMFContainer(ConfirmDialog)';
	static propTypes = {
		...statePropTypes,
	};

	componentDidMount() {
		initState(this.props);
	}

	render() {
		const state = (this.props.state || DEFAULT_STATE).toJS();
		return (
			<Component
				{...state}
			/>
		);
	}
}

export default ConfirmDialog;
