import React from 'react';

import { Action, AboutDialog } from '../src';

export default {
	default: () => (
		<div>
			<Action actionId="show:about" />
			<AboutDialog icon="talend-tdp-colored" />
		</div>
	),
};
