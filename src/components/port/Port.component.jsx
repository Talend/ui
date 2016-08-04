import React, { PropTypes } from 'react';
import { select, event } from 'd3-selection';

import './port.css';

export const PortType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    nodeId: PropTypes.string.isRequired,
    portType: PropTypes.string.isRequired,
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }),
    attr: PropTypes.object.isRequired,
});

const Port = React.createClass({
    propTypes: {
        port: PortType,
        onClick: PropTypes.func,
    },
    componentDidMount() {
        this.d3Node = select(this.node);
        this.d3Node.on('click', this.onClick);
    },
    shouldComponentUpdate(nextProps) {
        return nextProps.port !== this.props.port;
    },
    onClick() {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    },
    render() {
        if (this.props.port.position) {
            return (
              <g>
                <g ref={c => (this.node = c)}>
                  <circle
                    className="connector"
                    cx={this.props.port.position.x}
                    cy={this.props.port.position.y}
                  />
                </g>
              </g>
            );
        }

        return null;
    },
});
export default Port;
