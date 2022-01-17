import React from 'react';

import Badge from './Badge';

const StorybookStatus = (props: React.FunctionComponent) => {
	return (
		<Badge {...props} icon="storybook">
			Documentation
		</Badge>
	);
};

export default React.memo(StorybookStatus);
