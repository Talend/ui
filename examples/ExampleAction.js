import React from 'react';
import { action as stAction } from '@kadira/storybook';
import { IconsProvider } from 'react-talend-components';
import { Action } from '../src';

const myAction = {
	label: 'Click me',
	icon: 'talend-cog',
	type: 'MY SUPER REDUX ACTION',
	onClick: stAction('You clicked me'),
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
