import React, { PropTypes } from 'react';
import { select, event } from 'd3-selection';

import { PortType } from '../../constants/flowdesigner.proptypes';

import './port.css';

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
