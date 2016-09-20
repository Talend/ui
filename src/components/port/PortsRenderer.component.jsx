import React from 'react';
import { orderedMapOf } from 'react-immutable-proptypes';

import { PortType } from '../../constants/flowdesigner.proptypes';

const PortsRenderer = React.createClass({
    propTypes: {
        ports: orderedMapOf(PortType).isRequired,
    },
    renderPort(port) {
		const ConcretePort = this.props.portTypeMap[port.portType].component;
        return (<ConcretePort key={port.id} port={port} />);
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
