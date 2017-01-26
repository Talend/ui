import React, { PropTypes } from 'react';
import { Map } from 'immutable';

import { ObjectViewer as Component } from 'react-talend-components';
import { statePropTypes, stateWillMount } from '../state';

export const DEFAULT_STATE = new Map({

});

class ObjectViewer extends React.Component {
	static displayName = 'CMFContainer(ObjectViewer)';
	static propTypes = {
		id: PropTypes.string,
		data: PropTypes.string.isRequired,
		displayMode: PropTypes.string,
		...statePropTypes,
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		stateWillMount(this.props);
	}

	render() {
		const state = (this.props.state || DEFAULT_STATE).toJS();
		return (
			<Component
				data={this.props.data}
				displayMode={this.props.displayMode}
			/>
		);
	}
}

export default ObjectViewer;
