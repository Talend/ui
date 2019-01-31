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
		displayMode: PropTypes.string,
		onDisplayModeChange: PropTypes.func,
		onSortChange: PropTypes.func,
		sort: PropTypes.func,
		sortBy: PropTypes.string,
		sortDescending: PropTypes.bool,
	};
	static defaultProps = {
		displayMode: 'table',
		sortDescending: false,
		sort: memoizeOne(defaultFilter),
	};

	static getDerivedStateFromProps(props, state) {
		return {
			collection: props.sort(props.collection, state.sortBy, state.sortDescending),
		};
	}

	constructor(props) {
		super(props);
		this.onDisplayModeChange = this.onDisplayModeChange.bind(this);
		this.onSortChange = this.onSortChange.bind(this);
		this.state = {
			displayMode: props.displayMode,
			sortBy: props.sortBy,
			sortDescending: props.sortDescending,
		};
	}

	onDisplayModeChange(event, displayMode) {
		this.setState({ displayMode }, () => {
			if (this.props.onDisplayModeChange) {
				this.props.onDisplayModeChange(event, displayMode);
			}
		});
	}

	onSortChange(event, sort) {
		this.setState({ sortBy: sort.sortBy, sortDescending: sort.isDescending }, () => {
			if (this.props.onSortChange) {
				this.props.onSortChange(event, sort);
			}
		});
	}

	render() {
		const contextValues = {
			...this.state,
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
