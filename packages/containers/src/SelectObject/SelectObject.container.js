import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { componentState, cmfConnect } from '@talend/react-cmf';
import Immutable, { List } from 'immutable';

import Component from './SelectObject.component';

export const DISPLAY_NAME = 'Container(SelectObject)';
export const DEFAULT_STATE = new Immutable.Map({});

function noop() {}

/**
 * Internal
 * @return item in items found with the id
 * @param {Object} options {id, items, idAttr, childrenAttr }
 */
export function getById(items, id, { idAttr = 'id', childrenAttr = 'children' } = {}) {
	let found;
	items.forEach(item => {
		if (item.get(idAttr) === id) {
			found = item.toJS();
		} else if (!found && item.get(childrenAttr, new List()).size > 0) {
			found = getById(item.get(childrenAttr), id, {
				idAttr,
				childrenAttr,
			});
		}
	});
	return found;
}

/**
 * apply query only on leaf elements, return them on a single list,
 * not taking into account the deepth of matched elements.
 * @return item in items found with the id
 * @param {Object} optins {query, items, idAttr, childrenAttr }
 */
export function filter(
	items = new List(),
	query = '',
	{ nameAttr = 'name', childrenAttr = 'children', onMatch = noop } = {},
	currentPosition = 'root',
) {
	if (query) {
		return (
			items.reduce((acc, item) => {
				const currentElementName = item.get(nameAttr, '');
				if (item.get(childrenAttr, new List()).size === 0) {
					if (currentElementName.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
						const withElementPosition = item.set('currentPosition', currentPosition);
						onMatch(item);
						return acc.push(withElementPosition);
					}
				} else {
					const result = filter(
						item.get(childrenAttr),
						query,
						{
							nameAttr,
						},
						`${currentPosition} > ${currentElementName}`,
					);
					return acc.concat(result);
				}
				return acc;
			}, new List()) || new List()
		);
	}
	return items;
}

class SelectObject extends React.Component {
	static displayName = DISPLAY_NAME;
	static propTypes = {
		...componentState.propTypes,
		sourceData: PropTypes.array,
		selectedId: PropTypes.string,
		tree: PropTypes.object,
		idAttr: PropTypes.string,
		nameAttr: PropTypes.string,
		breadCrumbsRootLabel: PropTypes.string,
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
		const matches = [];
		let selectedId = state.get('selectedId') || props.selectedId;
		function addMatch(item) {
			matches.push(item);
		}

		if (props.query) {
			props.filteredData = this.filter(
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
