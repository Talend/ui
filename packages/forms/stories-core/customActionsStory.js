import React from 'react';
import { action } from '@kadira/storybook';
import { UIForm } from '../src/UIForm';

function story() {
	const actions = [
		{
			title: 'Reset',
			type: 'reset',
			widget: 'button',
		},
		{
			disabled: true,
			title: 'Disabled',
			type: 'button',
			widget: 'button',
		},
		{
			inProgress: true,
			title: 'In progress',
			type: 'button',
			widget: 'button',
		},
		{
			title: 'Trigger',
			triggers: ['test'],
			type: 'button',
			widget: 'button',
		},
		{
			bsStyle: 'primary',
			title: 'Submit',
			type: 'submit',
			widget: 'button',
		},
	];
	const schema = {
		jsonSchema: {
			title: 'Form with custom actions',
			type: 'object',
			properties: {
				name: {
					type: 'string',
				},
			},
		},
		properties: { name: 'lol' },
		uiSchema: ['name'],
	};
	return (
		<UIForm
			actions={actions}
			data={schema}
			onSubmit={action('onSubmit')}
			onTrigger={action('onTrigger')}
		/>
	);
}

export default {
	name: 'Core Custom actions',
	story,
};
