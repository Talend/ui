import React from 'react';
import invariant from 'invariant';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function LinkType({ type, component }: { type: string; component: React.ReactNode }) {
	invariant(
		false,
		'<LinkType> elements are for DataFlow configuration only and should not be rendered',
	);
	return null;
}

LinkType.displayName = 'LinkType';

export default LinkType;
