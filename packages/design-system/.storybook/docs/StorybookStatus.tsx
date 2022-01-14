import React from 'react';
import { siStorybook } from 'simple-icons/icons';

import Link from './Link';

const StorybookStatus = (props: React.FunctionComponent) => {
	return (
		<Link {...props} icon={siStorybook}>
			Documentation
		</Link>
	);
};

export default React.memo(StorybookStatus);
