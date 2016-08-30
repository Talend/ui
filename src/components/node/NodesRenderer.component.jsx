import React, { PropTypes } from 'react';
import invariant from 'invariant';
import { mapOf } from 'react-immutable-proptypes';

import { NodeType } from '../../constants/flowdesigner.proptypes';

const NodesRenderer = React.createClass({
    propTypes: {
        nodes: mapOf(NodeType).isRequired,
        nodeTypeMap: PropTypes.object.isRequired,
        moveNodeTo: PropTypes.func.isRequired,
        moveNodeToEnd: PropTypes.func.isRequired,
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
          <ConcreteComponent node={node} moveNodeTo={this.props.moveNodeTo} moveNodeToEnd={this.props.moveNodeToEnd} key={node.id} />
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
