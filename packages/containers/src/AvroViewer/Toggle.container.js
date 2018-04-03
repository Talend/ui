import React from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';
import { ObjectViewer } from '@talend/react-components';

export const DEFAULT_STATE = new Map({
	// edited: new List(), // Array of JSONPath
	// opened: new List(), // Array of JSONPath
	// selectedJsonpath: '', // Selected JSONPath
	// modified: new Map(), // Store the onChange
	opened: new Map(),
	// isSingle: false,
});

export default class Toggle extends React.Component {
	static displayName = 'CMFContainer(Toggle)';
	static propTypes = {
		onToggle: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.onToggle = this.onToggle.bind(this);
	}

	onToggle(event, options, index = 'default') {
		const state = this.props.state || DEFAULT_STATE;
		let itemOpened = state.getIn(['opened', index], []);
		if (options.isOpened) {
			itemOpened = itemOpened.filter(path => path !== options.jsonpath);
		} else {
			itemOpened = itemOpened.concat(options.jsonpath);
		}
		this.props.setState({
			// isSingle: index === 'default',
			opened: this.props.state.get('opened').set(index, itemOpened),
			// ...state.get('opened'),
			// [index]: itemOpened,
			// },
		});
		if (this.props.onToggle) {
			this.props.onToggle(event, options, index);
		}
	}

	render() {
		const state = this.props.state || DEFAULT_STATE;
		// const opened = state.get('isSingle') ? state.getIn(['opened', 'default'], []) : state.get('opened', []);
		return (
			<ObjectViewer {...this.props} onToggle={this.onToggle} opened={state.get('opened').toJS()} />
		);
	}
}
