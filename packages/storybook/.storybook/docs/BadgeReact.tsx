import React from 'react';

import Badge from './Badge';

const ReactStatus = (props: React.FunctionComponent) => {
	return (
		<Badge {...props} icon="react">
			React
		</Badge>
	);
};

export default React.memo(ReactStatus);
