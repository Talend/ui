import { memo } from 'react';
import type { FunctionComponent } from 'react';

import Badge, { BadgeProps } from './Badge';

type StorybookStatusProps = Omit<BadgeProps, 'icon'>;

const StorybookStatus = (props: StorybookStatusProps) => {
	return (
		<Badge {...props} icon="storybook">
			Storybook
		</Badge>
	);
};

export default memo(StorybookStatus);
