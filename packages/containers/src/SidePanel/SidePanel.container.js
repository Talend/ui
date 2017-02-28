import get from 'lodash/get';
import React, { PropTypes } from 'react';
import { SidePanel as Component } from 'react-talend-components';
import { api } from 'react-cmf';
import { Map } from 'immutable';

import { statePropTypes, stateWillMount } from '../state';

export const DEFAULT_STATE = new Map({
	docked: false,
});

/**
 * Checkout the {@link http://talend.github.io/react-talend-containers/examples/build/#/SidePanel|examples}
 * @param {object} props react props
 */
class SidePanel extends React.Component {
	static propTypes = {
		actionIds: PropTypes.arrayOf(
			PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.object,
			]),
		),
		...statePropTypes,
	};
	static contextTypes = {
		store: React.PropTypes.object,
		router: React.PropTypes.object,
	};

	componentWillMount() {
		stateWillMount(this.props);
	}

	render() {
		const { actionIds = [], state = DEFAULT_STATE, ...rest } = this.props;
		const actions = actionIds.map((id) => {
			const info = api.action.getActionInfo(this.context, id);
			info.onClick = () => this.context.store.dispatch(info.payload);
			const route = get(info, 'payload.cmf.routerReplace');
			if (route) {
				const currentRoute = this.context.router.location.pathname;
				if (currentRoute.indexOf(route) !== -1) {
					info.active = true;
				}
			}
			return info;
		});
		const props = Object.assign({
			actions,
			docked: state.get('docked'),
			onToggleDock: () => {
				this.props.updateState({ docked: !state.get('docked') });
			},
		});

		return (<Component {...rest} {...props} />);
	}
}

export default SidePanel;
