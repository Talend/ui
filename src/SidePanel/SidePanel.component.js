import React, { PropTypes } from 'react';
import { SidePanel as PureSidePanel } from 'react-talend-components';
import { api } from 'react-cmf';

/**
 * Checkout the {@link http://talend.github.io/react-talend-containers/examples/build/#/SidePanel|examples}
 * @param {object} props react props
 */
class SidePanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = { docked: false };
	}

	render() {
		const actions = this.props.actions || [];
		const resolvedActions = actions.map((action) => {
			const info = api.action.getActionInfo(this.context, action);
			return {
				label: info.name,
				icon: info.icon,
				onClick: () => {
					this.context.store.dispatch(info);
				},
			};
		});
		const newProps = {
			actions: resolvedActions,
			docked: this.state.docked,
			onToggleDock: () => {
				this.setState({ docked: !this.state.docked });
			},
		};
		return (<PureSidePanel {...newProps} />);
	}
}

SidePanel.propTypes = {
	actions: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object,
		])
	).isRequired,
};
SidePanel.contextTypes = {
	store: React.PropTypes.object,
};

export default SidePanel;
