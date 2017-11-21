import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { componentState, cmfConnect } from '@talend/react-cmf';
import { List } from 'immutable';

import Component from './SelectObject.component';

export const DISPLAY_NAME = 'Container(SelectObject)';

function noop() {}

function getById({
	id,
	items,
	idAttr = 'id',
	childrenAttr = 'children',
}) {
	let found;
	items.forEach(item => {
		if (item.get(idAttr) === id) {
			found = item.toJS();
		} else if (!found && item.get(childrenAttr, new List()).size > 0) {
			found = getById({
				id,
				items: item.get(childrenAttr),
				idAttr,
				childrenAttr,
			});
		}
	});
	return found;
}

function filter({
	items,
	query = '',
	nameAttr = 'name',
	childrenAttr = 'children',
	onMatch = noop,
}) {
	return (
		items.filter(item => {
			if (
				item
					.get(nameAttr, '')
					.toLowerCase()
					.indexOf(query.toLowerCase()) !== -1
			) {
				onMatch(item);
				return true;
			} else if (item.get(childrenAttr, new List()).size > 0) {
				return filter({
					items: item.get(childrenAttr),
					query,
					nameAttr,
				}).size > 0;
			}
			return false;
		}) || new List([])
	);
}

class SelectObject extends React.Component {
	static displayName = DISPLAY_NAME;
	static propTypes = {
		...componentState.propTypes,
	};
	static defaultProps = {
		sourceData: [],
	};

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const props = omit(this.props, cmfConnect.INJECTED_PROPS);
		const matches = [];
		function addMatch(item) {
			matches.push(item);
		}
		props.filteredData = filter({
			...props,
			items: props.sourceData,
			onMatch: addMatch,
		});
		let selected = props.selectedId;
		let preview;
		if (!selected && matches.length === 1) {
			selected = matches[0].get('id');
		}
		if (selected) {
			props.selected = getById({
				...props,
				id: selected,
				items: props.sourceData,
			});
			if (props.preview) {
				preview = Object.assign({
					[props.preview.selectedAttr]: props.selected,
				}, props.preview);
			}
		}
		if (props.tree) {
			props.tree.selectedId = selected;
		}
		return <Component {...props} preview={preview} />;
	}
}

export default SelectObject;
