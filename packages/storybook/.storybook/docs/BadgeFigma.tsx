import { memo } from 'react';
import type { FunctionComponent } from 'react';

import Badge, { BadgeProps } from './Badge';
import { Status } from './StatusTable';

type FigmaStatusProps = Omit<BadgeProps, 'icon'>;

const FigmaStatus = (props: FigmaStatusProps) => {
	return (
		<Badge {...props} icon="figma">
			Figma
		</Badge>
	);
};

export default memo(FigmaStatus);
