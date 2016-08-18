import React from 'react';
import { orderedMapOf } from 'react-immutable-proptypes';

import Port from './Port.component';
import { PortType } from '../../constants/flowdesigner.proptypes';

const PortsRenderer = React.createClass({
    propTypes: {
        ports: orderedMapOf(PortType).isRequired,
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
