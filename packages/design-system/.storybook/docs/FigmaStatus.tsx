import React from 'react';
import { siFigma } from 'simple-icons/icons';

import Link from './Link';

const FigmaStatus = (props: React.FunctionComponent) => {
	return (
		<Link {...props} icon={siFigma}>
			Figma
		</Link>
	);
};

export default React.memo(FigmaStatus);
