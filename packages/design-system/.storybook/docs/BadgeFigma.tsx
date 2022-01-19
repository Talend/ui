import React from 'react';

import Badge from './Badge';

const FigmaStatus = (props: React.FunctionComponent) => {
	return (
		<Badge {...props} icon="figma">
			Figma
		</Badge>
	);
};

export default React.memo(FigmaStatus);
