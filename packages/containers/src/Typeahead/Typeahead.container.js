import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { cmfConnect, componentState } from '@talend/react-cmf';
import { Typeahead as Component } from '@talend/react-components';
import omit from 'lodash/omit';

export const DISPLAY_NAME = 'Container(TreeView)';
export const DEFAULT_STATE = new Immutable.Map({
	displayMode: 'BUTTON',
});

/**
 * The Typeahead React container
 */
export default class Typeahead extends React.Component {
	static displayName = DISPLAY_NAME;
	static propTypes = {
		// onClickActionCreator: PropTypes.string,
		// onSelectActionCreator: PropTypes.string,
		...componentState.propTypes,
	};
	// static defaultProps = DEFAULT_PROPS;

	constructor(props) {
		super(props);
		this.onToggle = this.onToggle.bind(this);
	}

	onToggle() {
		this.props.state.set('displayMode', 'INPUT');
	}

	render() {
		const mode = this.props.state.get('displayMode');
		const props = Object.assign({}, omit(this.props, cmfConnect.INJECTED_PROPS), {
			onToggle: mode === 'BUTTON' && this.onToggle,
		});

		return <Component {...props} />;
	}
}
