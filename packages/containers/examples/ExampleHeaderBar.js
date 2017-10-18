import React from 'react';
import { IconsProvider } from '@talend/react-components';

import { HeaderBar } from '../src';

export default function HeaderBarExample() {
	return (
		<div>
			<IconsProvider />
			<HeaderBar />
		</div>
	);
}
