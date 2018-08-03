import PropTypes from 'prop-types';
import React from 'react';
import { mapOf } from 'react-immutable-proptypes';

import { Port } from '../../api';
import { PortType } from '../../constants/flowdesigner.proptypes';

class PortsRenderer extends React.Component {
	static propTypes = {
		ports: mapOf(PortType).isRequired,
		portTypeMap: PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);
		this.renderPort = this.renderPort.bind(this);
	}

	renderPort(port) {
		const type = Port.getComponentType(port);
		const ConcretePort = this.props.portTypeMap[type].component;
		return <ConcretePort key={Port.getId(port)} port={port} />;
	}

	render() {
		return <g>{this.props.ports.valueSeq().map(this.renderPort)}</g>;
	}
}

export default PortsRenderer;
