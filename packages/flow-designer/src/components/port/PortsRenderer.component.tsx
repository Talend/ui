import React from 'react';
import get from 'lodash/get';

import { Port } from '../../api';
import { PortRecord, PortRecordMap } from '../../customTypings/index.d';

function PortsRenderer({ ports, portTypeMap }: { ports: PortRecordMap; portTypeMap: Object }) {
	const renderPort = (port: PortRecord) => {
		const type = Port.getComponentType(port);
		const ConcretePort = get((portTypeMap as any)[type], 'component');
		return <ConcretePort key={Port.getId(port)} port={port} />;
	};

	return <g>{ports.valueSeq().map(renderPort)}</g>;
}

export default PortsRenderer;
