import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { Inject } from '@talend/react-cmf';

export default function HeaderBarExample() {
	return (
		<div>
			<IconsProvider />
			<Inject component="HeaderBar" />
		</div>
	);
}
