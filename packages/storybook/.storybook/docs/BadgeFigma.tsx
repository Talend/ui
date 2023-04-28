import { memo } from 'react';
import type { FunctionComponent } from 'react';

import Badge from './Badge';

const FigmaStatus = (props: FunctionComponent) => {
	return (
		<Badge {...props} icon="figma">
			Figma
		</Badge>
	);
};

export default memo(FigmaStatus);
