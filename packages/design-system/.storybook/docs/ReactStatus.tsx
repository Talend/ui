import React from 'react';
import { siReact } from 'simple-icons/icons';

import Link from './Link';

const ReactStatus = (props: React.FunctionComponent) => {
	return (
		<Link {...props} icon={siReact}>
			React
		</Link>
	);
};

export default React.memo(ReactStatus);
