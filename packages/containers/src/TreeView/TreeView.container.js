import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect, componentState } from '@talend/react-cmf';
import { TreeView as Component } from '@talend/react-components';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';

export const DEFAULT_STATE = new Immutable.Map({
	opened: new Immutable.List(), // Array of JSONPath
	selectedJsonpath: '', // Selected JSONPath
});

export function open(path, state) {
	return state.set('opened', state.get('opened').push(path));
}

export function close(path, state) {
	const opened = state.get('opened');
	return state.set('opened', opened.delete(opened.indexOf(path)));
}

export function select(path, state) {
	return state.set('selectedJsonpath', path);
}

export function toggleState(prevState, data) {
	if (data.isOpened) {
		return close(data.jsonpath, prevState.state);
	} else if (data.isOpened === false) {
		// we don't want to match on undefined as false
		return open(data.jsonpath, prevState.state);
	}

	return prevState;
}

export function selectWrapper(prevState, data) {
	return select(data, prevState.state);
}

function transform(items, props) {
	if (!items) {
		return undefined;
	}
	return items.map(item => ({
		...item,
		name: this.props.nameAttr ? item[this.props.nameAttr] : item.name,
		children: this.props.childrenAttr ?
			transform(item[this.props.childrenAttr], props) : transform(item.children),
	}));
}

class TreeView extends React.Component {
	static displayName = 'Container(TreeView)';
	static propTypes = {
		data: ImmutablePropTypes.List,
		nameAttr: PropTypes.string,
		...componentState.propTypes,
	};

	constructor(props) {
		super(props);
		this.itemSelectCallback = this.itemSelectCallback.bind(this);
		this.itemToggleCallback = this.itemToggleCallback.bind(this);
	}

	itemSelectCallback(data) {
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
		this.props.setState(prevState => selectWrapper(prevState, data));
	}

	itemToggleCallback(data) {
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
