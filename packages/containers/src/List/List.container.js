import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';
import { Map, List as ImmutableList } from 'immutable';
import Component from '@talend/react-components/lib/List';
import VirtualizedList from '@talend/react-components/lib/VirtualizedList';
import get from 'lodash/get';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import cmf, { cmfConnect, useCMFContext } from '@talend/react-cmf';

import { getActionsProps } from '../actionAPI';
import Constants from './List.constant';

function mapStateToProps(state, ownProps) {
	if (!ownProps.columnData) {
		return {};
	}

	const exp = cmf.expression.mapStateToProps(state, ownProps.columnData, { props: ownProps });
	if (Object.keys(exp).length) {
		return {
			columnData: {
				...cmf.expression.mergeProps(ownProps.columnData),
				...exp,
			},
		};
	}

	return {};
}

const ConnectedCellTitle = cmfConnect({
	mapStateToProps,
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(VirtualizedList.cellDictionary.title.cellRenderer);
export const connectedCellDictionary = {
	title: {
		...VirtualizedList.cellDictionary.title,
		cellRenderer: props => <ConnectedCellTitle {...props} />,
	},
};

export const DEFAULT_STATE = new Map({
	displayMode: 'table',
	selectedItems: new ImmutableList(),
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
	return props.items.toJS().map(item => {
		const actionsItems = get(props, 'actions.items', []);
		let actions = [];
		if (
			Array.isArray(actionsItems) &&
			actionsItems.every(actionsItem => Array.isArray(actionsItem))
		) {
			actions = actionsItems.map(actionArray => getActionsProps(context, actionArray, item));
		} else {
			// simple array of actions
			actions = getActionsProps(context, actionsItems, item);
		}
		return {
			...item,
			actions,
			persistentActions: getActionsProps(
				context,
				get(props, 'actions.persistentItemsActions', []),
				item,
			),
		};
	});
}

function List(props) {
	const context = useCMFContext();
	const state = props.state.toJS();

	function onChangePage(startIndex, itemsPerPage) {
		props.setState({ startIndex, itemsPerPage });
	}

	function onSelectDisplayMode(event, payload) {
		props.setState({ displayMode: payload });
	}

	function onToggleMultiSelection(event, data) {
		const selectedItems = getSelectedItems();
		const dataIndex = selectedItems.indexOf(data[props.idKey]);
		if (dataIndex > -1) {
			props.setState({
				selectedItems: selectedItems.splice(dataIndex, 1),
			});
		} else {
			props.setState({
				selectedItems: selectedItems.push(data[props.idKey]),
			});
		}
	}

	function onToggleAllMultiSelection() {
		const selectedItems = getSelectedItems();
		const items = props.items;
		if (selectedItems.size !== items.size) {
			props.setState({
				selectedItems: items.map(item => item.get(props.idKey)),
			});
		} else {
			props.setState({
				selectedItems: new ImmutableList([]),
			});
		}
	}

	function getSelectedItems() {
		return props.state.get('selectedItems', new ImmutableList());
	}

	function getGenericDispatcher(property) {
		return (event, data) => {
			props.dispatchActionCreator(property, event, data, context);
		};
	}

	function isSelected(item) {
		const selectedItems = getSelectedItems();
		return selectedItems.some(itemKey => itemKey === item[props.idKey]);
	}

	const items = getItems(context, props);
	const newProps = { ...omit(props, cmfConnect.INJECTED_PROPS) };
	if (!newProps.displayMode) {
		newProps.displayMode = state.displayMode;
	}
	if (!newProps.list) {
		newProps.list = {};
	}
	if (!newProps.list.id) {
		newProps.list.id = 'list';
	}
	newProps.list.items = items;
	if (!newProps.list.columns) {
		newProps.list.columns = [];
	}
	newProps.list.sort = {
		field: state.sortOn,
		isDescending: !state.sortAsc,
		onChange: (event, data) => {
			props.dispatch({
				type: Constants.LIST_CHANGE_SORT_ORDER,
				payload: data,
				collectionId: props.collectionId,
				event,
			});
		},
	};
	if (!newProps.list.itemProps) {
		newProps.list.itemProps = {};
	}

	if (newProps.rowHeight) {
		newProps.rowHeight = newProps.rowHeight[props.displayMode];
	}
	if (newProps.list.titleProps && newProps.actions.title) {
		if (newProps.actions.title) {
			newProps.list.titleProps.onClick = getGenericDispatcher(newProps.actions.title);
		}
		if (newProps.actions.editSubmit) {
			newProps.list.titleProps.onEditSubmit = getGenericDispatcher(newProps.actions.editSubmit);
		}
		if (newProps.actions.editCancel) {
			newProps.list.titleProps.onEditCancel = getGenericDispatcher(newProps.actions.editCancel);
		}
	}

	const cellDictionary = { ...connectedCellDictionary };
	if (newProps.cellDictionary) {
		Object.keys(newProps.cellDictionary).reduce((accumulator, key) => {
			const current = newProps.cellDictionary[key];
			// eslint-disable-next-line no-param-reassign
			accumulator[key] = {
				...omit(current, ['component']),
				cellRenderer: props.getComponent(current.component),
			};
			return accumulator;
		}, cellDictionary);
	}
	newProps.list.cellDictionary = cellDictionary;

	if (newProps.headerDictionary) {
		newProps.list.headerDictionary = Object.keys(newProps.headerDictionary).reduce(
			(accumulator, key) => {
				const current = newProps.headerDictionary[key];
				// eslint-disable-next-line no-param-reassign
				accumulator[key] = {
					...omit(current, ['component']),
					headerRenderer: props.getComponent(current.component),
				};
				return accumulator;
			},
			{},
		);
	}

	// toolbar
	if (newProps.toolbar) {
		if (newProps.toolbar.display) {
			newProps.toolbar.display = {
				...newProps.toolbar.display,
				onChange: (event, data) => {
					onSelectDisplayMode(event, data);
				},
			};
		}
		if (newProps.toolbar.sort) {
			newProps.toolbar.sort.isDescending = !state.sortAsc;
			newProps.toolbar.sort.field = state.sortOn;
			newProps.toolbar.sort.onChange = (event, data) => {
				props.dispatch({
					type: Constants.LIST_CHANGE_SORT_ORDER,
					payload: data,
					collectionId: props.collectionId,
					event,
				});
			};
		}

		if (newProps.toolbar.filter) {
			newProps.toolbar.filter.onToggle = (event, data) => {
				props.dispatch({
					type: Constants.LIST_TOGGLE_FILTER,
					payload: { ...data, filterDocked: state.filterDocked, searchQuery: state.searchQuery },
					collectionId: props.collectionId,
					event,
				});
			};
			newProps.toolbar.filter.onFilter = (event, data) => {
				props.dispatch({
					type: Constants.LIST_FILTER_CHANGE,
					payload: data,
					collectionId: props.collectionId,
					event,
				});
			};
			newProps.toolbar.filter.docked = state.filterDocked;
			newProps.toolbar.filter.value = state.searchQuery;
		}

		newProps.toolbar.actionBar = { actions: {}, multiSelectActions: {} };

		// settings up multi selection
		if (newProps.multiSelectActions && props.idKey) {
			newProps.list.itemProps.onToggle = onToggleMultiSelection;
			newProps.list.itemProps.onToggleAll = onToggleAllMultiSelection;
			newProps.list.itemProps.isSelected = isSelected;
			newProps.toolbar.actionBar.selected = getSelectedItems().size;
		}

		const actions = newProps.actions;
		const multiSelectActions = newProps.multiSelectActions;
		if (multiSelectActions) {
			if (multiSelectActions.left) {
				newProps.toolbar.actionBar.multiSelectActions.left = multiSelectActions.left.map(
					action => ({
						actionId: action,
					}),
				);
			}
			if (multiSelectActions.right) {
				newProps.toolbar.actionBar.multiSelectActions.right = multiSelectActions.right.map(
					action => ({
						actionId: action,
					}),
				);
			}
		}
		if (actions) {
			if (actions.left) {
				newProps.toolbar.actionBar.actions.left = actions.left.map(action => ({
					actionId: action,
				}));
			}
			if (actions.right) {
				newProps.toolbar.actionBar.actions.right = actions.right.map(action => ({
					actionId: action,
				}));
			}
		}

		if (newProps.toolbar.pagination) {
			const pagination = newProps.toolbar.pagination;
			Object.assign(newProps.toolbar.pagination, {
				...pick(state, ['totalResults', 'itemsPerPage', 'startIndex']),
			});
			if (!pagination.onChange) {
				pagination.onChange = (startIndex, itemsPerPage) => {
					onChangePage(startIndex, itemsPerPage);
				};
			} else if (typeof pagination.onChange === 'string') {
				const onChangeActionCreator = pagination.onChange;
				pagination.onChange = (startIndex, itemsPerPage) => {
					props.dispatchActionCreator(
						onChangeActionCreator,
						null,
						{ startIndex, itemsPerPage },
						context,
					);
				};
			}
		}
	}
	return <Component {...props} />;
}

export default List;
