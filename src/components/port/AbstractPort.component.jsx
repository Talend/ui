import React, { PropTypes } from 'react';
import { select, event } from 'd3-selection';

import { PortType } from '../../constants/flowdesigner.proptypes';

const AbstractPort = React.createClass({
    propTypes: {
        port: PortType,
        onClick: PropTypes.func,
    },
    componentDidMount() {
        this.d3Node = select(this.node);
        this.d3Node.on('click', this.onClick);
    },
    shouldComponentUpdate(nextProps) {
        return nextProps.port !== this.props.port || nextProps.children !== this.props.children;
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
                <g ref={c => (this.node = c)} transform={`translate(${this.props.port.position.x},${this.props.port.position.y})`}>
					{this.props.children}
                </g>
              </g>
            );
        }

        return null;
    },
});
export default AbstractPort;
