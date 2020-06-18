import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

export function addPathsToCollection(index, collection, paths, jsonpath) {
	return collection.set(index, paths.push(jsonpath));
}

export function removePathsFromCollection(index, collection, paths, jsonpath) {
	return collection.set(
		index,
		paths.filter(path => path !== jsonpath),
	);
}

/**
 * Collections expandedNodes / collapsedNodes are switched depending of the expand all value.
 * @param {number} index
 * @param {Immutable.Map} collection
 * @param {boolean} expandAll
 * @param {Immutable.List} paths
 */
export function updateCollection(index, collection, expandAll, paths, { opened, jsonpath }) {
	if (opened) {
		return expandAll
			? addPathsToCollection(index, collection, paths, jsonpath)
			: removePathsFromCollection(index, collection, paths, jsonpath);
	}
	return expandAll
		? removePathsFromCollection(index, collection, paths, jsonpath)
		: addPathsToCollection(index, collection, paths, jsonpath);
}

/**
 * Helps to manage opened and highlight state of the viewer.
 */
export default class TreeManager extends React.Component {
	static displayName = 'Container(TreeManager)';

	static propTypes = {
		highlighted: PropTypes.array,
		onToggle: PropTypes.func,
		wrappedComponent: PropTypes.func,
		isAllExpanded: PropTypes.bool,
		collapsedNodes: PropTypes.object,
		expandedNodes: PropTypes.object,
	};

	constructor(props) {
		super();

		this.state = {
			isAllExpanded: props.isAllExpanded || false,
			collapsedNodes: props.collapsedNodes || Immutable.Map(),
			expandedNodes: props.expandedNodes || Immutable.Map().set(0, Immutable.List(['$'])),
		};
	}

	onExpandAll = () => {
		this.setState(oldState => ({
			isAllExpanded: true,
			collapsedNodes: oldState.collapsedNodes.clear(),
		}));
	};

	onCollapseAll = () => {
		this.setState(oldState => ({
			isAllExpanded: false,
			expandedNodes: oldState.expandedNodes.clear(),
		}));
	};

	onToggle = (event, options, index) => {
		/*
			This is a special case for the union.
			We have to make all union expanded by default,
			so at the first click we don't want the union to be registered
			in the expanded collection.
		*/
		if (options.firstClickUnion) {
			return;
		}
		const isAllExpanded = this.state.isAllExpanded;
		const collection = isAllExpanded ? this.state.collapsedNodes : this.state.expandedNodes;
		if (isAllExpanded) {
			this.setState({
				collapsedNodes: updateCollection(
					index,
					collection,
					isAllExpanded,
					collection.get(index, Immutable.List()),
					options,
				),
			});
		} else {
			this.setState({
				expandedNodes: updateCollection(
					index,
					collection,
					isAllExpanded,
					collection.get(index, Immutable.List()),
					options,
				),
			});
		}
		if (this.props.onToggle) {
			this.props.onToggle(event, options, index);
		}
		// }
	};

	render() {
		const isAllExpanded = this.state.isAllExpanded;
		const wrappedProps = {
			onToggle: this.onToggle,
			onCollapseAll: this.onCollapseAll,
			onExpandAll: this.onExpandAll,
			paths: isAllExpanded ? this.state.collapsedNodes.toJS() : this.state.expandedNodes.toJS(),
			highlighted: this.props.highlighted,
			isAllExpanded,
		};
		return this.props.wrappedComponent({ ...wrappedProps });
	}
}
