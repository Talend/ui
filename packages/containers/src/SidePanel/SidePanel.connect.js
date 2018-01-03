import get from 'lodash/get';
import { api, cmfConnect } from '@talend/react-cmf';
import { withRouter } from 'react-router'; // eslint-disable-line import/no-extraneous-dependencies
import Container, { DEFAULT_STATE } from './SidePanel.container';

export function mapStateToProps(state, ownProps) {
	const props = {};
	if (ownProps.actionIds) {
		props.actions = ownProps.actionIds.map(id => {
			const action = { actionId: id };
			const info = api.action.getActionInfo(
				{
					registry: api.registry.getRegistry(),
					store: {
						getState: () => state,
					},
				},
				id,
			);
			action.label = info.label;
			action.id = info.id;
			let route = get(info, 'payload.cmf.routerReplace');
			if (!route) {
				route = get(info, 'payload.cmf.routerPush');
			}
			if (!route) {
				route = get(info, 'href');
			}
			if (route) {
				const currentRoute = ownProps.location.pathname;
				if (currentRoute.indexOf(route) !== -1) {
					action.active = true;
				}
			}
			return action;
		});
	}
	return props;
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, ownProps, stateProps, dispatchProps);
	if (props.actionIds) {
		delete props.actionIds;
	}
	return props;
}

export default withRouter(
	cmfConnect({
		defaultState: DEFAULT_STATE,
		keepComponentState: true,
		mapStateToProps,
		mergeProps,
	})(Container),
);
