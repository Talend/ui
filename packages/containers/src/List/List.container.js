import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';
import Immutable from 'immutable';
import { List as Component } from '@talend/react-components';
import CellTitleRenderer, {
	cellType as cellTitleType,
} from '@talend/react-components/lib/VirtualizedList/CellTitle';
import CellTitle from '@talend/react-components/lib/VirtualizedList/CellTitle/CellTitle.component';
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

function getActionProps(action) {
	if (typeof action === 'object') {
		return action;
	}
	return { actionId: action };
}

const ConnectedCellTitle = cmfConnect({})(CellTitle);

export const connectedCellDictionary = {
	[cellTitleType]: {
		...CellTitleRenderer,
		cellRenderer: props => <ConnectedCellTitle {...props} />,
	},
};

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

export default class List extends React.Component {
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
		this.onSelectSortBy = this.onSelectSortBy.bind(this);
		this.onFilterChange = this.onFilterChange.bind(this);
		this.onFilterToggle = this.onFilterToggle.bind(this);
		this.onSelectDisplayMode = this.onSelectDisplayMode.bind(this);
		this.onPaginationChange = this.onPaginationChange.bind(this);
		// this.onChangePage = this.onChangePage.bind(this);
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

	onFilterChange(event, payload) {
		this.props.setState({ searchQuery: payload.query });
	}

	onPaginationChange(startIndex, itemsPerPage) {
		this.props.setState({ startIndex, itemsPerPage });
		if (this.props.onPaginationChange) {
			if (typeof this.props.onPaginationChange === 'string') {
				// backward compatibility
				this.getGenericDispatcher(this.props.onPaginationChange)(
					null,
					{
						startIndex,
						itemsPerPage,
					},
				);
			} else {
				this.props.onPaginationChange(startIndex, itemsPerPage);
			}
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
				selectedItems: new Immutable.List([]),
			});
		}
	}

	getSelectedItems() {
		return this.props.state.get('selectedItems', new Immutable.List());
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
		// TODO: ensure this is supported
		// props.list.items = items;
		// if (!props.list.columns) {
		// 	props.list.columns = [];
		// }
		// props.list.sort = {
		// 	field: state.sortOn,
		// 	isDescending: !state.sortAsc,
		// 	onChange: this.onSelectSortBy,
		// };
		// if (!props.list.itemProps) {
		// 	props.list.itemProps = {};
		// }

		if (this.props.rowHeight) {
			props.rowHeight = this.props.rowHeight[props.displayMode];
		}
		// Backward compatibility
		if (this.props.actions) {
			props.actions = {};
			const actions = this.props.actions;
			if (actions.left) {
				props.actions.left = actions.left.map(getActionProps)
			}
			if (actions.right) {
				props.actions.right = actions.right.map(getActionsProps)
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
		} else {
			props.cellDictionary = cellDictionary;
		}

		if (props.headerDictionary) {
			props.headerDictionary = Object.keys(props.headerDictionary).reduce(
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
		const actions = this.props.actions;
		if (props.toolbar) {
			if (props.toolbar.display) {
				props.toolbar.display = {
					...props.toolbar.display,
					onChange: (event, data) => {
						this.onSelectDisplayMode(event, data);
					},
				};
			}
			if (actions.title) {
				props.onTitleClick = this.getGenericDispatcher(actions.title);
			}
			if (actions.editSubmit) {
				props.onTitleEditSubmit = this.getGenericDispatcher(actions.editSubmit);
			}
			if (actions.editCancel) {
				props.onTitleEditCancel = this.getGenericDispatcher(actions.editCancel);
			}

			// props.toolbar.actionBar = { actions: {}, multiSelectActions: {} };

			// settings up multi selection
			if (props.multiSelectActions && props.idKey) {
				props.onToggle = this.onToggleMultiSelection;
				props.onToggleAll = this.onToggleAllMultiSelection;
				props.isSelected = this.isSelected;
				props.selectedCount = this.getSelectedItems().size;
			}

			const multiSelectActions = this.props.multiSelectActions;
			if (multiSelectActions) {
				if (multiSelectActions.left) {
					props.multiSelectActions.left = multiSelectActions.left.map(getActionProps);
				}
				if (multiSelectActions.right) {
					props.multiSelectActions.right = multiSelectActions.right.map(getActionProps);
				}
			}
			if (actions) {
				if (actions.left) {
					props.actions.left = actions.left.map(action => ({ actionId: action }));
				}
				if (actions.right) {
					props.actions.right = actions.right.map(action => ({
						actionId: action,
					}));
				}
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
