import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { cmfConnect } from '@talend/react-cmf';
import Immutable, { List } from 'immutable';

import Component from './SelectObject.component';

export const DISPLAY_NAME = 'Container(SelectObject)';
export const DEFAULT_STATE = new Immutable.Map({});

function noop() {}

/**
 * Internal
 * @return item in items found with the id
 * @param {Object} options {id, items, idAttr }
 */
export function getById(items, id, { idAttr = 'id' } = {}) {
	let found;
	items.forEach(item => {
		if (item.get(idAttr) === id) {
			found = item.toJS();
		} else if (!found && item.get('children', new List()).size > 0) {
			found = getById(item.get('children'), id, { idAttr });
		}
	});
	return found;
}

/**
 * Check if an `item` is a leaf element, by checking if it
 * has a non empty `children`
 * @param {Object} item to be checked if it has children attribute
 * @return {Boolean}
 */
function isLeafElement(item) {
	return item.get('children', new List()).size === 0;
}

/**
 * if item match the query it will be concatened into the accumulator
 * else the accumulator is returned without modification
 * @param {Object} item the item on which the matching will happen
 * @param {String} currentPosition the element position inside the parsed tree
 * @param {String} query the query element used to match
 * @param {String} nameAttr the attribute of item on which should be matched
 * @param {callback} onMatch callback to call if match happen
 * @param {List<Object>} accumulator
 */
function matchOnLeaf(item, currentPosition, query, nameAttr, onMatch, accumulator) {
	const currentElementName = item.get(nameAttr, '');
	if (currentElementName.toLowerCase().includes(query.toLowerCase())) {
		const withElementPosition = item.set('currentPosition', currentPosition);
		onMatch(item);
		return accumulator.push(withElementPosition);
	}
	return accumulator;
}

/**
 * apply query only on leaf elements, return them on a single list,
 * not taking into account the deepth of matched elements.
 * @return item in items found with the id
 * @param {Object} options {query, items, idAttr }
 */
export function filter(
	items = new List(),
	query = '',
	{ nameAttr = 'name', onMatch = noop } = {},
	currentPosition = 'root',
) {
	if (query) {
		return items.reduce((accumulator, item) => {
			if (isLeafElement(item)) {
				return matchOnLeaf(item, currentPosition, query, nameAttr, onMatch, accumulator);
			}
			const currentElementName = item.get(nameAttr, '');
			const result = filter(
				item.get('children'),
				query,
				{ nameAttr },
				`${currentPosition} > ${currentElementName}`,
			);
			return accumulator.concat(result);
		}, new List());
	}
	return items;
}

/**
 * apply query on every elements, return them on a single list,
 * @return item in items found with the id
 * @param {Object} options {query, items, idAttr }
 */
export function filterAll(
	items = new List(),
	query = '',
	{ nameAttr = 'name', onMatch = noop } = {},
	currentPosition = 'root',
) {
	const result = new List();

	if (query) {
		return items.reduce((acc, item) => {
			const name = item.get(nameAttr, '');
			const children = item.get('children', null);
			let results = acc;
			if (name.toLowerCase().includes(query.toLowerCase())) {
				onMatch(item);
				results = acc.push(item.set('currentPosition', currentPosition));
			}
			if (children) {
				results = results.concat(
					filterAll(children, query, { nameAttr }, `${currentPosition} > ${name}`),
				);
			}
			return results;
		}, result);
	}

	return result;
}

class SelectObject extends React.Component {
	static displayName = DISPLAY_NAME;

	static FILTER_MODE = {
		ALL: 'ALL',
		LEAF: 'LEAF',
	};

	static propTypes = {
		...cmfConnect.propTypes,
		sourceData: PropTypes.array,
		selectedId: PropTypes.string,
		tree: PropTypes.object,
		idAttr: PropTypes.string,
		nameAttr: PropTypes.string,
		breadCrumbsRootLabel: PropTypes.string,
		filterMode: PropTypes.oneOf([SelectObject.FILTER_MODE.ALL, SelectObject.FILTER_MODE.LEAF]),
	};

	static defaultProps = {
		sourceData: new Immutable.List(),
		idAttr: 'id',
		nameAttr: 'name',
		breadCrumbsRootLabel: 'root',
	};

	constructor(props) {
		super(props);
		this.state = {};
		this.filter = filter;
		this.filterAll = filterAll;
		this.getById = getById;
		this.onTreeClick = this.onTreeClick.bind(this);
		this.onResultsClick = this.onResultsClick.bind(this);
	}

	onTreeClick(data) {
		this.props.setState({ selectedId: data[this.props.idAttr] });
	}

	onResultsClick(event, item) {
		this.props.setState({ selectedId: item.get(this.props.idAttr) });
	}

	render() {
		const state = this.props.state || DEFAULT_STATE;
		const props = omit(this.props, cmfConnect.INJECTED_PROPS);
		const filterMethod =
			this.props.filterMode === SelectObject.FILTER_MODE.ALL ? this.filterAll : this.filter;
		const matches = [];
		let selectedId = state.get('selectedId') || props.selectedId;
		function addMatch(item) {
			matches.push(item);
		}

		if (props.query) {
			props.filteredData = filterMethod(
				props.sourceData,
				props.query,
				{
					...props,
					onMatch: addMatch,
				},
				props.breadCrumbsRootLabel,
			);
			delete props.tree;
			if (!selectedId && matches.length === 1) {
				selectedId = matches[0].get('id');
			}
			props.results = {
				onClick: this.onResultsClick,
				idAttr: this.props.idAttr,
				nameAttr: this.props.nameAttr,
				selectedId,
			};
		}

		if (selectedId) {
			props.selected = this.getById(props.sourceData, selectedId, props);
		}

		if (props.tree) {
			props.tree.selectedId = selectedId;
			props.tree.onSelect = this.onTreeClick;
		}

		return <Component {...props} />;
	}
}

export default SelectObject;
