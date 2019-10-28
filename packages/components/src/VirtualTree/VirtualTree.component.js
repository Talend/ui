import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Tree from 'react-virtualized-tree/lib/TreeContainer';
import UnstableFastTree from 'react-virtualized-tree/lib/UnstableFastTree';
import TreeState from 'react-virtualized-tree/lib/state/TreeState';

import Renderers from 'react-virtualized-tree/lib/renderers';
import theme from './VirtualTree.scss';
import { Nodes } from '../TreeView/data';

import ThreeState from '../TreeView/renderers/ThreeState';
import Expandable from './Expandable';
//const { Expandable } = Renderers;

const SELECT = 3;

function nodeNameRenderer(rendererProps) {
	const {
		node: { name },
		children,
	} = rendererProps;
	return <span>{children}</span>;
	/*return (
		<span>
			{name}
			{children}
		</span>
	);*/
}
const Selection = props => {
	const { node, children, onChange, index } = props;
	const { state: { selected } = {} } = node;

	return (
		<span>
			<ThreeState
				node={node}
				//	index={index}
				onChange={() =>
					onChange({
						node: {
							...node,
							state: {
								...(node.state || {}),
								selected: !selected,
							},
						},
						type: SELECT,
					})
				}
			>
				{children}
			</ThreeState>
		</span>
	);
	/*
	const className = classNames({
		'mi mi-check-box': selected,
		'mi mi-check-box-outline-blank': !selected,
	});

	return (
		<span>
			<i
				className={className}
				onClick={() =>
					onChange({
						node: {
							...node,
							state: {
								...(node.state || {}),
								selected: !selected,
							},
						},
						type: SELECT,
					})
				}
			/>
			{children}
		</span>
	);
	*/
};

class VirtualTree extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nodes: props.fast ? TreeState.createFromTree(props.nodes) : props.nodes,
		};
	}

	handleChange = nodes => {
		this.setState({ nodes });
	};

	selectNodes = (nodes, selected) =>
		nodes.map(n => ({
			...n,
			children: n.children ? this.selectNodes(n.children, selected) : [],
			state: {
				...n.state,
				selected,
			},
		}));

	nodeSelectionHandler = (nodes, updatedNode) =>
		nodes.map(node => {
			if (node.id === updatedNode.id) {
				return {
					...updatedNode,
					children: node.children
						? this.selectNodes(node.children, updatedNode.state.selected)
						: [],
				};
			}

			if (node.children) {
				return { ...node, children: this.nodeSelectionHandler(node.children, updatedNode) };
			}

			return node;
		});

	render() {
		if (this.props.fast) {
			return (
				<UnstableFastTree
					nodes={this.state.nodes}
					onChange={this.handleChange}
					extensions={{
						updateTypeHandlers: {
							[SELECT]: this.nodeSelectionHandler,
						},
					}}
				>
					{({ style, node, ...rest }) => {
						// console.log('rest', rest);
						return (
							<div style={style}>
								<Expandable node={node} {...rest}>
									<Selection node={node} {...rest}>
										{this.props.nodeLabelRenderer() || node.name}
									</Selection>
								</Expandable>
							</div>
						);
					}}
				</UnstableFastTree>
			);
		}
		return (
			<Tree
				nodes={this.state.nodes}
				onChange={this.handleChange}
				extensions={{
					updateTypeHandlers: {
						[SELECT]: this.nodeSelectionHandler,
					},
				}}
			>
				{({ style, node, ...rest }) => (
					<div style={style}>
						<Expandable node={node} {...rest}>
							<Selection node={node} {...rest}>
								{node.name}
							</Selection>
						</Expandable>
					</div>
				)}
			</Tree>
		);
	}
}

VirtualTree.displayName = 'VirtualTree';
VirtualTree.propTypes = {
	//	name: PropTypes.string,
	nodes: PropTypes.arrayOf(PropTypes.object),
	fast: PropTypes.bool,
	nodeLabelRenderer: PropTypes.func,
};

export default VirtualTree;
