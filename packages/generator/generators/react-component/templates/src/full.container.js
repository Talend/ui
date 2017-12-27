import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { cmfConnect } from '@talend/react-cmf';

import Component from './<%= props.name %>.component';

export const DEFAULT_STATE = new Map({

});

class <%= props.name %> extends React.Component {
	static displayName = 'Container(<%= props.name %>)';
	static propTypes = {
		name: PropTypes.string,
		...cmfConnect.propTypes,

	};

	constructor(props) {
		super(props);
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
