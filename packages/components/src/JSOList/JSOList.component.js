import React from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';

import { ListContext } from './context';
import Toolbar from './Toolbar';
import DisplayMode from './DisplayMode';
import Pagination from './Pagination';
import SelectAll from './SelectAll';
import SortBy from './SortBy';
import VList from './VList';

function defaultFilter(items, sortBy, isDescending) {
	if (!sortBy) {
		return items;
	}

	return items.slice(0).sort((itemA, itemB) => {
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

function allIsSelected(collection, selectedItems) {
	return collection.every(item => selectedItems.includes(item));
}
const memoizedAllIsSelected = memoizeOne(allIsSelected);

class Container extends React.Component {
	static displayName = 'List.Container';
	static propTypes = {
		children: PropTypes.node,

		displayMode: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
		onDisplayModeChange: PropTypes.func,

		withSort: PropTypes.bool,
		sort: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
		sortBy: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
		sortDescending: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
		onSortChange: PropTypes.func,

		withSelection: PropTypes.bool,
		isSelected: PropTypes.func, // controlled/uncontrolled check on this prop
		onSelectAllChange: PropTypes.func,
		onSelectChange: PropTypes.func,

		withPagination: PropTypes.bool,
		onPageChange: PropTypes.func,
	};
	static defaultProps = {
		displayMode: 'table',
		sortDescending: false,
		sort: memoizeOne(defaultFilter),
	};

	static getDerivedStateFromProps(props, state) {
		const nextState = { collection: props.collection, nbItems: props.collection.length };

		// uncontrolled sort
		if (props.withSort && !props.onSortChange) {
			nextState.collection = props.sort(nextState.collection, state.sortBy, state.sortDescending);
		}

		// uncontrolled pagination
		if (props.withPagination && !props.onPageChange) {
			const startIndex = (state.page.currentPage - 1) * state.page.itemsPerPage;
			const stopIndex = startIndex + state.page.itemsPerPage;
			nextState.collection = nextState.collection.slice(startIndex, stopIndex);
		}

		// update select all status
		if (props.withSelection) {
			nextState.selectAllChecked = props.isSelected
				? nextState.collection.every(props.isSelected) // controlled selection
				: memoizedAllIsSelected(nextState.collection, state.selected); // uncontrolled selection
		}

		return nextState;
	}

	constructor(props) {
		super(props);
		this.isSelected = this.isSelected.bind(this);
		this.onDisplayModeChange = this.onDisplayModeChange.bind(this);
		this.onPageChange = this.onPageChange.bind(this);
		this.onSelectAllChanged = this.onSelectAllChanged.bind(this);
		this.onSelectChange = this.onSelectChange.bind(this);
		this.onSortChange = this.onSortChange.bind(this);
		this.state = {
			selected: [],
			page: {
				currentPage: 1,
				itemsPerPage: 5,
			},
		};
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

	onPageChange(event, page) {
		if (this.props.onPageChange) {
			// controlled pagination
			this.props.onPageChange(event, page);
		} else {
			// uncontrolled
			this.setState({ page });
		}
	}

	onSelectAllChanged(event) {
		if (this.props.onSelectAllChange) {
			// controlled selection
			this.props.onSelectAllChange(event);
		} else {
			// uncontrolled
			this.setState(({ selectAllChecked }) => ({
				selected: selectAllChecked ? [] : this.getCurrentValue('collection'),
			}));
		}
	}

	onSelectChange(event, item) {
		if (this.props.onSelectChange) {
			// controlled selection
			this.props.onSelectChange(event, item);
		} else if (this.isSelected(item)) {
			// uncontrolled: uncheck
			this.setState(({ selected }) => ({
				selected: selected.filter(nextItem => nextItem !== item),
			}));
		} else {
			// uncontrolled: check
			this.setState(({ selected }) => ({
				selected: selected.concat(item),
			}));
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
		if (Array.isArray(keys)) {
			return keys.reduce((accu, key) => {
				// eslint-disable-next-line no-param-reassign
				accu[key] = key in this.state ? this.state[key] : this.props[key];
				return accu;
			}, {});
		}
		return keys in this.state ? this.state[keys] : this.props[keys];
	}

	isSelected(item) {
		if (this.props.isSelected) {
			return this.props.isSelected(item);
		}
		return !!this.state.selected.find(next => next === item);
	}

	render() {
		const contextValues = {
			...this.state,
			...this.getCurrentValue(['displayMode', 'sortBy', 'sortDescending']),
			onDisplayModeChange: this.onDisplayModeChange,
		};

		if (this.props.withSelection) {
			contextValues.isSelected = this.isSelected;
			contextValues.onSelectChange = this.onSelectChange;
			contextValues.onSelectAllChange = this.onSelectAllChanged;
		}
		if (this.props.withSort) {
			contextValues.onSortChange = this.onSortChange;
		}

		if (this.props.withPagination) {
			contextValues.onPageChange = this.onPageChange;
		}

		return <ListContext.Provider value={contextValues}>{this.props.children}</ListContext.Provider>;
	}
}

export default {
	Container,
	Toolbar,
	DisplayMode,
	Pagination,
	SelectAll,
	SortBy,
	VList,
};
