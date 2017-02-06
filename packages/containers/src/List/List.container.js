import React, { PropTypes } from 'react';
import { api } from 'react-cmf';
import { Map } from 'immutable';
import { List as Component } from 'react-talend-components';
import get from 'lodash/get';

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
				context, get(props, 'actions.items', []), item,
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
		router: PropTypes.object,
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
		const items = getItems(this.context, this.props);
		const props = {
			displayMode: this.props.displayMode || state.displayMode,
			list: {
				items,
				columns: get(this.props, 'list.columns', []),
			},
		};
		props.list.titleProps = get(this.props, 'list.titleProps');

		if (props.list.titleProps) {
			props.list.titleProps.onClick = (e, p) => {
				this.props.dispatch(
					api.action.getActionCreatorFunction(
						this.context,
						this.props.actions.title,
					)(e, p, this.context),
				);
			};
		}

		// toolbar
		if (this.props.toolbar) {
			props.toolbar = {
				display: {
					onChange: (e, p) => {
						this.onSelectDisplayMode(e, p);
					},
				},
			};
			props.toolbar.sort = this.props.toolbar.sort;

			if (props.toolbar.sort) {
				props.toolbar.sort.isDescending = !state.sortAsc;
				props.toolbar.sort.field = state.sortOn;
				props.toolbar.sort.onChange = (e, p) => {
					this.onSelectSortBy(e, p);
				};
			}

			props.toolbar.filter = this.props.toolbar.filter;

			if (props.toolbar.filter) {
				props.toolbar.filter.onFilter = (e, p) => {
					this.onFilter(e, p);
				};
			}

			props.toolbar.actionBar = { actions: {} };
			const actions = this.props.actions;

			if (actions) {
				if (actions.left) {
					props.toolbar.actionBar.actions.left = getActionsProps(
						this.context,
						actions.left,
					);
				}
				if (actions.right) {
					props.toolbar.actionBar.actions.right = getActionsProps(
						this.context,
						actions.right,
					);
				}
			}
		}

		return (<Component {...props} />);
	}
}

export default List;
