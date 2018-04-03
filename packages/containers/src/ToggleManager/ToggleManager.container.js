import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { ObjectViewer } from '@talend/react-components';

export const DEFAULT_STATE = new Map({
	opened: Immutable.Map(),
});

export default class ToggleManager extends React.Component {
	static displayName = 'CMFContainer(ToggleManager)';
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
		const opened = state.get('opened').toJS();
		return <ObjectViewer {...this.props} onToggle={this.onToggle} opened={opened} />;
	}
}
