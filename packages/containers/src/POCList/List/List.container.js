import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';
import { Map, List as ImmutableList } from 'immutable';
import CellTitleRenderer, {
	cellType as cellTitleType,
} from '@talend/react-components/lib/VirtualizedList/CellTitle';
import CellTitle from '@talend/react-components/lib/VirtualizedList/CellTitle/CellTitle.component';
import omit from 'lodash/omit';
import classNames from 'classnames';
import { cmfConnect } from '@talend/react-cmf';

import Toolbar from './Toolbar';
import ListToVirtualizedList from './ListToVirtualizedList';
import theme from './List.scss';

const ListContext = React.createContext();

const ConnectedCellTitle = cmfConnect({})(CellTitle);
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

class List extends React.Component {
	static displayName = 'List';
	static propTypes = {
		// actions: PropTypes.shape({
		// 	title: PropTypes.string,
		// 	left: PropTypes.arrayOf(PropTypes.string),
		// 	right: PropTypes.arrayOf(PropTypes.string),
		// }),
		// multiSelectActions: PropTypes.shape({
		// 	title: PropTypes.string,
		// 	left: PropTypes.arrayOf(PropTypes.string),
		// 	right: PropTypes.arrayOf(PropTypes.string),
		// }),
		// idKey: PropTypes.string,
		// list: PropTypes.shape({
		// 	columns: PropTypes.array,
		// 	titleProps: PropTypes.object,
		// }),
		// toolbar: PropTypes.shape({
		// 	sort: PropTypes.object,
		// 	filter: PropTypes.object,
		// 	pagination: PropTypes.shape({
		// 		onChange: PropTypes.func,
		// 	}),
		// }),
		// cellDictionary: PropTypes.object,
		// displayMode: PropTypes.string,
		// items: ImmutablePropTypes.list.isRequired,
	};

	static defaultProps = {
		state: DEFAULT_STATE,
	};

	static contextTypes = {
		store: PropTypes.object,
		registry: PropTypes.object,
		router: PropTypes.object,
	};

	onChangePage = (startIndex, itemsPerPage) => {
		this.props.setState({ startIndex, itemsPerPage });
	};

	onSelectDisplayMode = (event, payload) => {
		this.props.setState({ displayMode: payload });
	};

	getSelectedItems() {
		return this.props.state.get('selectedItems', new ImmutableList());
	}

	getGenericDispatcher(property) {
		return (event, data) => {
			this.props.dispatchActionCreator(property, event, data, this.context);
		};
	}

	isSelected = item => {
		const selectedItems = this.getSelectedItems();
		return selectedItems.some(itemKey => itemKey === item[this.props.idKey]);
	};

	render() {
		const state = this.props.state.toJS();
		const props = Object.assign({}, omit(this.props, cmfConnect.INJECTED_PROPS));
		if (!props.displayMode) {
			props.displayMode = state.displayMode;
		}
		if (this.props.rowHeight) {
			props.rowHeight = this.props.rowHeight[props.displayMode];
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
		const classnames = classNames('tc-list', theme.list);
		const contextValues = {
			collectionId: props.collectionId,
			displayMode: props.displayMode,
			rowHeight: props.rowHeight,
			defaultHeight: props.defaultHeight,
			rowRenderers: props.rowRenderers,
			cellDictionary,
		};
		return (
			<div className={classnames}>
				<ListContext.Provider value={contextValues}>{this.props.children}</ListContext.Provider>
			</div>
		);
	}
}

List.Toolbar = props => {
	return <Toolbar {...props} />;
};

List.Toolbar.Sort = Toolbar.Sort;

List.Toolbar.ActionBar = Toolbar.ActionBar;

List.Toolbar.FilterBar = Toolbar.FilterBar;
List.Toolbar.FilterBar.displayName = 'Toolbar.FilterBar';

List.Toolbar.DisplayMode = Toolbar.DisplayMode;

List.VirtualizedList = props => {
	return (
		<ListContext.Consumer>
			{({ cellDictionary }) => <ListToVirtualizedList {...props} cellDictionary={cellDictionary} />}
		</ListContext.Consumer>
	);
};

export default List;
