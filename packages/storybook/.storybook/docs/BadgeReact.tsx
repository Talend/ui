import { memo } from 'react';
import type { FunctionComponent } from 'react';

import Badge from './Badge';

const ReactStatus = (props: FunctionComponent) => {
	return (
		<Badge {...props} icon="react">
			React
		</Badge>
	);
};

export default memo(ReactStatus);
