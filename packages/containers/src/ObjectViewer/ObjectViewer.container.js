import React, { PropTypes } from 'react';
import { List, Map } from 'immutable';
import get from 'lodash/get';

import { ObjectViewer as Component } from 'react-talend-components';
import { componentState } from 'react-cmf';

export const DEFAULT_STATE = new Map({
	edited: new List(),  // Array of JSONPath
	opened: new List(),  // Array of JSONPath
	modified: new Map(),  // Store the onChange
});

export function open(path, state) {
	return state.set(
		'opened',
		state.get('opened').push(path),
	);
}

export function close(path, state) {
	const opened = state.get('opened');
	return state.set(
		'opened',
		opened.delete(opened.indexOf(path)),
	);
}

export function edit(path, state) {
	return state.set(
		'edited',
		state.get('edited').push(path),
	);
}

export function change(path, state, value) {
	return state.set(
		'modified',
		state.get('modified').set(path, value),
	);
}

class ObjectViewer extends React.Component {
	static displayName = 'CMFContainer(ObjectViewer)';
	static propTypes = {
		id: PropTypes.string,
		data: get(Component, 'propTypes.data', PropTypes.any),
		displayMode: get(Component, 'propTypes.displayMode', PropTypes.func),
		onSubmit: get(Component, 'propTypes.onSubmit', PropTypes.func),
		...componentState.propTypes,
	};

	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onClick(event, data) {
		let newState;
		if (data.isOpened) {
			newState = close(data.jsonpath, this.props.state);
		} else if (data.isOpened === false) {
			// we don't want to match on undefined as false
			newState = open(data.jsonpath, this.props.state);
		} else if (data.edit === false) {
			newState = edit(data.jsonpath, this.props.state);
		}
		if (newState) {
			this.props.setState(newState);
		}
	}

	onChange(event, data) {
		const newState = change(
			data.jsonpath,
			this.props.state,
			event.target.value,
		);
		this.props.setState(newState);
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
				onChange={this.props.onSubmit ? this.onChange : undefined}
				opened={state.opened}
				edited={state.edited}
			/>
		);
	}
}

export default ObjectViewer;
