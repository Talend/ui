import { Component as RComponent } from 'react';

import { Map } from 'immutable';
import omit from 'lodash/omit';

import { cmfConnect } from '@talend/react-cmf';
import Component from '@talend/react-components/lib/SidePanel';

import { ACTION_TYPE_LINK } from './constants';

export const DEFAULT_STATE = new Map({
	docked: false,
});

/**
 * Checkout the {@link http://talend.github.io/ui/main/containers/?selectedKind=SidePanelExample&selectedStory=Default|examples}
 * @param {object} props react props
 */
class SidePanel extends RComponent {
	static displayName = 'Container(SidePanel)';

	static propTypes = {
		...cmfConnect.propTypes,
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
		const props = {
			docked: state.get('docked'),
			onToggleDock: this.onToggleDock,
			...omit(this.props, cmfConnect.INJECTED_PROPS),
		};
		return <Component {...props} />;
	}
}

SidePanel.ACTION_TYPE_LINK = ACTION_TYPE_LINK;
export default SidePanel;
