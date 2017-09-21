import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { SidePanel } from '../src';

export default function ExampleSidePanel() {
	return (
		<div>
			<IconsProvider />
			<SidePanel actionIds={['menu:first', 'menu:second', 'menu:third']} />
		</div>
	);
}
