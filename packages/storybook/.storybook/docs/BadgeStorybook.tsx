import React from 'react';

import Badge from './Badge';

const StorybookStatus = (props: React.FunctionComponent) => {
	return (
		<Badge {...props} icon="storybook">
			Storybook
		</Badge>
	);
};

export default React.memo(StorybookStatus);
