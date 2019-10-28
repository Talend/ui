import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Tree from 'react-virtualized-tree/lib/TreeContainer';
import UnstableFastTree from 'react-virtualized-tree/lib/UnstableFastTree';
import TreeState from 'react-virtualized-tree/lib/state/TreeState';
import TreeStateModifiers from 'react-virtualized-tree/lib/state/TreeStateModifiers';
import { UPDATE_TYPE } from 'react-virtualized-tree/lib/contants';
import {createSelector} from 'reselect';
import {deleteNodeFromTree, replaceNodeFromTree, getRowIndexFromId} from 'react-virtualized-tree/lib/selectors/nodes';


//import Renderers from 'react-virtualized-tree/lib/renderers';
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
}

const SELECT = 3;

const DEFAULT_UPDATE_TYPES = {
  [UPDATE_TYPE.DELETE]: deleteNodeFromTree,
  [UPDATE_TYPE.UPDATE]: replaceNodeFromTree,
};

const Selection = ({node, children, onChange, index}) => {
  const {state: {selected} = {}} = node;
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
            index,
            type: SELECT,
          })
        }
      />
      {children}
    </span>
  );
};

const getExtensions = createSelector(
  e => e,
  (extensions = {}) => {
    const {updateTypeHandlers = {}} = extensions;
    return {
      updateTypeHandlers: {
        ...DEFAULT_UPDATE_TYPES,
        ...updateTypeHandlers,
      },
    };
  },
);
class VirtualTree extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);

		this.nodeSelectionHandler = this.nodeSelectionHandler.bind(this);
		this.state = {
			nodes: props.fast ? TreeState.createFromTree(props.nodes) : props.nodes,
		};
	}
	/*
	handleChange = nodes => {
		this.setState({ nodes });
	};
*/
	handleChange = ({ node, type, index }) => {
		let nodes;
		if (type === UPDATE_TYPE.DELETE) {
			nodes = TreeStateModifiers.deleteNodeAt(this.props.nodes, index);
		} else {
			nodes = TreeStateModifiers.editNodeAt(this.props.nodes, index, node);
		}

		// this.props.onChange({ nodes, node, type });
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
