import React from 'react';
import a11y from 'react-a11y';

import { Well } from 'react-bootstrap';
import { storiesOf, action } from '@kadira/storybook';
import { withKnobs, object } from '@kadira/storybook-addon-knobs';

import Form from '../src/Form';

a11y(React);

storiesOf('Form', module)
	.addDecorator(withKnobs)
	.addDecorator((story) => (
		<Well>
			{story()}
		</Well>
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
	.addWithInfo('Numbers', () => {
		const numbers = require('json!./json/numbers.json');

		return (
			<Form
				data={object('Numbers', numbers)}
				onSubmit={action('submit')}
			/>
		);
	});
