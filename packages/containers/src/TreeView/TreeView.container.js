import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect, componentState } from '@talend/react-cmf';
import { TreeView as Component } from '@talend/react-components';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';

export const DEFAULT_STATE = new Immutable.Map({
	opened: new Immutable.List(), // Array of JSONPath
	selectedId: undefined, // Selected id
});

export function open(id, state) {
	return state.set('opened', state.get('opened').push(id));
}

export function close(id, state) {
	const opened = state.get('opened');
	return state.set('opened', opened.delete(opened.indexOf(id)));
}

export function select(id, state) {
	return state.set('selectedId', id);
}

export function toggleState(prevState, data) {
	const opened = prevState.state.get('opened');
	if (opened.indexOf(data.id) !== -1) {
		return close(data.id, prevState.state);
	}
	return open(data.id, prevState.state);
}

export function selectWrapper(prevState, data) {
	return select(data.id, prevState.state);
}

function transform(items, props) {
	if (!items) {
		return undefined;
	}
	const state = props.state || DEFAULT_STATE;
	const selectedId = state && state.get('selectedId');
	const opened = state && state.get('opened').toJS();
	return items.map(item => ({
		...item,
		id: item[props.idAttr],
		selected: item[props.idAttr] === selectedId,
		toggled: opened.indexOf(item[props.idAttr]) !== -1,
		name: item[props.nameAttr],
		children: transform(item[props.childrenAttr], props),
	}));
}

class TreeView extends React.Component {
	static displayName = 'Container(TreeView)';
	static propTypes = {
		data: ImmutablePropTypes.List,
		idAttr: PropTypes.string,
		nameAttr: PropTypes.string,
		...componentState.propTypes,
	};
	static defaultProps = {
		idAttr: 'id',
		nameAttr: 'name',
		childrenAttr: 'children',
	};
	constructor(props) {
		super(props);
		this.itemSelectCallback = this.itemSelectCallback.bind(this);
		this.itemToggleCallback = this.itemToggleCallback.bind(this);
	}

	itemSelectCallback(data) {
		this.props.setState(prevState => selectWrapper(prevState, {
			id: data[this.props.idAttr],
		}));
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

	itemToggleCallback(data) {
		this.props.setState(prevState => toggleState(prevState, {
			id: data[this.props.idAttr],
		}));
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
				itemSelectCallback={this.itemSelectCallback}
				itemToggleCallback={this.itemToggleCallback}
			/>
		);
	}
}

function mapStateToProps(state, ownProps) {
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
