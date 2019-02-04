import React from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';

import { ListContext } from './context';
import Toolbar from './Toolbar';
import DisplayMode from './DisplayMode';
import SortBy from './SortBy';
import VList from './VList';

function defaultFilter(items, sortBy, isDescending) {
	if (!sortBy) {
		return items;
	}

	return items.sort((itemA, itemB) => {
		const itemAValue = itemA[sortBy];
		const itemBValue = itemB[sortBy];
		if (itemAValue === itemBValue) {
			return 0;
		} else if (itemAValue > itemBValue) {
			return isDescending ? -1 : 1;
		}
		return isDescending ? 1 : -1;
	});
}

class Container extends React.Component {
	static displayName = 'List.Container';
	static propTypes = {
		children: PropTypes.node,

		displayMode: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
		onDisplayModeChange: PropTypes.func,

		sort: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
		sortBy: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
		sortDescending: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
		onSortChange: PropTypes.func,
	};
	static defaultProps = {
		displayMode: 'table',
		sortDescending: false,
		sort: memoizeOne(defaultFilter),
	};

	static getDerivedStateFromProps(props, state) {
		const nextState = { collection: props.collection };

		// uncontrolled sort
		if (!props.onSortChange) {
			nextState.collection = props.sort(props.collection, state.sortBy, state.sortDescending);
		}

		return {
			collection: props.sort(props.collection, state.sortBy, state.sortDescending),
		};
	}

	constructor(props) {
		super(props);
		this.onDisplayModeChange = this.onDisplayModeChange.bind(this);
		this.onSortChange = this.onSortChange.bind(this);
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

	onSortChange(event, sort) {
		if (this.props.onSortChange) {
			// controlled sort
			this.props.onSortChange(event, sort);
		} else {
			// uncontrolled
			this.setState({ sortBy: sort.sortBy, sortDescending: sort.isDescending });
		}
	}

	getCurrentValue(keys) {
		return keys.reduce((accu, key) => {
			// eslint-disable-next-line no-param-reassign
			accu[key] = key in this.state ? this.state[key] : this.props[key];
			return accu;
		}, {});
	}

	render() {
		const contextValues = {
			...this.state,
			...this.getCurrentValue(['displayMode', 'sortBy', 'sortDescending']),
			onDisplayModeChange: this.onDisplayModeChange,
			onSortChange: this.onSortChange,
		};
		return <ListContext.Provider value={contextValues}>{this.props.children}</ListContext.Provider>;
	}
}

export default {
	Container,
	Toolbar,
	DisplayMode,
	SortBy,
	VList,
};
