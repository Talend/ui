import { memo } from 'react';
import type { FunctionComponent } from 'react';

import Badge from './Badge';

const StorybookStatus = (props: FunctionComponent) => {
	return (
		<Badge {...props} icon="storybook">
			Storybook
		</Badge>
	);
};

export default memo(StorybookStatus);
