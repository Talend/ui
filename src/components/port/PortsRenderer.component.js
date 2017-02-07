import React, { PropTypes } from 'react';
import { orderedMapOf } from 'react-immutable-proptypes';

import { PortType } from '../../constants/flowdesigner.proptypes';

class PortsRenderer extends React.Component {
	static propTypes = {
		ports: orderedMapOf(PortType).isRequired,
		portTypeMap: PropTypes.object.isRequired,
	}

	constructor(props) {
		super(props);
		this.renderPort = this.renderPort.bind(this);
	}

	renderPort(port) {
		const type = port.getIn(['graphicalAttributes', 'portType']);
		const ConcretePort = this.props.portTypeMap[type].component;
		return (<ConcretePort key={port.id} port={port} />);
	}

	render() {
		return (
			<g>
				{this.props.ports.map(this.renderPort)}
			</g>
		);
	}
}

export default PortsRenderer;
