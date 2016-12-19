import React from 'react';
import { connect } from 'react-redux';
import { AppHeaderBar } from 'react-talend-components';

/**
 * bind the onClick to dispatch the router action
 */
export function mapDispatchToProps(dispatch) {
	return {
		onClick() {
			dispatch({
				type: '@@router/CALL_HISTORY_METHOD',
				payload: {
					method: 'push',
					args: ['/'],
				},
			});
		},
	};
}

/**
 * map the the settings views.appheaderbar
 * @param  {Object} state [description]
 * @return {Object}       [description]
 */
export function mapStateToProps(state) {
	return state.cmf.settings.views.appheaderbar || {};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AppHeaderBar);
