import PropTypes from 'prop-types';
import React from 'react';
import { Map } from 'immutable';
import { List as Component } from '@talend/react-components';
import get from 'lodash/get';
import { componentState } from '@talend/react-cmf';

import { getActionsProps } from '../actionAPI';

export const DEFAULT_STATE = new Map({
	displayMode: 'table',
	searchQuery: '',
	limit: 0,
	offset: 0,
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
	return props.items.map(item =>
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
				onChange: PropTypes.string,
			}),
		}),
		displayMode: PropTypes.string,
		items: PropTypes.arrayOf(PropTypes.object).isRequired,
		...componentState.propTypes,
	};

	static contextTypes = {
		store: PropTypes.object,
		registry: PropTypes.object,
		router: PropTypes.object,
	};

	constructor(props) {
		super(props);
		this.onSelectSortBy = this.onSelectSortBy.bind(this);
		this.onFilter = this.onFilter.bind(this);
		this.onToggle = this.onToggle.bind(this);
		this.onSelectDisplayMode = this.onSelectDisplayMode.bind(this);
	}

	onSelectSortBy(event, payload) {
		this.props.setState({
			sortOn: payload.field,
			sortAsc: !payload.isDescending,
		});
	}

	onFilter(event, payload) {
		this.props.setState({ searchQuery: payload });
	}

	onToggle() {
		// clearing filter when toggle
		this.props.setState({
			filterDocked: !this.props.state.get('filterDocked'),
			searchQuery: '',
		});
	}

	onSelectDisplayMode(event, payload) {
		this.props.setState({ displayMode: payload });
	}

	render() {
		const state = (this.props.state || DEFAULT_STATE).toJS();
		const items = getItems(this.context, this.props);
		const props = {
			displayMode: this.props.displayMode || state.displayMode,
			list: {
				id: get(this.props, 'list.id', 'list'),
				items,
				columns: get(this.props, 'list.columns', []),
				sort: {
					field: state.sortOn,
					isDescending: !state.sortAsc,
					onChange: this.onSelectSortBy,
				},
			},
			virtualized: this.props.virtualized,
			renderers: this.props.renderers,
		};
		if (this.props.rowHeight) {
			switch (props.displayMode) {
			case 'table':
				props.rowHeight = this.props.rowHeight.table;
				break;
			case 'large':
				props.rowHeight = this.props.rowHeight.large;
				break;
			case 'tile':
				props.rowHeight = this.props.rowHeight.tile;
				break;
			}
		}
		props.list.titleProps = get(this.props, 'list.titleProps');

		if (props.list.titleProps && this.props.actions.title) {
			props.list.titleProps.onClick = (event, data) => {
				this.props.dispatchActionCreator(this.props.actions.title, event, data, this.context);
			};
		}

		// toolbar
		if (this.props.toolbar) {
			props.toolbar = {
				display: {
					...this.props.toolbar.display,
					onChange: (e, p) => {
						this.onSelectDisplayMode(e, p);
					},
				},
			};
			props.toolbar.sort = this.props.toolbar.sort;
			if (props.toolbar.sort) {
				props.toolbar.sort.isDescending = !state.sortAsc;
				props.toolbar.sort.field = state.sortOn;
				props.toolbar.sort.onChange = (event, data) => {
					this.onSelectSortBy(event, data);
				};
			}

			props.toolbar.filter = this.props.toolbar.filter;
			if (props.toolbar.filter) {
				props.toolbar.filter.onToggle = (event, data) => {
					this.onToggle(event, data);
				};
				props.toolbar.filter.onFilter = (event, data) => {
					this.onFilter(event, data);
				};
				props.toolbar.filter.docked = state.filterDocked;
				props.toolbar.filter.value = state.searchQuery;
			}

			props.toolbar.actionBar = { actions: {} };
			const actions = this.props.actions;
			if (actions) {
				if (actions.left) {
					props.toolbar.actionBar.actions.left = actions.left.map(action => ({ name: action }));
				}
				if (actions.right) {
					props.toolbar.actionBar.actions.right = actions.right.map(action => ({ name: action }));
				}
			}

			const pagination = this.props.toolbar.pagination;
			if (pagination) {
				props.toolbar.pagination = {
					...pagination,
					onChange: (event, data) => {
						this.props.dispatchActionCreator(pagination.onChange, event, data, this.context);
					},
				};
			}
		}

		return <Component {...props} />;
	}
}

export default List;
