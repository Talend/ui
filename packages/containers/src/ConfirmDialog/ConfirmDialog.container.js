import PropTypes from 'prop-types';
import React from 'react';
import { Map } from 'immutable';
import omit from 'lodash/omit';
import Component from '@talend/react-components/lib/ConfirmDialog';
import { cmfConnect } from '@talend/react-cmf';

import { getActionsProps } from '../actionAPI';

export const DEFAULT_STATE = new Map({
	show: false,
});

class ConfirmDialog extends React.Component {
	static displayName = 'CMFContainer(ConfirmDialog)';
	static propTypes = {
		...cmfConnect.propTypes,
	};
	static contextTypes = {
		store: PropTypes.object,
		registry: PropTypes.object,
	};

	render() {
		const state = (this.props.state || DEFAULT_STATE).toJS();
		if (!state.validateAction || !state.cancelAction) {
			return null;
		}
		// this should be enough
		/* const props = Object.assign(
		 {},
		 state,
		 omit(this.props, cmfConnect.INJECTED_PROPS),
		 ); */
		// but as we don't have access to dispatch in the created context of mapStateToProps
		// we're having an issue on the setup of the onClick on button
		// for now we'll recompute them here where the context has dispatch
		// so the connect is only here to force the refresh for now

		state.validateAction = getActionsProps(this.context, state.validateAction, state.model);
		state.cancelAction = getActionsProps(this.context, state.cancelAction, state.model);
		const props = { ...omit(this.props, cmfConnect.INJECTED_PROPS), ...state };

		return <Component {...props} />;
	}
}

export default ConfirmDialog;
