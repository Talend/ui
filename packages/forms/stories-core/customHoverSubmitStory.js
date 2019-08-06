import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { UIForm } from '../src/UIForm';

const schema = {
	jsonSchema: {
		type: 'object',
		title: 'Comment',
		properties: {
			name: {
				type: 'string',
			},
		},
		required: ['name'],
	},
	uiSchema: [
		{
			key: 'name',
			title: 'Name',
		},
	],
	properties: {
		name: 'Chuck Norris',
	},
};

const errors = schema.uiSchema.reduce((acc, current) => ({
	...acc,
	[current.key.split('.').join(',')]: 'There is an error',
}), {});

function UIFormWithOnSubmitHover(props) {
	const [hover, setHover] = useState(0);
	return (
		<div
			style={{
				margin: '-5px',
				padding: '5px',
				borderRadius: '5px',
				background: hover ? '#EFEFEF' : 'transparent',
			}}
		>
			<UIForm
				data={schema}
				onSubmit={action('onSubmit')}
				onSubmitEnter={(...args) => {
					action('onSubmitEnter')(...args);
					setHover(true);
				}}
				onSubmitLeave={(...args) => {
					action('onSubmitLeave')(...args);
					setHover(false);
				}}
				{...props}
			/>
		</div>
	);
}

function story() {
	return (
		<div>
			<h2>Hover submit handler</h2>
			<p>
				Submit can detect if mouse enters or leaves by using <code>onSubmitEnter</code> and{' '}
				<code>onSubmitLeave</code>
			</p>
			<UIFormWithOnSubmitHover />
		</div>
	);
}

function storyWithErrors() {
	return (
		<div>
			<h2>Hover submit handler with errors</h2>
			<p>
				Submit can detect if mouse enters or leaves by using <code>onSubmitEnter</code> and{' '}
				<code>onSubmitLeave</code> but it will never trigger <code>onSubmitEnter</code> since the form is{' '}
				invalid
			</p>
			<UIFormWithOnSubmitHover errors={errors} />
		</div>
	);
}

export default [
	{
		name: 'Core Concept hover submit',
		story,
	},
	{
		name: 'Core Concept hover submit with errors',
		story: storyWithErrors,
	},
];
