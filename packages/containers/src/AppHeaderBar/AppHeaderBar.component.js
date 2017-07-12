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

/**
 * If the AppHeaderBar has a brand link configuration,
 * we inject the onClick from mapDispatchToProps in this configuration
 */
export function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = {
		...dispatchProps,
		...stateProps,
		...ownProps,
	};
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
