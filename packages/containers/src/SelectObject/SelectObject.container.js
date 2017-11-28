import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { componentState, cmfConnect } from '@talend/react-cmf';
import Immutable, { List } from 'immutable';
import keycode from 'keycode';

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
	};
	static defaultProps = {
		sourceData: [],
		idAttr: 'id',
		nameAttr: 'name',
	};

	constructor(props) {
		super(props);
		this.state = {};
		this.filter = filter;
		this.getById = getById;
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onTreeClick = this.onTreeClick.bind(this);
		this.onResultsClick = this.onResultsClick.bind(this);
	}

	onKeyDown(event) {
		// handle arrows only if query has been set
		if (event.keyCode === keycode.codes.down) {
			// put focus on treeview or results
			this.props.setState({ focus: 'content' });
		}
	}

	onFilterFocus() {
		this.props.setState({ focus: 'FilterBar' });
	}

	onTreeClick(data) {
		this.props.setState({ selectedId: data[this.props.idAttr], focus: 'content' });
	}

	onResultsClick(event, item) {
		this.props.setState({ selectedId: item.get(this.props.idAttr) });
	}

	render() {
		const state = this.props.state || DEFAULT_STATE;
		const props = omit(this.props, cmfConnect.INJECTED_PROPS);
		const matches = [];
		function addMatch(item) {
			matches.push(item);
		}
		let selected = state.get('selectedId') || props.selectedId;
		if (props.query) {
			props.filteredData = this.filter(props.sourceData, props.query, {
				...props,
				onMatch: addMatch,
			});
			delete props.tree;
			props.results = {
				onClick: this.onResultsClick,
				idAttr: this.props.idAttr,
				nameAttr: this.props.nameAttr,
				selectedId: selected,
			};
		}
		console.error('___DEBUG__', props.sourceData, props.filteredData);
		let preview;
		if (!selected && matches.length === 1) {
			selected = matches[0].get('id');
		}
		if (selected) {
			props.selected = this.getById(props.sourceData, selected, props);
			if (props.preview) {
				preview = Object.assign(
					{
						[props.preview.selectedAttr]: props.selected,
					},
					props.preview,
				);
			}
		}
		if (props.tree) {
			props.tree.selectedId = selected;
			props.tree.onSelect = this.onTreeClick;
		}
		if (!props.filter) {
			props.filter = {};
		}
		props.filter.onKeyDown = this.onKeyDown;
		return <Component {...props} preview={preview} />;
	}
}

export default SelectObject;
