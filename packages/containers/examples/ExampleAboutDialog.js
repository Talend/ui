import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { Action, AboutDialog } from '../src';


export default {
	default: () => (
		<div>
			<IconsProvider />
			<Action actionId="show:about" />
			<AboutDialog icon="talend-tdp-colored" />
		</div>
	),
};
