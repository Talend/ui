import React from 'react';

import a11y from 'react-a11y';

import { storiesOf, action } from '@kadira/storybook';
import { withKnobs, object } from '@kadira/storybook-addon-knobs';

import { Well } from 'react-bootstrap';

import Form from '../src/Form';

a11y(React);

storiesOf('Form', module)
	.addDecorator(withKnobs)
	.addDecorator(story => (
		<div
			className="container-fluid"
		>
			<div
				className="col-md-offset-1 col-md-10"
				style={{ marginTop: '20px', marginBottom: '20px' }}
			>
				<Well>
					{story()}
				</Well>
			</div>
		</div>
	))
	.addWithInfo('Simple', () => {
		const simple = require('json!./json/simple.json');

		return (
			<Form
				data={object('Simple', simple)}
				onSubmit={action('submit')}
			/>
		);
	})
	.addWithInfo('Nested', () => {
		const nested = require('json!./json/nested.json');

		return (
			<Form
				data={object('Nested', nested)}
				onSubmit={action('submit')}
			/>
		);
	})
	.addWithInfo('Arrays', () => {
		const arrays = require('json!./json/arrays.json');

		return (
			<Form
				data={object('Arrays', arrays)}
				onSubmit={action('submit')}
			/>
		);
	})
	.addWithInfo('Numbers', () => {
		const numbers = require('json!./json/numbers.json');

		return (
			<Form
				data={object('Numbers', numbers)}
				onSubmit={action('submit')}
			/>
		);
	})
	.addWithInfo('Widgets', () => {
		const widgets = require('json!./json/widgets.json');

		return (
			<Form
				data={object('Widgets', widgets)}
				onSubmit={action('submit')}
			/>
		);
	})
	.addWithInfo('Ordering', () => {
		const ordering = require('json!./json/ordering.json');

		return (
			<Form
				data={object('Ordering', ordering)}
				onSubmit={action('submit')}
			/>
		);
	})
	.addWithInfo('References', () => {
		const references = require('json!./json/references.json');

		return (
			<Form
				data={object('References', references)}
				onSubmit={action('submit')}
			/>
		);
	})
	.addWithInfo('Errors', () => {
		const errors = require('json!./json/errors.json');

		return (
			<Form
				data={object('Errors', errors)}
				onSubmit={action('submit')}
			/>
		);
	})
	.addWithInfo('Large', () => {
		const large = require('json!./json/large.json');

		return (
			<Form
				data={object('Large', large)}
				onSubmit={action('submit')}
			/>
		);
	})
	.addWithInfo('Date & time', () => {
		const date = require('json!./json/date.json');

		return (
			<Form
				data={object('Date', date)}
				onSubmit={action('submit')}
			/>
		);
	})
	.addWithInfo('Files', () => {
		const files = require('json!./json/files.json');

		return (
			<Form
				data={object('Files', files)}
				onSubmit={action('submit')}
			/>
		);
	});
