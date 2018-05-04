import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';
import { Map } from 'immutable';
import { List as Component } from '@talend/react-components';
import get from 'lodash/get';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import { cmfConnect } from '@talend/react-cmf';

import { getActionsProps } from '../actionAPI';

export const DEFAULT_STATE = new Map({
	displayMode: 'table',
	selectedItems: [],
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
		multiSelectActions: PropTypes.shape({
			title: PropTypes.string,
			left: PropTypes.arrayOf(PropTypes.string),
			right: PropTypes.arrayOf(PropTypes.string),
		}),
		multiSelectionKey: PropTypes.string,
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
		this.onFilter = this.onFilter.bind(this);
		this.onToggle = this.onToggle.bind(this);
		this.onSelectDisplayMode = this.onSelectDisplayMode.bind(this);
		this.onChangePage = this.onChangePage.bind(this);
		this.onToggleMultiSelection = this.onToggleMultiSelection.bind(this);
		this.onToggleAllMultiSelection = this.onToggleAllMultiSelection.bind(this);
		this.isSelected = this.isSelected.bind(this);
	}
	onSelectSortBy(event, payload) {
		this.props.setState({
			sortOn: payload.field,
			sortAsc: !payload.isDescending,
		});
	}

	onFilter(event, payload) {
		this.props.setState({ searchQuery: payload.query });
	}

	onChangePage(startIndex, itemsPerPage) {
		this.props.setState({ startIndex, itemsPerPage });
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

	onToggleMultiSelection(event, data) {
		const state = this.props.state.toJS();
		let selectedItems = [].concat(state.selectedItems);
		if (selectedItems.find(itemKey => itemKey === data[this.props.multiSelectionKey])) {
			selectedItems = selectedItems.filter(
				itemKey => itemKey !== data[this.props.multiSelectionKey],
			);
		} else {
			selectedItems.push(data[this.props.multiSelectionKey]);
		}
		this.props.setState({
			selectedItems,
		});
	}

	onToggleAllMultiSelection() {
		const state = this.props.state.toJS();
		const items = this.props.items.toJS();
		if (state.selectedItems.length !== items.length) {
			this.props.setState({
				selectedItems: items.map(item => item[this.props.multiSelectionKey]),
			});
		} else {
			this.props.setState({
				selectedItems: [],
			});
		}
	}

	getGenericDispatcher(property) {
		return (event, data) => {
			this.props.dispatchActionCreator(property, event, data, this.context);
		};
	}

	isSelected(item) {
		const state = this.props.state.toJS();
		if (state.selectedItems.find(itemKey => itemKey === item[this.props.multiSelectionKey])) {
			return true;
		}
		return false;
	}

	render() {
		const state = this.props.state.toJS();
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
		if (!props.list.itemProps) {
			props.list.itemProps = {};
		}

		if (this.props.rowHeight) {
			props.rowHeight = this.props.rowHeight[props.displayMode];
		}
		if (props.list.titleProps && this.props.actions.title) {
			if (this.props.actions.title) {
				props.list.titleProps.onClick = this.getGenericDispatcher(this.props.actions.title);
			}
			if (this.props.actions.editSubmit) {
				props.list.titleProps.onEditSubmit = this.getGenericDispatcher(
					this.props.actions.editSubmit,
				);
			}
			if (this.props.actions.editCancel) {
				props.list.titleProps.onEditCancel = this.getGenericDispatcher(
					this.props.actions.editCancel,
				);
			}
		}

		// toolbar
		if (props.toolbar) {
			if (props.toolbar.display) {
				props.toolbar.display = {
					...props.toolbar.display,
					onChange: (event, data) => {
						this.onSelectDisplayMode(event, data);
					},
				};
			}
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

			props.toolbar.actionBar = { actions: {}, multiSelectActions: {} };

			// settings up multi selection
			if (props.multiSelectActions && props.multiSelectionKey) {
				props.list.itemProps.onToggle = this.onToggleMultiSelection;
				props.list.itemProps.onToggleAll = this.onToggleAllMultiSelection;
				props.list.itemProps.isSelected = this.isSelected;
				// selectedItems is part of the default state
				// but host app can override it so
				if (!state.selectedItems) {
					this.props.setState({
						selectedItems: [],
					});
				}
				props.toolbar.actionBar.selected = state.selectedItems.length;
			}

			const actions = this.props.actions;
			const multiSelectActions = this.props.multiSelectActions;
			if (multiSelectActions) {
				if (multiSelectActions.left) {
					props.toolbar.actionBar.multiSelectActions.left = multiSelectActions.left.map(action => ({
						actionId: action,
					}));
				}
				if (multiSelectActions.right) {
					props.toolbar.actionBar.multiSelectActions.right = multiSelectActions.right.map(
						action => ({
							actionId: action,
						}),
					);
				}
			}
			if (actions) {
				if (actions.left) {
					props.toolbar.actionBar.actions.left = actions.left.map(action => ({ actionId: action }));
				}
				if (actions.right) {
					props.toolbar.actionBar.actions.right = actions.right.map(action => ({
						actionId: action,
					}));
				}
			}

			if (props.toolbar.pagination) {
				const pagination = props.toolbar.pagination;
				Object.assign(props.toolbar.pagination, {
					...pick(state, ['totalResults', 'itemsPerPage', 'startIndex']),
				});
				if (!pagination.onChange) {
					pagination.onChange = (startIndex, itemsPerPage) => {
						this.onChangePage(startIndex, itemsPerPage);
					};
				} else if (typeof pagination.onChange === 'string') {
					const onChangeActionCreator = pagination.onChange;
					pagination.onChange = (startIndex, itemsPerPage) => {
						this.props.dispatchActionCreator(
							onChangeActionCreator,
							null,
							{ startIndex, itemsPerPage },
							this.context,
						);
					};
				}
			}
		}
		return <Component {...props} />;
	}
}

export default List;
