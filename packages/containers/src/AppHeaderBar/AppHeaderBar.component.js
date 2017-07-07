import { cmfConnect } from 'react-cmf';
import { AppHeaderBar } from 'react-talend-components';

/**
 * bind the onClick to dispatch the router action
 */
export function mapDispatchToProps(dispatch) {
	return {
		brandLink: {
			onClick() {
				dispatch({
					type: '@@router/CALL_HISTORY_METHOD',
					payload: {
						method: 'push',
						args: ['/'],
					},
				});
			},
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

function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, dispatchProps, stateProps, ownProps);
	if (stateProps.brandLink) {
		props.brandLink.onClick = dispatchProps.brandLink.onClick;
	}
	return props;
}

export default cmfConnect({
	mapStateToProps,
	mapDispatchToProps,
	mergeProps,
})(AppHeaderBar);
