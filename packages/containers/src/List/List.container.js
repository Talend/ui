import React, { PropTypes } from 'react';
import { api } from 'react-cmf';
import { Map } from 'immutable';
import { List as Component } from 'react-talend-components';

import { statePropTypes, stateWillMount } from '../state';
import { getActionsProps } from '../actionAPI';

export const DEFAULT_STATE = new Map({
	displayMode: 'table',
	searchQuery: '',
	limit: 0,
	offset: 0,
	sortOn: 'name',
	sortAsc: true,
});


/**
 * merge props.items with actions
 * @param  {Object} context [description]
 * @param  {Object} props   [description]
 * @return {Array}          [description]
 */
export function getItems(context, props) {
	return props.items.map(
		item => Object.assign({}, item, {
			actions: getActionsProps(
				context, props.actions.items, item,
			),
		}),
	);
}

class List extends React.Component {
	static displayName = 'Container(List)';
	static propTypes = {
		actions: PropTypes.object,
		list: PropTypes.shape({
			columns: PropTypes.array,
			titleProps: PropTypes.object,
		}),
		toolbar: PropTypes.shape({
			sort: PropTypes.object,
			filter: PropTypes.object,
		}),
		items: PropTypes.arrayOf(PropTypes.object).isRequired,
		...statePropTypes,
	};

	static contextTypes = {
		store: PropTypes.object,
		registry: PropTypes.object,
	};

	constructor(props) {
		super(props);
		this.onSelectSortBy = this.onSelectSortBy.bind(this);
		this.onFilter = this.onFilter.bind(this);
		this.onSelectDisplayMode = this.onSelectDisplayMode.bind(this);
	}

	componentWillMount() {
		stateWillMount(this.props);
	}

	onSelectSortBy(event, payload) {
		this.props.updateState({
			sortOn: payload.field,
			sortAsc: !payload.isDescending,
		});
	}

	onFilter(event, payload) {
		this.props.updateState({ searchQuery: event });
	}

	onSelectDisplayMode(event, payload) {
		this.props.updateState({ displayMode: payload });
	}

	render() {
		const state = (this.props.state || DEFAULT_STATE).toJS();

		// list
		const items = getItems(this.context, this.props);
		const titleProps = this.props.list.titleProps;
		if (titleProps) {
			titleProps.onClick = (e, p) => {
				this.props.dispatch(
					api.action.getActionCreatorFunction(
						this.context,
						this.props.actions.title,
					)(p.id),
				);
			};
		}

		// toolbar
		const sort = this.props.toolbar.sort;
		if (sort) {
			sort.isDescending = !state.sortAsc;
			sort.field = state.sortOn;
			sort.onChange = (e, p) => {
				this.onSelectSortBy(e, p);
			};
		}

		const filter = this.props.toolbar.filter;
		if (filter) {
			filter.onFilter = (e, p) => {
				this.onFilter(e, p);
			};
		}

		const actionBar = { actions: {} };
		const actions = this.props.actions;
		if (actions) {
			if (actions.left) {
				actionBar.actions.left = getActionsProps(
					this.context,
					actions.left,
				);
			}
			if (actions.right) {
				actionBar.actions.right = getActionsProps(
					this.context,
					actions.right,
				);
			}
		}

		const props = {
			displayMode: state.displayMode,
			list: {
				items,
				columns: this.props.list.columns,
				titleProps,
			},
			toolbar: {
				sort,
				filter,
				display: {
					onChange: (e, p) => {
						this.onSelectDisplayMode(e, p);
					},
				},
				actionBar,
			},
		};
		return (<Component {...props} />);
	}
}

export default List;
