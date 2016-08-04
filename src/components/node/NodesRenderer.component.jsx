import React, { PropTypes } from 'react';
import invariant from 'invariant';

import { NodeType } from './AbstractNode.component';

const NodesRenderer = React.createClass({
    propTypes: {
        nodes: PropTypes.arrayOf(NodeType).isRequired,
        nodeTypeMap: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                component: PropTypes.element.isRequired,
            })
        ).isRequired,
        moveNodeTo: PropTypes.func.isRequired,
    },
    renderNode(node) {
        const ConcreteComponent = this.props.nodeTypeMap[node.nodeType].component;
        if (!ConcreteComponent) {
            invariant(
            false,
            `<NodesRenderer />  the defined node type in your graph model hasn\'t been mapped into
            the dataflow configuration, check NodeType documentation`
          );
        }
        return (
          <ConcreteComponent node={node} moveNodeTo={this.props.moveNodeTo} key={node.id} />
    );
    },
    render() {
        return (
          <g>
            {this.props.nodes.map(this.renderNode)}
          </g>
        );
    },

});

export default NodesRenderer;
