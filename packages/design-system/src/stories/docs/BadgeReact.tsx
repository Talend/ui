import { memo } from 'react';
import type { FunctionComponent } from 'react';

import Badge, { BadgeProps } from './Badge';

type ReactStatusProps = Omit<BadgeProps, 'icon'>;

const ReactStatus = (props: ReactStatusProps) => {
	return (
		<Badge {...props} icon="react">
			React
		</Badge>
	);
};

export default memo(ReactStatus);
