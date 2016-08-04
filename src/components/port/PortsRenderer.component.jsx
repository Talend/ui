import React, { PropTypes } from 'react';
import invariant from 'invariant';

import Port, { PortType } from './Port.component';

const PortsRenderer = React.createClass({
    propTypes: {
        ports: PropTypes.arrayOf(PortType).isRequired,
    },
    renderPort(port) {
        return (<Port key={port.id} port={port} />);
    },
    render() {
        return (
          <g>
            {this.props.ports.map(this.renderPort)}
          </g>
        );
    },
});

export default PortsRenderer;
