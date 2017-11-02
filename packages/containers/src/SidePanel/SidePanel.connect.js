import get from 'lodash/get';
import { api, cmfConnect } from '@talend/react-cmf';
import { withRouter } from 'react-router';
import Container, { DEFAULT_STATE } from './SidePanel.container';

function mapStateToProps(state, ownProps) {
	const props = {};
	if (ownProps.actionIds) {
		props.actions = ownProps.actionIds.map((id) => {
			const info = api.action.getActionInfo({
				registry: api.registry.getRegistry(),
				store: {
					getState: () => state,
				},
			}, id);
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
					info.active = true;
				}
			}
			return info;
		});
	}
	return props;
}

export default withRouter(cmfConnect({
	defaultState: DEFAULT_STATE,
	keepComponentState: true,
	mapStateToProps,
})(Container));
