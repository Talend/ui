import React from 'react';
import { action } from '@storybook/addon-actions';
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
			'data-feature': 'form.feature',
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
				requiredField: {
					type: 'string',
				},
			},
			required: ['requiredField'],
		},
		properties: { name: 'lol' },
		uiSchema: ['name', 'requiredField'],
	};
	const onTrigger = (...args) => {
		action('onTrigger')(...args);
		return Promise.resolve({
			properties: oldProperties => ({ ...oldProperties, name: 'name from trigger' }),
		});
	};
	return (
		<section>
			<UIForm
				id="my-form"
				actions={actions}
				data={schema}
				onReset={action('onReset')}
				onSubmit={action('onSubmit')}
				onTrigger={onTrigger}
			/>
		</section>
	);
}

export default {
	name: 'Core Custom actions',
	story,
};
