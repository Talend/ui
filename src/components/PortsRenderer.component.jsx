import React from 'react';
import invariant from 'invariant';

import Port from './port/Port.component';

const PortsRenderer = React.createClass({
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
