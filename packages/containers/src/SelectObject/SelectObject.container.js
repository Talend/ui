import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { componentState, cmfConnect } from '@talend/react-cmf';
import { List } from 'immutable';

import Component from './SelectObject.component';

export const DISPLAY_NAME = 'Container(SelectObject)';

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
 * Internal
 * @return item in items found with the id
 * @param {Object} optins {query, items, idAttr, childrenAttr }
 */
export function filter(
	items = new List(),
	query = '',
	{ nameAttr = 'name', childrenAttr = 'children', onMatch = noop } = {},
) {
	return (
		items.reduce((acc, item) => {
			if (
				item
					.get(nameAttr, '')
					.toLowerCase()
					.indexOf(query.toLowerCase()) !== -1
			) {
				onMatch(item);
				return acc.push(item);
			} else if (item.get(childrenAttr, new List()).size > 0) {
				const children = filter(item.get(childrenAttr), query, {
					nameAttr,
				});
				if (children.size > 0) {
					return acc.push(item.set('toggled', true).set('children', children));
				}
			}
			return acc;
		}, new List()) || new List()
	);
}

class SelectObject extends React.Component {
	static displayName = DISPLAY_NAME;
	static propTypes = {
		...componentState.propTypes,
		sourceData: PropTypes.array,
		selectedId: PropTypes.string,
		tree: PropTypes.object,
	};
	static defaultProps = {
		sourceData: [],
	};

	constructor(props) {
		super(props);
		this.state = {};
		this.filter = filter;
		this.getById = getById;
	}

	render() {
		const props = omit(this.props, cmfConnect.INJECTED_PROPS);
		const matches = [];
		function addMatch(item) {
			matches.push(item);
		}
		props.filteredData = this.filter(props.sourceData, props.query, {
			...props,
			onMatch: addMatch,
		});
		console.error('___DEBUG__', props.sourceData, props.filteredData);
		let selected = props.selectedId;
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
		}
		return <Component {...props} preview={preview} />;
	}
}

export default SelectObject;
