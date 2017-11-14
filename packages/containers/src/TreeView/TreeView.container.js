import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect, componentState } from '@talend/react-cmf';
import { TreeView as Component } from '@talend/react-components';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';

const OPENED_ATTR = 'opened';
const SELECTED_ATTR = 'selectedId';
export const DEFAULT_PROPS = {
	idAttr: 'id',
	nameAttr: 'name',
	childrenAttr: 'children',
};
const DEFAULT_STATE = new Immutable.Map({
	[OPENED_ATTR]: new Immutable.List(),
	[SELECTED_ATTR]: undefined,
});

function open(id, state) {
	return state.set(OPENED_ATTR, state.get(OPENED_ATTR).push(id));
}

function close(id, state) {
	const opened = state.get(OPENED_ATTR);
	return state.set(OPENED_ATTR, opened.delete(opened.indexOf(id)));
}

function select(id, state) {
	return state.set('selectedId', id);
}

function toggleState(prevProps, id) {
	const opened = prevProps.state.get(OPENED_ATTR);
	if (opened.indexOf(id) !== -1) {
		return close(id, prevProps.state);
	}
	return open(id, prevProps.state);
}

function selectWrapper(prevProps, id) {
	return select(id, prevProps.state);
}

/**
 * recursive function to apply change on all data and support attr mapping
 * @param {Array<Object>} items is the list of pure items, your data
 * @param {Object} props the configuration of the Tree container
 * @return {Array} of items ready to be put as the structure of TreeView component
 */
export function transform(items, props) {
	if (!items) {
		return undefined;
	}
	const state = props.state || DEFAULT_STATE;
	const selectedId = state && state.get(SELECTED_ATTR);
	const opened = state && state.get(OPENED_ATTR).toJS();
	return items.map(item => ({
		...item,
		id: item[props.idAttr],
		selected: item[props.idAttr] === selectedId,
		toggled: opened.indexOf(item[props.idAttr]) !== -1,
		name: item[props.nameAttr],
		children: transform(item[props.childrenAttr], props),
	}));
}

/**
 * The TreeView React container
 */
class TreeView extends React.Component {
	static displayName = 'Container(TreeView)';
	static propTypes = {
		data: ImmutablePropTypes.List,
		idAttr: PropTypes.string,
		nameAttr: PropTypes.string,
		...componentState.propTypes,
	};
	static defaultProps = DEFAULT_PROPS;

	constructor(props) {
		super(props);
		this.onSelect = this.onSelect.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	onSelect(data) {
		this.props.setState(prevState => selectWrapper(prevState, data[this.props.idAttr]));
		if (this.props.onSelectActionCreator) {
			this.props.dispatchActionCreator(
				this.props.onSelectActionCreator,
				{
					type: 'select',
					source: 'TreeView',
					props: this.props,
				},
				data,
			);
		}
		if (this.props.itemSelectCallback) {
			this.props.itemSelectCallback(data);
		}
	}

	onClick(data) {
		this.props.setState(prevState => toggleState(prevState, data[this.props.idAttr]));
		if (this.props.onToggleActionCreator) {
			this.props.dispatchActionCreator(
				this.props.onToggleActionCreator,
				{
					type: 'toggle',
					source: 'TreeView',
					props: this.props,
				},
				data,
			);
		}
		if (this.props.itemToggleCallback) {
			this.props.itemToggleCallback(data);
		}
	}

	render() {
		const structure = transform(this.props.data.toJS(), this.props);
		return (
			<Component
				{...this.props}
				structure={structure}
				itemSelectCallback={this.onSelect}
				itemToggleCallback={this.onClick}
			/>
		);
	}
}

export function mapStateToProps(state, ownProps) {
	const props = {};
	if (ownProps.collection) {
		props.data = state.cmf.collections.getIn(ownProps.collection.split('.'));
	}
	return props;
}

export default cmfConnect({
	defaultState: DEFAULT_STATE,
	mapStateToProps,
})(TreeView);
