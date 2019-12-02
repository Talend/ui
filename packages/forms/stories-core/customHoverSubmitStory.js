import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { UIForm } from '../src/UIForm-v2/UIForm';

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

function UIFormWithOnSubmitHover() {
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

export default {
	name: 'Core Concept hover submit',
	story,
};
