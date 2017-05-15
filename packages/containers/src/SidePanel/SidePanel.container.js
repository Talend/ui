import get from 'lodash/get';
import React, { PropTypes } from 'react';
import { SidePanel as Component } from 'react-talend-components';
import { api, componentState } from 'react-cmf';
import { Map } from 'immutable';

export const DEFAULT_STATE = new Map({
	docked: false,
});


export function getActions(actionIds, context) {
	return actionIds.map((id) => {
		const info = api.action.getActionInfo(context, id);
		info.onClick = () => context.store.dispatch(info.payload);
		const route = get(info, 'payload.cmf.routerReplace');
		if (route) {
			const currentRoute = context.router.route.location.pathname;
			if (currentRoute.indexOf(route) !== -1) {
				info.active = true;
			}
		}
		return info;
	});
}

/**
 * Checkout the {@link http://talend.surge.sh/containers/?selectedKind=SidePanelExample&selectedStory=Default|examples}
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
		...componentState.propTypes,
	};
	static contextTypes = {
		store: React.PropTypes.object,
		router: React.PropTypes.object,
	};

	constructor(props, context) {
		super(props, context);
		this.onToggleDock = this.onToggleDock.bind(this);
	}

	onToggleDock() {
		const state = this.props.state || DEFAULT_STATE;
		this.props.setState({ docked: !state.get('docked') });
	}

	render() {
		const { actionIds = [], state = DEFAULT_STATE, ...rest } = this.props;
		const actions = getActions(actionIds, this.context);
		const props = Object.assign({
			actions,
			docked: state.get('docked'),
			onToggleDock: this.onToggleDock,
		});

		return (<Component {...rest} {...props} />);
	}
}

export default SidePanel;
