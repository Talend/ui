import PropTypes from 'prop-types';
import React from 'react';
import { List, Map } from 'immutable';
import get from 'lodash/get';

import Component from '@talend/react-components/lib/ObjectViewer';
import { cmfConnect } from '@talend/react-cmf';

export const DEFAULT_STATE = new Map({
	edited: new List(), // Array of JSONPath
	opened: new List(), // Array of JSONPath
	selectedJsonpath: '', // Selected JSONPath
	modified: new Map(), // Store the onChange
});

export function open(path, state) {
	return state.set('opened', state.get('opened').push(path));
}

export function select(path, state) {
	return state.set('selectedJsonpath', path);
}

export function close(path, state) {
	const opened = state.get('opened');
	return state.set('opened', opened.delete(opened.indexOf(path)));
}

export function edit(path, state) {
	return state.set('edited', state.get('edited').push(path));
}

export function change(path, state, value) {
	return state.set('modified', state.get('modified').set(path, value));
}

export function toggleState(prevState, data) {
	if (data.isOpened) {
		return close(data.jsonpath, prevState.state);
	} else if (data.isOpened === false) {
		// we don't want to match on undefined as false
		return open(data.jsonpath, prevState.state);
	}

	return prevState;
}

export function openAllState(prevState, siblings) {
	let openedIds = prevState.state.get('opened');

	siblings
		.filter(({ data }) => typeof data === 'object')
		.forEach(({ jsonpath }) => {
			if (!openedIds.includes(jsonpath)) {
				openedIds = openedIds.push(jsonpath);
			}
		});

	return prevState.state.set('opened', openedIds);
}

export function selectWrapper(prevState, data) {
	return select(data.jsonpath, prevState.state);
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
		...cmfConnect.propTypes,
	};

	constructor(props) {
		super(props);
		this.onToggle = this.onToggle.bind(this);
		this.onToggleAllSiblings = this.onToggleAllSiblings.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSelect = this.onSelect.bind(this);
	}

	onToggle(event, data) {
		this.props.setState(prevState => toggleState(prevState, data));
	}

	onToggleAllSiblings(event, data) {
		this.props.setState(prevState => openAllState(prevState, data));
	}

	onEdit(event, data) {
		this.props.setState(prevState => editWrapper(prevState, data));
	}

	onChange(event, data) {
		this.props.setState(prevState => change(data.jsonpath, prevState.state, event.target.value));
	}

	onSelect(event, data) {
		this.props.setState(prevState => selectWrapper(prevState, data));
	}

	render() {
		const state = (this.props.state || DEFAULT_STATE).toJS();
		return (
			<Component
				{...this.props}
				onChange={this.props.onSubmit ? this.onChange : undefined}
				onSelect={this.onSelect}
				onEdit={this.onEdit}
				onToggle={this.onToggle}
				onToggleAllSiblings={this.onToggleAllSiblings}
				selectedJsonpath={state.selectedJsonpath}
				opened={state.opened}
				edited={state.edited}
			/>
		);
	}
}

export default ObjectViewer;
