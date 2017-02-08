import React, { PropTypes } from 'react';
import { Map } from 'immutable';

import Component from './<%= props.name %>.component';
import { statePropTypes, initState } from '../state';

export const DEFAULT_STATE = new Map({

});

class <%= props.name %> extends React.Component {
	static displayName = 'CMFContainer(<%= props.name %>)';
	static propTypes = {
		name: PropTypes.string,
		...statePropTypes,

	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		initState(this.props);
	}

	render() {
		const state = (this.props.state || DEFAULT_STATE).toJS();
		return (
			<Component
				name={state.name}
			/>
		);
	}
}

export default <%= props.name %>;
