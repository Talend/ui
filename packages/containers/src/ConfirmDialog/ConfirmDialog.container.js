import React from 'react';
import { Map } from 'immutable';
import omit from 'lodash/omit';
import Component from '@talend/react-components/lib/ConfirmDialog';
import { cmfConnect, useCMFContext } from '@talend/react-cmf';

import { getActionsProps } from '../actionAPI';

export const DEFAULT_STATE = new Map({
	show: false,
});

// This uses old react context, so no way to switch to stateless function instead of class
// eslint-disable-next-line react/prefer-stateless-function
function ConfirmDialog(props) {
	const context = useCMFContext();
	const state = (props.state || DEFAULT_STATE).toJS();
	if (!state.validateAction || !state.cancelAction) {
		return null;
	}
	// this should be enough
	/* const props = Object.assign(
		{},
		state,
		omit(props, cmfConnect.INJECTED_PROPS),
		); */
	// but as we don't have access to dispatch in the created context of mapStateToProps
	// we're having an issue on the setup of the onClick on button
	// for now we'll recompute them here where the context has dispatch
	// so the connect is only here to force the refresh for now

	state.validateAction = getActionsProps(context, state.validateAction, state.model);
	state.cancelAction = getActionsProps(context, state.cancelAction, state.model);
	const newProps = { ...omit(props, cmfConnect.INJECTED_PROPS), ...state };

	return <Component {...newProps} />;
}

ConfirmDialog.displayName = 'CMFContainer(ConfirmDialog)';

ConfirmDialog.propTypes = {
	...cmfConnect.propTypes,
};

export default ConfirmDialog;
