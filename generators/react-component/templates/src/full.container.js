import React, { PropTypes } from 'react';
import { Map } from 'immutable';

import Component from './<%= props.name %>.component';

export const DEFAULT_STATE = new Map({

});

class <%= props.name %> extends React.Component {
	static displayName = 'CMFContainer(<%= props.name %>)';
	static propTypes = {
		initState: PropTypes.func,
		updateState: PropTypes.func,
		state: PropTypes.shape({

		}),
		name: PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		if (!this.props.state && this.props.initState) {
			this.props.initState();
		}
	}

	render() {
		const state = (this.props.state || DEFAULT_STATE).toJS();
		return (
			<Component name={state.name} />
		);
	}
}

export default <%= props.name %>;
