import React, { PropTypes } from 'react';
import { select, event } from 'd3-selection';
import { drag } from 'd3-drag';
import { scaleLinear } from 'd3-scale';
import { Map } from 'immutable';

import invariant from 'invariant';

import './node.css';
import { NodeType } from '../../constants/flowdesigner.proptypes';


/**
 * calculate the position of each ports for a given node information
 * @param emitterPorts
 * @param sinkPorts
 * @param nodePosition
 * @param nodeSize
 */
const calculatePortPosition = (ports, nodePosition, nodeSize) => {
    let portsWithPosition = new Map();
    const emitterPorts = ports.filter(port => port.attr.get('type') === 'EMITTER');
    const sinkPorts = ports.filter(port => port.attr.get('type') === 'SINK');
    const range = [nodePosition.y, nodePosition.y + nodeSize.height];
    const scaleYEmitter = scaleLinear()
            .domain([0, emitterPorts.size + 1])
            .range(range);
    const scaleYSink = scaleLinear()
            .domain([0, sinkPorts.size + 1])
            .range(range);
    let emitterNumber = 0;
    let sinkNumber = 0;
    emitterPorts.forEach(port => {
        emitterNumber += 1;
        const position = {
            x: nodePosition.x + nodeSize.width,
            y: scaleYEmitter(emitterNumber),
        };
        portsWithPosition = portsWithPosition.set(port.id, port.set('position', position));
    });
    sinkPorts.forEach(port => {
        sinkNumber += 1;
        const position = {
            x: nodePosition.x,
            y: scaleYSink(sinkNumber),
        };
        portsWithPosition = portsWithPosition.set(port.id, port.set('position', position));
    });
    return portsWithPosition;
};


export const Node = React.createClass({
    propTypes: {
        node: NodeType.isRequired,
        moveNodeTo: PropTypes.func.isRequired,
        onDragStart: PropTypes.func,
        onDrag: PropTypes.func,
        onDragEnd: PropTypes.func,
        onClick: PropTypes.func,
        children: PropTypes.node,
    },
    statics: { calculatePortPosition },
    componentDidMount() {
        this.d3Node = select(this.nodeElement);
        this.d3Node.data([this.props.node.position]);
        this.d3Node.call(
            drag()
            .on('start', this.onDragStart)
            .on('drag', this.onDrag)
            .on('end', this.onDragEnd)
        );
    },
    shouldComponentUpdate(nextProps) {
        return nextProps !== this.props;
    },
    componentWillUnmount() {
        this.d3Node.remove();
    },
    onClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    },
    onDragStart() {
        if (this.props.onDragStart) {
            this.props.onDragStart(event);
        }
    },
    onDrag() {
        this.d3Node.data([this.props.node.position]);
        this.props.moveNodeTo(this.props.node.id, event);
        if (this.props.onDrag) {
            this.props.onDrag(event);
        }
    },
    onDragEnd() {
        if (this.props.onDragEnd) {
            this.props.onDragEnd(event);
        }
    },
    renderContent() {
        if (this.props.children) {
            return this.props.children;
        }
        invariant(false, '<AbstractNode /> should not be used without giving it a children' +
            'ex: <AbstractNode><rect /></AbstractNode>');
        return null;
    },
    render() {
        const { node } = this.props;
        return (
          <g>
            <g
              transform={`translate(${node.position.x},${node.position.y})`}
              ref={c => (this.nodeElement = c)} onClick={this.onClick}
            >
              {this.renderContent()}
            </g>
          </g>
        );
    },
});


export default Node;
