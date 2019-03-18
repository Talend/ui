import React from 'react';
import PropTypes from 'prop-types';

import { ListContext } from './context';

export default class Manager extends React.Component {
	static displayName = 'List.Manager';
	static propTypes = {
		children: PropTypes.node,

		displayMode: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
		onDisplayModeChange: PropTypes.func,
	};

	static getDerivedStateFromProps(props) {
		return { collection: props.collection };
	}

	constructor(props) {
		super(props);
		this.onDisplayModeChange = this.onDisplayModeChange.bind(this);

		this.state = {};
	}

	onDisplayModeChange(event, displayMode) {
		if (this.props.onDisplayModeChange) {
			// controlled display mode
			this.props.onDisplayModeChange(event, displayMode);
		} else {
			// uncontrolled
			this.setState({ displayMode });
		}
	}

	getCurrentValue(keys) {
		if (Array.isArray(keys)) {
			return keys.reduce((accu, key) => {
				// eslint-disable-next-line no-param-reassign
				accu[key] = key in this.state ? this.state[key] : this.props[key];
				return accu;
			}, {});
		}
		return keys in this.state ? this.state[keys] : this.props[keys];
	}

	render() {
		const contextValues = {
			...this.state,
			...this.getCurrentValue(['displayMode']),
			onDisplayModeChange: this.onDisplayModeChange,
		};

		return <ListContext.Provider value={contextValues}>{this.props.children}</ListContext.Provider>;
	}
}
