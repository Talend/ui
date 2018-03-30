import PropTypes from 'prop-types';
import React from 'react';
import { List, Map } from 'immutable';
import get from 'lodash/get';

import { ObjectViewer as Component } from '@talend/react-components';
import { componentState } from '@talend/react-cmf';

export const DEFAULT_STATE = new Map({
	edited: new List(), // Array of JSONPath
	// opened: new List(), // Array of JSONPath
	selectedJsonpath: '', // Selected JSONPath
	modified: new Map(), // Store the onChange
	opened: new Map(),
});

export function open(path, state, index) {
	// console.log('opened push', state.get('opened').push(path));
	// return state.set('opened', state.get('opened').push(path));
	console.log('index', index, path);
	const opened = state.get('opened');
	const paths = opened.get(index, new List());
	return state.set('opened', opened.set(index, paths.push(path)));
}

export function select(path, state) {
	return state.set('selectedJsonpath', path);
}

export function close(path, state, index) {
	const opened = state.get('opened');
	// return state.set('opened', opened.delete(opened.indexOf(path)));
	return state.set('opened', opened.delete(index));
}

export function edit(path, state) {
	return state.set('edited', state.get('edited').push(path));
}

export function change(path, state, value) {
	return state.set('modified', state.get('modified').set(path, value));
}

export function toggleState(prevState, data, index = 'default') {
	if (data.isOpened) {
		return close(data.jsonpath, prevState.state, index);
	} else if (data.isOpened === false) {
		// we don't want to match on undefined as false
		return open(data.jsonpath, prevState.state, index);
	}
	return prevState;
}

export function selectWrapper(prevState, data) {
	return select(data, prevState.state);
}

export function editWrapper(prevState, data) {
	if (data.edit === false) {
		return edit(data.jsonpath, prevState.state);
	}

	return prevState;
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
		this.onToggle = this.onToggle.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSelect = this.onSelect.bind(this);
	}

	onToggle(event, data, index) {
		this.props.setState(prevState => toggleState(prevState, data, index));
	}

	onEdit(event, data) {
		this.props.setState(prevState => editWrapper(prevState, data));
	}

	onChange(event, data) {
		this.props.setState(prevState => change(data.jsonpath, prevState.state, event.target.value));
	}

	onSelect(event, data) {
		this.props.setState(prevState => selectWrapper(prevState, data));
		if (this.props.onSelect) {
			this.props.onSelect(event, data);
		}
	}

	render() {
		const state = (this.props.state || DEFAULT_STATE).toJS();
		const opened = (this.props.state || DEFAULT_STATE).get('opened');
		console.log('object viewer opened', opened.toJS());
		// TODO: add support for mutate the data using modified state
		// We need for that a better JSONPath support.
		return (
			<Component
				{...this.props}
				onChange={this.props.onSubmit ? this.onChange : undefined}
				onSelect={this.onSelect}
				onEdit={this.onEdit}
				onToggle={this.onToggle}
				selectedJsonpath={state.selectedJsonpath}
				opened={opened.toJS()}
				edited={(this.props.state || DEFAULT_STATE).toJS()}
			/>
		);
	}
}

export default ObjectViewer;
