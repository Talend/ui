import PropTypes from 'prop-types';
import React from 'react';
import { SidePanel as Component } from '@talend/react-components';
import { cmfConnect } from '@talend/react-cmf';
import { Map } from 'immutable';
import omit from 'lodash/omit';

export const DEFAULT_STATE = new Map({
	docked: false,
});

/**
 * Checkout the {@link http://talend.surge.sh/containers/?selectedKind=SidePanelExample&selectedStory=Default|examples}
 * @param {object} props react props
 */
class SidePanel extends React.Component {
	static displayName = 'Container(SidePanel)';
	static propTypes = {
		...cmfConnect.propTypes,
	};
	static contextTypes = {
		store: PropTypes.object,
		router: PropTypes.object,
		registry: PropTypes.object,
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
		const { state = DEFAULT_STATE } = this.props;
		const props = Object.assign(
			{},
			{
				docked: state.get('docked'),
				onToggleDock: this.onToggleDock,
			},
			omit(this.props, cmfConnect.INJECTED_PROPS),
		);
		return <Component {...props} />;
	}
}

export default SidePanel;
