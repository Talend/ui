import React from 'react';
import { action as stAction } from '@kadira/storybook';
import { IconsProvider } from 'react-talend-components';
import { Action } from '../src';

const myAction = {
	label: 'Click me',
	icon: 'talend-cog',
	onClick: stAction('You clicked me'),
	payload: {
		type: 'MY SUPER REDUX ACTION',
	},
};

export default function ExampleAction() {

	return (
		<div>
			<IconsProvider />
			<p>Using names</p>
			<Action name="menu:first" />
			<p>Using actions</p>
			<Action {...myAction} />
		</div>
	);
}
