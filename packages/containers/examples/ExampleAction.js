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

const eAction = {
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
			<p>Using available expression (4 Actions 2 hidden)</p>
			<Action
				{...eAction}
				label="is True expression"
				available={{
					id: 'isTrueExpression',
					args: [true],
				}}
			/>
			<Action
				{...eAction}
				label="should not be displayed: false expression"
				available={{
					id: 'isTrueExpression',
					args: [],
				}}
			/>
			<Action
				{...eAction}
				label="model has label"
				available="modelHasLabel"
				model={{ id: 'foo', label: 'bar' }}
			/>
			<Action
				{...eAction}
				label="should not be displayed: model without label"
				available="modelHasLabel"
				model={{ id: 'bar' }}
			/>
		</div>
	);
}
