import React from 'react';
import { IconsProvider } from 'react-talend-components';
import { SidePanel } from '../src';

export default function ExampleSidePanel() {
	return (
		<div>
			<IconsProvider />
			<SidePanel actions={['menu:demo']} />
		</div>
	);
}
