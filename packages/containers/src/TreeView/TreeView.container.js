import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect, componentState } from '@talend/react-cmf';
import { TreeView as Component } from '@talend/react-components';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import omit from 'lodash/omit';

const OPENED_ATTR = 'opened';
const SELECTED_ATTR = 'selectedId';
export const DISPLAY_NAME = 'Container(TreeView)';
export const DEFAULT_PROPS = {
	idAttr: 'id',
	nameAttr: 'name',
	childrenAttr: 'children',
};
export const DEFAULT_STATE = new Immutable.Map({
	[OPENED_ATTR]: new Immutable.List(),
	[SELECTED_ATTR]: undefined,
});

function toggleState(prevProps, id) {
	const opened = prevProps.state.get(OPENED_ATTR);
	const index = opened.indexOf(id);
	if (index !== -1) {
		return prevProps.state.set(OPENED_ATTR, opened.delete(index));
	}
	return prevProps.state.set(OPENED_ATTR, prevProps.state.get(OPENED_ATTR).push(id));
}

function selectWrapper(prevProps, id) {
	const selected = prevProps.state.get(SELECTED_ATTR);
	if (id === selected) {
		return prevProps.state.set(SELECTED_ATTR, undefined);
	}
	return prevProps.state.set(SELECTED_ATTR, id);
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
	const selectedId = props[SELECTED_ATTR] || state && state.get(SELECTED_ATTR);
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
	static displayName = DISPLAY_NAME;
	static propTypes = {
		data: ImmutablePropTypes.List,
		idAttr: PropTypes.string,
		nameAttr: PropTypes.string,
		onClick: PropTypes.func,
		onSelect: PropTypes.func,
		onClickActionCreator: PropTypes.string,
		onSelectActionCreator: PropTypes.string,

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
		if (this.props.onSelect) {
			this.props.onSelect(data);
		}
	}

	onClick(data) {
		this.props.setState(prevState => toggleState(prevState, data[this.props.idAttr]));
		if (this.props.onClickActionCreator) {
			this.props.dispatchActionCreator(
				this.props.onClickActionCreator,
				{
					type: 'toggle',
					source: 'TreeView',
					props: this.props,
				},
				data,
			);
		}
		if (this.props.onClick) {
			this.props.onClick(data);
		}
	}

	render() {
		if (!this.props.data) {
			return null;
		}
		const structure = transform(this.props.data.toJS(), this.props);
		const props = omit(this.props, cmfConnect.INJECTED_PROPS);
		return (
			<Component {...props} structure={structure} onSelect={this.onSelect} onClick={this.onClick} />
		);
	}
}

export function mapStateToProps(state, ownProps) {
	const props = {};
	if (ownProps.collection) {
		props.data = state.cmf.collections.getIn(ownProps.collection.split('.'));
		if (!props.data) {
			// eslint-disable-next-line no-console;
			console.warn('TreeView.collection not found');
		}
	}
	return props;
}

export default cmfConnect({
	defaultState: DEFAULT_STATE,
	mapStateToProps,
})(TreeView);
