import React from 'react';
import { action as stAction } from '@storybook/addon-actions';

import { Action } from '../src';

const myAction = {
	label: 'Click me',
	icon: 'talend-cog',
	onClick: stAction('You clicked me'),
	payload: {
		type: 'MY SUPER REDUX ACTION',
	},
};

const eAction = {
	onClick: stAction('You clicked me'),
	payload: {
		type: 'MY SUPER REDUX ACTION',
	},
};

export default function ExampleAction() {
	return (
		<div>
			<p>Using actionId</p>
			<Action actionId="menu:first" />
			<Action actionId="menu:items" />
			<Action actionId="menu:items-id" />
			<p>Using pure action props</p>
			<Action {...myAction} />
			<p>Using availableExpression (4 Actions 2 hidden)</p>
			<Action
				{...eAction}
				label="is True expression"
				availableExpression={{
					id: 'isTrueExpression',
					args: [true],
				}}
			/>
			<Action
				{...eAction}
				label="should not be displayed: false expression"
				availableExpression={{
					id: 'isTrueExpression',
					args: [],
				}}
			/>
			<Action
				{...eAction}
				label="model has label"
				availableExpression="modelHasLabel"
				model={{ id: 'foo', label: 'bar' }}
			/>
			<Action
				{...eAction}
				label="should not be displayed: model without label"
				availableExpression="modelHasLabel"
				model={{ id: 'bar' }}
			/>
			<p>Using actions with overlay</p>
			<Action actionId="action:overlay:component" />
		</div>
	);
}
