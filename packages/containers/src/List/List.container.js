import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';
import { Map, List as ImmutableList } from 'immutable';
import Component from '@talend/react-components/lib/List';
import CellTitleRenderer, {
	cellType as cellTitleType,
} from '@talend/react-components/lib/VirtualizedList/CellTitle';
import CellTitle from '@talend/react-components/lib/VirtualizedList/CellTitle/CellTitle.component';
import get from 'lodash/get';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import cmf, { cmfConnect } from '@talend/react-cmf';

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
})(CellTitle);
export const connectedCellDictionary = {
	[cellTitleType]: {
		...CellTitleRenderer,
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
	return props.items.toJS().map(item =>
		Object.assign({}, item, {
			actions: getActionsProps(context, get(props, 'actions.items', []), item),
			persistentActions: getActionsProps(
				context,
				get(props, 'actions.persistentItemsActions', []),
				item,
			),
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
		idKey: PropTypes.string,
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
		cellDictionary: PropTypes.object,
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
		this.onSelectDisplayMode = this.onSelectDisplayMode.bind(this);
		this.onChangePage = this.onChangePage.bind(this);
		this.onToggleMultiSelection = this.onToggleMultiSelection.bind(this);
		this.onToggleAllMultiSelection = this.onToggleAllMultiSelection.bind(this);
		this.isSelected = this.isSelected.bind(this);
	}

	onChangePage(startIndex, itemsPerPage) {
		this.props.setState({ startIndex, itemsPerPage });
	}

	onSelectDisplayMode(event, payload) {
		this.props.setState({ displayMode: payload });
	}

	onToggleMultiSelection(event, data) {
		const selectedItems = this.getSelectedItems();
		const dataIndex = selectedItems.indexOf(data[this.props.idKey]);
		if (dataIndex > -1) {
			this.props.setState({
				selectedItems: selectedItems.splice(dataIndex, 1),
			});
		} else {
			this.props.setState({
				selectedItems: selectedItems.push(data[this.props.idKey]),
			});
		}
	}

	onToggleAllMultiSelection() {
		const selectedItems = this.getSelectedItems();
		const items = this.props.items;
		if (selectedItems.size !== items.size) {
			this.props.setState({
				selectedItems: items.map(item => item.get(this.props.idKey)),
			});
		} else {
			this.props.setState({
				selectedItems: new ImmutableList([]),
			});
		}
	}

	getSelectedItems() {
		return this.props.state.get('selectedItems', new ImmutableList());
	}

	getGenericDispatcher(property) {
		return (event, data) => {
			this.props.dispatchActionCreator(property, event, data, this.context);
		};
	}

	isSelected(item) {
		const selectedItems = this.getSelectedItems();
		return selectedItems.some(itemKey => itemKey === item[this.props.idKey]);
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
			onChange: (event, data) => {
				this.props.dispatch({
					type: Constants.LIST_CHANGE_SORT_ORDER,
					payload: data,
					collectionId: props.collectionId,
					event,
				});
			},
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

		const cellDictionary = { ...connectedCellDictionary };
		if (props.cellDictionary) {
			Object.keys(props.cellDictionary).reduce((accumulator, key) => {
				const current = props.cellDictionary[key];
				// eslint-disable-next-line no-param-reassign
				accumulator[key] = {
					...omit(current, ['component']),
					cellRenderer: props.getComponent(current.component),
				};
				return accumulator;
			}, cellDictionary);
		}
		props.list.cellDictionary = cellDictionary;

		if (props.headerDictionary) {
			props.list.headerDictionary = Object.keys(props.headerDictionary).reduce(
				(accumulator, key) => {
					const current = props.headerDictionary[key];
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
					this.props.dispatch({
						type: Constants.LIST_CHANGE_SORT_ORDER,
						payload: data,
						collectionId: props.collectionId,
						event,
					});
				};
			}

			if (props.toolbar.filter) {
				props.toolbar.filter.onToggle = (event, data) => {
					this.props.dispatch({
						type: Constants.LIST_TOGGLE_FILTER,
						payload: Object.assign({}, data, {
							filterDocked: state.filterDocked,
							searchQuery: state.searchQuery,
						}),
						collectionId: props.collectionId,
						event,
					});
				};
				props.toolbar.filter.onFilter = (event, data) => {
					this.props.dispatch({
						type: Constants.LIST_FILTER_CHANGE,
						payload: data,
						collectionId: props.collectionId,
						event,
					});
				};
				props.toolbar.filter.docked = state.filterDocked;
				props.toolbar.filter.value = state.searchQuery;
			}

			props.toolbar.actionBar = { actions: {}, multiSelectActions: {} };

			// settings up multi selection
			if (props.multiSelectActions && props.idKey) {
				props.list.itemProps.onToggle = this.onToggleMultiSelection;
				props.list.itemProps.onToggleAll = this.onToggleAllMultiSelection;
				props.list.itemProps.isSelected = this.isSelected;
				props.toolbar.actionBar.selected = this.getSelectedItems().size;
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
