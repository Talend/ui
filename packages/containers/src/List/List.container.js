import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';
import Immutable from 'immutable';
import { List as Component } from '@talend/react-components';
import get from 'lodash/get';
import omit from 'lodash/omit';
import { cmfConnect } from '@talend/react-cmf';

import { getActionsProps } from '../actionAPI';

export const DEFAULT_STATE = new Immutable.Map({
	displayMode: 'table',
	selectedItems: new Immutable.List(),
	searchQuery: '',
	itemsPerPage: 10,
	startIndex: 1,
	totalResults: 0,
	sortOn: 'name',
	sortAsc: true,
	filterDocked: true,
});

/**
 * merge props.items with actions
 * @param  {Object} context [description]
 * @param  {Object} props   [description]
 * @return {Array}          [description]
 */
export function getItems(context, props) {
	return props.items.toJS().map(item =>
		Object.assign({}, item, {
			actions: getActionsProps(context, get(props, 'actions.items', []), item),
		}),
	);
}

class List extends React.Component {
	static displayName = 'Container(List)';
	static propTypes = {
		actions: PropTypes.shape({
			title: PropTypes.string,
			left: PropTypes.arrayOf(PropTypes.string),
			right: PropTypes.arrayOf(PropTypes.string),
		}),
		list: PropTypes.shape({
			columns: PropTypes.array,
			titleProps: PropTypes.object,
		}),
		toolbar: PropTypes.shape({
			sort: PropTypes.object,
			filter: PropTypes.object,
			pagination: PropTypes.shape({
				onChange: PropTypes.func,
			}),
		}),
		displayMode: PropTypes.string,
		items: ImmutablePropTypes.list.isRequired,
		...cmfConnect.propTypes,
	};

	static defaultProps = {
		state: DEFAULT_STATE,
	};

	static contextTypes = {
		store: PropTypes.object,
		registry: PropTypes.object,
		router: PropTypes.object,
	};

	constructor(props) {
		super(props);
		this.onSelectSortBy = this.onSelectSortBy.bind(this);
		this.onFilterChange = this.onFilterChange.bind(this);
		this.onFilterToggle = this.onFilterToggle.bind(this);
		this.onSelectDisplayMode = this.onSelectDisplayMode.bind(this);
		this.onPaginationChange = this.onPaginationChange.bind(this);
	}
	onSelectSortBy(event, payload) {
		this.props.setState({
			sortOn: payload.field,
			sortAsc: !payload.isDescending,
		});
	}

	onFilterChange(event, payload) {
		this.props.setState({ searchQuery: payload.query });
	}

	onPaginationChange(startIndex, itemsPerPage) {
		this.props.setState({ startIndex, itemsPerPage });
		if (this.props.onPaginationChange) {
			this.props.onPaginationChange(startIndex, itemsPerPage);
		}
	}

	onFilterToggle() {
		// clearing filter when toggle
		this.props.setState({
			filterDocked: !this.props.state.get('filterDocked'),
			searchQuery: '',
		});
	}

	onSelectDisplayMode(event, payload) {
		this.props.setState({ displayMode: payload });
	}

	getGenericDispatcher(property) {
		return (event, data) => {
			this.props.dispatchActionCreator(property, event, data, this.context);
		};
	}

	isSelected(item) {
		return this.props.state.get('selectedItems').some(itemKey => itemKey === item.get(this.props.idKey));
	}

	render() {
		const state = this.props.state.toJS();
		const props = Object.assign({}, omit(this.props, cmfConnect.INJECTED_PROPS));
		if (!props.displayMode) {
			props.displayMode = state.displayMode;
		}
		if (!props.id) {
			props.id = 'list';
		}
		props.items = getItems(this.context, this.props);
		if (!props.columns) {
			props.columns = [];
		}
		if (this.props.rowHeight) {
			props.rowHeight = this.props.rowHeight[props.displayMode];
		}
		// Backward compatibility
		if (this.props.actions) {
			if (this.props.actions.title) {
				props.onTitleClick = this.getGenericDispatcher(this.props.actions.title);
			}
			if (this.props.actions.editSubmit) {
				props.onTitleEditSubmit = this.getGenericDispatcher(this.props.actions.editSubmit);
			}
			if (this.props.actions.editCancel) {
				props.onTitleEditCancel = this.getGenericDispatcher(this.props.actions.editCancel);
			}
		}

		if (props.toolbar) {
			props.sortOn = state.sortOn;
			props.sortIsDescending = !state.sortAsc;
			props.onSortChange = this.onSelectSortBy;
			props.onDisplayChange = this.onSelectDisplayMode;
			props.onSortChange = this.onSelectSortBy;
			props.sortOn = state.sortOn;
			props.sortIsDescending = !state.sortAsc;
			props.onFilterToggle = this.onFilterToggle;
			props.onFilterChange = this.onFilterChange;
			props.filterDocked = state.filterDocked;
			props.filterValue = state.searchQuery;
			// pagination
			if (props.pagination) {
				props.totalResults = state.totalResults;
				props.itemsPerPage = state.itemsPerPage;
				props.startIndex = state.startIndex;
				props.onPaginationChange = this.onPaginationChange;
			}
		}

		return <Component {...props} />;
	}
}

export default List;
