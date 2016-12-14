import React from 'react';
import { action as stAction } from '@kadira/storybook';
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
			<p>Using names</p>
			<Action name="menu:article" />
			<p>Using actions</p>
			<Action {...myAction} />
		</div>
	);
}
