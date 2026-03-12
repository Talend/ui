import PropTypes from 'prop-types';
import { Component as RComponent } from 'react';
import get from 'lodash/get';

import Component from '@talend/react-components/lib/ObjectViewer';
import { cmfConnect } from '@talend/react-cmf';

export const DEFAULT_STATE = {
	edited: [], // Array of JSONPath
	opened: [], // Array of JSONPath
	selectedJsonpath: '', // Selected JSONPath
	modified: {}, // Store the onChange
};

export function open(path, state) {
	return { opened: [...(state.opened ?? []), path] };
}

export function select(path, state) {
	return { selectedJsonpath: path };
}

export function close(path, state) {
	return { opened: (state.opened ?? []).filter(p => p !== path) };
}

export function edit(path, state) {
	return { edited: [...(state.edited ?? []), path] };
}

export function change(path, state, value) {
	return { modified: { ...(state.modified ?? {}), [path]: value } };
}

export function toggleState(prevState, data) {
	if (data.isOpened) {
		return close(data.jsonpath, prevState.state);
	} else if (data.isOpened === false) {
		// we don't want to match on undefined as false
		return open(data.jsonpath, prevState.state);
	}

	return {};
}

export function openAllState(prevState, siblings) {
	const openedIds = prevState.state?.opened ?? [];
	const newIds = siblings
		.filter(({ data }) => typeof data === 'object')
		.map(({ jsonpath }) => jsonpath)
		.filter(id => !openedIds.includes(id));
	return { opened: [...openedIds, ...newIds] };
}

export function selectWrapper(prevState, data) {
	return select(data.jsonpath, prevState.state);
}

export function editWrapper(prevState, data) {
	if (data.edit === false) {
		return edit(data.jsonpath, prevState.state);
	}

	return {};
}

class ObjectViewer extends RComponent {
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
		const state = this.props.state || DEFAULT_STATE;
		return (
			<Component
				{...this.props}
				onChange={this.props.onSubmit ? this.onChange : undefined}
				onSelect={this.onSelect}
				onEdit={this.onEdit}
				onToggle={this.onToggle}
				onToggleAllSiblings={this.onToggleAllSiblings}
				selectedJsonpath={state.selectedJsonpath}
				opened={state.opened ?? []}
				edited={state.edited ?? []}
			/>
		);
	}
}

export default ObjectViewer;
