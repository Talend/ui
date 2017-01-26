import React, { PropTypes } from 'react';
import { List, Map } from 'immutable';

import { ObjectViewer as Component } from 'react-talend-components';
import { statePropTypes, stateWillMount } from '../state';

export const DEFAULT_STATE = new Map({
	edited: new List(),  // Array of JSONPath
	opened: new List(),  // Array of JSONPath
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
		this.onClick = this.onClick.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentWillMount() {
		stateWillMount(this.props);
	}

	onClick(event, data) {
		console.log({ event, data });
		if (data.isOpened) {
			//we should close the tree
		} else if (data.isOpened === false) {
			// we don't want to match on undefined as false
			//we should open the tree
		} else if (data.isEdited) {
			//we should edit this field
		}
		data.jsonpath;
	}

	onSubmit(event, data) {
		console.log({ event, data });
	}

	onChange(event, data) {
		console.log({ event, data });
	}

	render() {
		const state = (this.props.state || DEFAULT_STATE).toJS();
		return (
			<Component
				data={this.props.data}
				displayMode={this.props.displayMode}
				onClick={this.onClick}
				onSubmit={this.onSubmit}
				onChange={this.onChange}
				opened={state.opened}
				edited={state.edited}
			/>
		);
	}
}

export default ObjectViewer;
