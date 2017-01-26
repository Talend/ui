import React, { PropTypes } from 'react';
import Immutable, { List, Map } from 'immutable';

import { ObjectViewer as Component } from 'react-talend-components';
import { statePropTypes, stateWillMount } from '../state';

export const DEFAULT_STATE = new Map({
	edited: new List(),  // Array of JSONPath
	opened: new List(),  // Array of JSONPath
	modified: new Map(),  // Store the onChange
});

class ObjectViewer extends React.Component {
	static displayName = 'CMFContainer(ObjectViewer)';
	static propTypes = {
		id: PropTypes.string,
		data: Component.propTypes.data,
		displayMode: Component.propTypes.displayMode,
		onSubmit: Component.propTypes.onSubmit,
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
		const opened = this.props.state.get('opened');
		const edited = this.props.state.get('edited');
		let newState;
		if (data.isOpened) {
			// we should close the tree
			newState = this.props.state.set(
				'opened',
				opened.delete(opened.indexOf(data.jsonpath))
			);
		} else if (data.isOpened === false) {
			// we don't want to match on undefined as false
			// we should open the tree
			newState = this.props.state.set(
				'opened',
				opened.push(data.jsonpath)
			);
		} else if (data.edit === false) {
			// we should edit this field
			newState = this.props.state.set(
				'edited',
				edited.push(data.jsonpath)
			);
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
		const { data, displayMode, ...props } = this.props;
		// TODO: add support for mutate the data using modified state
		// We need for that a better JSONPath support.
		return (
			<Component
				data={data}
				displayMode={displayMode}
				onClick={this.onClick}
				onSubmit={this.props.onSubmit}
				onChange={this.props.onSubmit ? this.onChange : null}
				opened={state.opened}
				edited={state.edited}
				{...props}
			/>
		);
	}
}

export default ObjectViewer;
