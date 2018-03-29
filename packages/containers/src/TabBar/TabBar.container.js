import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import Immutable from 'immutable';
import { cmfConnect } from '@talend/react-cmf';
import { TabBar as Component } from '@talend/react-components';

export const DEFAULT_STATE = new Immutable.Map({
	selectedKey: undefined,
});

export const DISPLAY_NAME = 'Container(TabBar)';

class TabBar extends React.Component {
	static displayName = DISPLAY_NAME;

	static propTypes = {
		...cmfConnect.propTypes,
		...Component.propTypes,
		onSelect: PropTypes.func,
		actionCreatorSelect: PropTypes.string,
	};

	static contextTypes = {
		registry: PropTypes.object,
		store: PropTypes.object,
	};

	constructor(props) {
		super(props);
		this.onSelect = this.onSelect.bind(this);
	}

	onSelect(event, data) {
		if (this.props.onSelect) {
			this.props.onSelect(event, data);
		}
		if (this.props.actionCreatorSelect) {
			this.props.dispatchActionCreator(this.props.actionCreatorSelect, event, { data });
		}
		this.props.setState(() => ({ selectedKey: data.key }));
	}

	render() {
		const state = this.props.state || DEFAULT_STATE;

		const props = Object.assign({}, omit(this.props, cmfConnect.INJECTED_PROPS), {
			onSelect: this.onSelect,
			selectedKey: state.get('selectedKey', undefined) || this.props.selectedKey,
		});

		return <Component {...props} />;
	}
}

export default TabBar;
