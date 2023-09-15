import { memo } from 'react';

import Badge, { BadgeProps } from './Badge';

type FigmaStatusProps = Omit<BadgeProps, 'icon'>;

const FigmaStatus = (props: FigmaStatusProps) => {
	return (
		<Badge {...props} icon="figma">
			Figma
		</Badge>
	);
};

export default memo(FigmaStatus);
