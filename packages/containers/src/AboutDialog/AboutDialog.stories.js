import React from 'react';

import Action from '../Action';
import AboutDialog from '.';

export default {
	title: 'AboutDialog',
};

export const Default = () => (
	<div>
		<Action actionId="about-dialog:show" />
		<AboutDialog icon="talend-tdp-colored" />
	</div>
);
