import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import { componentState } from 'react-talend-containers';

import Component from './<%= props.name %>.component';

export const DEFAULT_STATE = new Map({

});

class <%= props.name %> extends React.Component {
	static displayName = 'CMFContainer(<%= props.name %>)';
	static propTypes = {
		name: PropTypes.string,
		...componentState.propTypes,

	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		componentState.init(this.props);
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
