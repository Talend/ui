import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect } from '@talend/react-cmf';
import Component from '@talend/react-components/lib/TreeView';
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

function itemHasChildId(data, idAttr, idToMatch) {
	if (!data.children || !data.children.length) {
		return false;
	}
	return data.children.some(
		child => child[idAttr] === idToMatch || itemHasChildId(child, idAttr, idToMatch),
	);
}

function toggleState(prevProps, data, idAttr) {
	const id = data[idAttr];
	const opened = prevProps.state.get(OPENED_ATTR);
	const index = opened.indexOf(id);
	if (index !== -1) {
		let nextState = prevProps.state.set(OPENED_ATTR, opened.delete(index));
		const selectedId = nextState.get(SELECTED_ATTR);
		if (selectedId !== undefined && itemHasChildId(data, idAttr, selectedId)) {
			nextState = nextState.set(SELECTED_ATTR, undefined);
		}

		return nextState;
	}
	return prevProps.state.set(OPENED_ATTR, prevProps.state.get(OPENED_ATTR).push(id));
}

function openAllState(prevProps, data, idAttr) {
	const nextOpened = data
		.reduce((accu, item) => accu.add(item[idAttr]), prevProps.state.get(OPENED_ATTR).toSet())
		.toList();

	return prevProps.state.set(OPENED_ATTR, nextOpened);
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
export function transform(items, props, parent) {
	if (!items) {
		return undefined;
	}
	const state = props.state || DEFAULT_STATE;
	const selectedId = state.get(SELECTED_ATTR);
	const opened = state.get(OPENED_ATTR);

	return items.map(item => {
		const elem = {
			...item,
			id: item[props.idAttr],
			isOpened: item.isOpened || opened.includes(item[props.idAttr]),
			name: item[props.nameAttr],
			parent,
		};

		elem.children = transform(item[props.childrenAttr], props, elem);

		if (item[props.idAttr] === selectedId) {
			for (let current = elem; current.parent; current = current.parent) {
				current.parent.isOpened = true;
			}
		}

		return elem;
	});
}

/**
 * The TreeView React container
 */
class TreeView extends React.Component {
	static displayName = DISPLAY_NAME;
	static propTypes = {
		data: ImmutablePropTypes.list,
		idAttr: PropTypes.string,
		nameAttr: PropTypes.string,
		onClick: PropTypes.func,
		onToggle: PropTypes.func,
		onSelect: PropTypes.func,
		onClickActionCreator: PropTypes.string,
		onSelectActionCreator: PropTypes.string,

		...cmfConnect.propTypes,
	};
	static defaultProps = DEFAULT_PROPS;

	constructor(props) {
		super(props);
		this.onSelect = this.onSelect.bind(this);
		this.onToggle = this.onToggle.bind(this);
		this.onToggleAllSiblings = this.onToggleAllSiblings.bind(this);

		if (props.onClick && process.env.NODE_ENV !== 'production') {
			// eslint-disable-next-line no-console
			console.warn(
				'Treeview container: props.onClick is deprecated please use onToggle that is way more explicit',
			);
		}
	}

	onSelect(event, data) {
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

	onToggle(event, data) {
		this.props.setState(prevState => toggleState(prevState, data, this.props.idAttr));
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
		if (this.props.onToggle) {
			this.props.onToggle(data);
		}
		// deprecated
		if (this.props.onClick) {
			this.props.onClick(data);
		}
	}

	onToggleAllSiblings(event, data) {
		this.props.setState(prevState => openAllState(prevState, data, this.props.idAttr));
	}

	getSelectedId() {
		const selectedId = this.props[SELECTED_ATTR];
		if (selectedId !== undefined) {
			return selectedId;
		}

		const state = this.props.state || DEFAULT_STATE;
		return state.get(SELECTED_ATTR);
	}

	render() {
		if (!this.props.data) {
			return null;
		}
		const structure = transform(this.props.data.toJS(), this.props);
		const props = omit(this.props, cmfConnect.INJECTED_PROPS);
		return (
			<Component
				{...props}
				structure={structure}
				onSelect={this.onSelect}
				onToggle={this.onToggle}
				onToggleAllSiblings={this.onToggleAllSiblings}
				selectedId={this.getSelectedId()}
			/>
		);
	}
}

export function mapStateToProps(state, ownProps) {
	const props = {};
	if (ownProps.collection) {
		props.data = state.cmf.collections.getIn(ownProps.collection.split('.'));
		if (!props.data) {
			// eslint-disable-next-line no-console
			console.warn('TreeView.collection not found');
		}
	}
	return props;
}

export default cmfConnect({
	defaultState: DEFAULT_STATE,
	mapStateToProps,
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(TreeView);
