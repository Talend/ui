import PropTypes from 'prop-types';
import React from 'react';
import { Map } from 'immutable';
import { List as Component } from '@talend/react-components';
import get from 'lodash/get';
import omit from 'lodash/omit';
import { cmfConnect } from '@talend/react-cmf';

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
		...cmfConnect.propTypes,
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
		const props = Object.assign({}, omit(this.props, cmfConnect.INJECTED_PROPS));
		if (!props.displayMode) {
			props.displayMode = state.displayMode;
		}
		if (!props.list) {
			props.list = {};
		}
		if (!props.list.id) {
			props.list.id = 'list';
		}
		props.list.items = items;
		if (!props.list.columns) {
			props.list.columns = [];
		}
		props.list.sort = {
			field: state.sortOn,
			isDescending: !state.sortAsc,
			onChange: this.onSelectSortBy,
		};
		if (this.props.rowHeight) {
			props.rowHeight = this.props.rowHeight[props.displayMode];
		}
		if (props.list.titleProps && this.props.actions.title) {
			props.list.titleProps.onClick = (event, data) => {
				this.props.dispatchActionCreator(this.props.actions.title, event, data, this.context);
			};
		}

		// toolbar
		if (props.toolbar) {
			props.toolbar.display = {
				...props.toolbar.display,
				onChange: (e, p) => {
					this.onSelectDisplayMode(e, p);
				},
			};
			if (props.toolbar.sort) {
				props.toolbar.sort.isDescending = !state.sortAsc;
				props.toolbar.sort.field = state.sortOn;
				props.toolbar.sort.onChange = (event, data) => {
					this.onSelectSortBy(event, data);
				};
			}

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

			if (props.toolbar.pagination) {
				props.toolbar.pagination.onChange = (event, data) => {
					this.props.dispatchActionCreator(
						props.toolbar.pagination.onChange,
						event,
						data,
						this.context
					);
				};
			}
		}
		return <Component {...props} />;
	}
}

export default List;
