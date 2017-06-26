import React from 'react';
import { action } from '@kadira/storybook';
import { Tabs, Tab } from 'react-bootstrap';
import { ConnectedUIForm, UIForm } from '../src/UIForm';

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
				requiredField: {
					type: 'string',
				},
			},
			required: ['requiredField'],
		},
		properties: { name: 'lol' },
		uiSchema: ['name', 'requiredField'],
	};
	return (
		<section>
			<Tabs id={'store-tabs'}>
				<Tab
					eventKey={0}
					key={'without'}
					title={'State'}
				>
					<UIForm
						actions={actions}
						data={schema}
						onReset={action('onReset')}
						onSubmit={action('onSubmit')}
						onTrigger={action('onTrigger')}
					/>
				</Tab>
				<Tab
					eventKey={1}
					key={'with'}
					title={'Redux'}
				>
					<ConnectedUIForm
						actions={actions}
						data={schema}
						onReset={action('onReset')}
						onSubmit={action('onSubmit')}
						onTrigger={action('onTrigger')}
					/>
				</Tab>
			</Tabs>
		</section>
	);
}

export default {
	name: 'Core Custom actions',
	story,
};
