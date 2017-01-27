import React, { PropTypes } from 'react';
import Immutable, { List, Map } from 'immutable';
import get from 'lodash/get';

import { ObjectViewer as Component } from 'react-talend-components';
import { statePropTypes, stateWillMount } from '../state';

export const DEFAULT_STATE = new Map({
	edited: new List(),  // Array of JSONPath
	opened: new List(),  // Array of JSONPath
	modified: new Map(),  // Store the onChange
});

export function open(path, props) {
	return props.state.set(
		'opened',
		props.state.get('opened').push(path)
	);
}

export function close(path, props) {
	const opened = props.state.get('opened');
	return props.state.set(
		'opened',
		opened.delete(opened.indexOf(path))
	);
}

export function edit(path, props) {
	props.state.set(
		'edited',
		props.state.get('edited').push(path)
	);
}

class ObjectViewer extends React.Component {
	static displayName = 'CMFContainer(ObjectViewer)';
	static propTypes = {
		id: PropTypes.string,
		data: get(Component, 'propTypes.data'),
		displayMode: get(Component, 'propTypes.displayMode'),
		onSubmit: get(Component, 'propTypes.onSubmit'),
		...statePropTypes,
	};

	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentWillMount() {
		stateWillMount(this.props);
	}

	onClick(event, data) {
		let newState;
		if (data.isOpened) {
			newState = close(data.jsonpath, this.props);
		} else if (data.isOpened === false) {
			// we don't want to match on undefined as false
			newState = open(data.jsonpath, this.props);
		} else if (data.edit === false) {
			newState = edit(data.jsonpath, this.props)
		}
		if (newState) {
			this.props.updateState(newState);
		}
	}

	onChange(event, data) {
		const modified = this.props.state.get('modified');
		this.props.state.set(
			'modified',
			modified.set(
				data.jsonpath,
				event.target.value
			)
		);
	}

	render() {
		const state = (this.props.state || DEFAULT_STATE).toJS();
		// TODO: add support for mutate the data using modified state
		// We need for that a better JSONPath support.
		return (
			<Component
				data={this.props.data}
				displayMode={this.props.displayMode}
				onClick={this.onClick}
				onSubmit={this.props.onSubmit}
				onChange={this.props.onSubmit ? this.onChange : null}
				opened={state.opened}
				edited={state.edited}
			/>
		);
	}
}

export default ObjectViewer;
