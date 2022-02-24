import React from 'react';
import Action from '../Action';
import { AboutDialog } from './';

export default {
	title: 'AboutDialog',
	component: AboutDialog,
};

export const Default = () => (
	<div>
		<Action actionId="show:about" />
		<AboutDialog icon="talend-tdp-colored" />
	</div>
);
