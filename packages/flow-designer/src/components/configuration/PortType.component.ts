import React from 'react';
import invariant from 'invariant';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function PortType({ type, component }: { type: string; component: React.ReactNode }) {
	invariant(
		false,
		'<PortType> elements are for DataFlow configuration only and should not be rendered',
	);
	return null;
}

PortType.displayName = 'PortType';

export default PortType;
