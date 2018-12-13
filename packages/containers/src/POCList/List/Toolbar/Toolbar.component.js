import PropTypes from 'prop-types';
import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import { translate } from 'react-i18next';
import I18N_DOMAIN_COMPONENTS from '@talend/react-components/lib/constants';
import { ActionBar, FilterBar } from '@talend/react-containers';
import '@talend/react-components/lib/translate';
// import SelectAll from './SelectAll';
import SelectDisplayMode from './SelectDisplayMode';
import SelectSortBy from './SelectSortBy';
// import Pagination from './Pagination';
import Label from './Label';

import theme from './Toolbar.scss';
// import { throws } from 'assert';

const ToolbarContext = React.createContext();

const Consumer = props => {
	return (
		<ToolbarContext.Consumer>
			{context => {
				if (!context) {
					throw Error('You are using the components out of provider scope');
				}
				return props.children(context);
			}}
		</ToolbarContext.Consumer>
	);
};

function adaptActionsIds(actions, parentId) {
	return (
		actions &&
		actions.map(action => {
			if (action.id) {
				return {
					...action,
					id: `${parentId}-actions-${action.id}`,
				};
			}
			return action;
		})
	);
}

function adaptLeftAndRightActions(actions, parentId) {
	return (
		actions && {
			left: adaptActionsIds(actions.left, parentId),
			right: adaptActionsIds(actions.right, parentId),
		}
	);
}

/**
 * @param {string} id the id of Toolbar
 * @param {object} actionBar the ActionBar properties
 * @param {object} selectAllCheckbox the select all checkbox props
 * @param {object} display the SelectDisplayMode properties
 * @param {object} sort the SelectSortBy properties
 * @param {object} pagination the Pagination properties
 * @param {object} filter the Filter properties
 * @param {function} t the translate function
 * @example
 <Toolbar id="my-toolbar"></Toolbar>
 */
class Toolbar extends React.Component {
	defaultProps = {
		handleSort: () => {},
	};

	handleSort = () => {
		// if (props.toolbar.sort) {
		// 	props.toolbar.sort.isDescending = !state.sortAsc;
		// 	props.toolbar.sort.field = state.sortOn;
		// 	props.toolbar.sort.onChange = (event, data) => {
		// 		this.props.dispatch({
		// 			type: Constants.LIST_CHANGE_SORT_ORDER,
		// 			payload: data,
		// 			collectionId: props.collectionId,
		// 			event,
		// 		});
		// 	};
		// }
		this.setState(prevState => {
			return { ...prevState };
		}, this.props.handleSort());
	};

	// 	props.toolbar.filter.onToggle = (event, data) => {
	// 		this.props.dispatch({
	// 			type: Constants.LIST_TOGGLE_FILTER,
	// 			payload: Object.assign({}, data, {
	// 				filterDocked: state.filterDocked,
	// 				searchQuery: state.searchQuery,
	// 			}),
	// 			collectionId: props.collectionId,
	// 			event,
	// 		});
	// 	};
	// 	props.toolbar.filter.onFilter = (event, data) => {
	// 		this.props.dispatch({
	// 			type: Constants.LIST_FILTER_CHANGE,
	// 			payload: data,
	// 			collectionId: props.collectionId,
	// 			event,
	// 		});
	// 	};
	// 	props.toolbar.filter.docked = state.filterDocked;
	// 	props.toolbar.filter.value = state.searchQuery;
	// }

	/*
	onToggleMultiSelection = (event, data) => {
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
	*/

	/*
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
	*/

	state = {
		sortOn: 'name',
		sortAsc: true,
		onChange: this.handleSort,
	};

	handleInputFilterbar = event => {
		/*
		this.setState(event, callback) ||
		this.props.setState(event, callback)
		*/
		this.props.handleInputFilterbar(event);
	};

	handleToggleFilterbar = event => {
		/*
		this.setState(event, callback) ||
		this.props.setState(event, callback)
		*/
		this.props.handleToggleFilterBar(event);
	};

	render() {
		const {
			id,
			actionBar,
			// selectAllCheckbox,
			displayMode,
			// sort,
			// pagination,
			filter,
			t,
			getComponent,
			// components,
		} = this.props;
		// const Renderer = Inject.getAll(getComponent, {
		// 	ActionBar,
		// 	FilterBar,
		// });

		// settings up multi selection
		/*
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
				props.toolbar.actionBar.multiSelectActions.left = multiSelectActions.left.map(
					action => ({
						actionId: action,
					}),
				);
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
				props.toolbar.actionBar.actions.left = actions.left.map(action => ({
					actionId: action,
				}));
			}
			if (actions.right) {
				props.toolbar.actionBar.actions.right = actions.right.map(action => ({
					actionId: action,
				}));
			}
		}
		*/

		// const injected = Inject.all(getComponent, components);
		// let actionBarProps = actionBar;
		// if (id && actionBar) {
		// 	const { actions, multiSelectActions } = actionBar;
		// 	actionBarProps = {
		// 		...actionBar,
		// 		actions: adaptLeftAndRightActions(actions, id),
		// 		multiSelectActions: adaptLeftAndRightActions(multiSelectActions, id),
		// 	};
		// }
		// const displayModeId = id && `${id}-display-mode`;
		// const hasToolbarItem = selectAllCheckbox || displayMode || sort || pagination || filter;
		// const hasToolbarItem = selectAllCheckbox || displayMode || filter;
		// const hasToolbarItem = true;
		const contextProps = {
			handleInput: this.props.handleInputFilter,
			handleToggle: this.props.handleToggleFilter,
		};
		return (
			<Navbar componentClass="div" className={theme['tc-list-toolbar']} role="toolbar" fluid>
				<ToolbarContext.Provider value={contextProps}>
					{this.props.children}
				</ToolbarContext.Provider>
			</Navbar>
		);
	}
}

Toolbar.Sort = props => {
	const sortProps = {
		...props,
		onChange: props.onChange,
		isDescending: !props.sortAsc,
		field: props.sortOn,
	};
	return (
		<React.Fragment>
			<Label text="Sort by:" htmlFor={props.id && `${props.id}-sort-by`} />
			<SelectSortBy id={props.id && `${props.id}-sort`} {...sortProps} />
		</React.Fragment>
	);
};

Toolbar.ActionBar = ({ actions, multiSelectActions, id }) => {
	return <ActionBar actions={adaptLeftAndRightActions(actions, id)} />;
};

Toolbar.DisplayMode = props => {
	return (
		<React.Fragment>
			<Label text={'Display:'} htmlFor={props.displayModeId} />
			<SelectDisplayMode id={props.displayModeId} mode={props.displayMode} />
		</React.Fragment>
	);
};

Toolbar.FilterBar = ({ placeholder }) => {
	return (
		<Consumer>
			{({ collectionId, handleInput, handleToggle }) => (
				<FilterBar
					className="navbar-right"
					id={collectionId && `${collectionId}-filter`}
					navbar
					onFilter={handleInput}
					onToggle={handleToggle}
					placeholder={placeholder}
				/>
			)}
		</Consumer>
	);
};

export default translate(I18N_DOMAIN_COMPONENTS)(Toolbar);
