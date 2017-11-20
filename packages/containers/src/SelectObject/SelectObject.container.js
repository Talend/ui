import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { componentState, cmfConnect } from '@talend/react-cmf';
import { Map, List } from 'immutable';

import Component from './SelectObject.component';

export const DEFAULT_STATE = new Map({});
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
		this.onSelect = this.onSelect.bind(this);
	}

	onSelect(data) {
		this.props.setState({
			selected: data.id || data.get('id'),
		});
	}

	render() {
		const state = this.props.state || DEFAULT_STATE;
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
		if (matches.length === 1) {
			this.onSelect(matches[0]);
		}
		props.selected = state.get('selected');
		if (props.selected) {
			props.selected = getById({
				...props,
				id: props.selected,
				items: props.sourceData,
			});
		}
		if (props.tree) {
			props.tree.onSelect = this.onSelect;
		}
		return <Component {...props} />;
	}
}

export default SelectObject;
