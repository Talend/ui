import { Component as RComponent } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { cmfConnect } from '@talend/react-cmf';

import Component from './SelectObject.component';

export const DISPLAY_NAME = 'Container(SelectObject)';
export const DEFAULT_STATE = {};

function noop() {}

/**
 * Internal
 * @return item in items found with the id
 * @param {Object} options {id, items, idAttr }
 */
export function getById(items, id, { idAttr = 'id' } = {}) {
	let found;
	(items || []).forEach(item => {
		if (item[idAttr] === id) {
			found = item;
		} else if (!found && (item.children ?? []).length > 0) {
			found = getById(item.children, id, { idAttr });
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
	return (item.children ?? []).length === 0;
}

/**
 * if item match the query it will be concatened into the accumulator
 * else the accumulator is returned without modification
 * @param {Object} item the item on which the matching will happen
 * @param {String} currentPosition the element position inside the parsed tree
 * @param {String} query the query element used to match
 * @param {String} nameAttr the attribute of item on which should be matched
 * @param {callback} onMatch callback to call if match happen
 * @param {Array<Object>} accumulator
 */
function matchOnLeaf(item, currentPosition, query, nameAttr, onMatch, accumulator) {
	const currentElementName = item[nameAttr] ?? '';
	if (currentElementName.toLowerCase().includes(query.toLowerCase())) {
		const withElementPosition = { ...item, currentPosition };
		onMatch(item);
		return [...accumulator, withElementPosition];
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
	items = [],
	query = '',
	{ nameAttr = 'name', onMatch = noop } = {},
	currentPosition = 'root',
) {
	if (query) {
		return items.reduce((accumulator, item) => {
			if (isLeafElement(item)) {
				return matchOnLeaf(item, currentPosition, query, nameAttr, onMatch, accumulator);
			}
			const currentElementName = item[nameAttr] ?? '';
			const result = filter(
				item.children,
				query,
				{ nameAttr },
				`${currentPosition} > ${currentElementName}`,
			);
			return [...accumulator, ...result];
		}, []);
	}
	return items;
}

/**
 * apply query on every elements, return them on a single list,
 * @return item in items found with the id
 * @param {Object} options {query, items, idAttr }
 */
export function filterAll(
	items = [],
	query = '',
	{ nameAttr = 'name', onMatch = noop } = {},
	currentPosition = 'root',
) {
	if (query) {
		return items.reduce((acc, item) => {
			const name = item[nameAttr] ?? '';
			const children = item.children ?? null;
			let results = acc;
			if (name.toLowerCase().includes(query.toLowerCase())) {
				onMatch(item);
				results = [...acc, { ...item, currentPosition }];
			}
			if (children) {
				results = [
					...results,
					...filterAll(children, query, { nameAttr }, `${currentPosition} > ${name}`),
				];
			}
			return results;
		}, []);
	}

	return [];
}

class SelectObject extends RComponent {
	static displayName = DISPLAY_NAME;

	static FILTER_MODE = {
		ALL: 'ALL',
		LEAF: 'LEAF',
	};

	static propTypes = {
		...cmfConnect.propTypes,
		// sourceData: PropTypes.array,
		selectedId: PropTypes.string,
		tree: PropTypes.object,
		idAttr: PropTypes.string,
		nameAttr: PropTypes.string,
		breadCrumbsRootLabel: PropTypes.string,
		filterMode: PropTypes.oneOf([SelectObject.FILTER_MODE.ALL, SelectObject.FILTER_MODE.LEAF]),
	};

	static defaultProps = {
		sourceData: [],
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
		this.props.setState({ selectedId: item[this.props.idAttr] });
	}

	render() {
		const state = this.props.state || DEFAULT_STATE;
		const props = omit(this.props, cmfConnect.INJECTED_PROPS);
		const filterMethod =
			this.props.filterMode === SelectObject.FILTER_MODE.ALL ? this.filterAll : this.filter;
		const matches = [];
		let selectedId = state.selectedId || props.selectedId;
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
				selectedId = matches[0].id;
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
