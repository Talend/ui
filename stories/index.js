import React from 'react';

import a11y from 'react-a11y';

import { storiesOf, action } from '@kadira/storybook';
import { withKnobs, object } from '@kadira/storybook-addon-knobs';

import Well from 'react-bootstrap/lib/Well';

import Form from '../src/Form';

a11y(React);

const decoratedStories = storiesOf('Form', module)
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
	));

const capitalizeFirstLetter =
	string => string.charAt(0).toUpperCase() + string.slice(1);

const sampleFilenames = require.context('./json', true, /.json$/);

const sampleFilenameRegex = /^.\/(.*).json$/;

sampleFilenames
	.keys()
	.forEach(
		filename => {
			const sampleNameMatches = filename.match(sampleFilenameRegex);
			const sampleName = sampleNameMatches[sampleNameMatches.length - 1];
			const capitalizedSampleName = capitalizeFirstLetter(sampleName);
			decoratedStories.add(capitalizedSampleName, () => (
				<Form
					autocomplete='off'
					data={object(capitalizedSampleName, sampleFilenames(filename))}
					onChange={action('Change')}
					onSubmit={action('Submit')}
				/>
			));
		});

decoratedStories.add('Multiple actions', () => {
	const actions = [{
		style: 'link',
		onClick: action('CANCEL'),
		type: 'button',
		label: 'CANCEL',
	}, {
		style: 'primary',
		type: 'submit',
		label: 'VALIDATE',
	}];
	const schema = {
		jsonSchema: {
			title: 'Please select a datastore',
			type: 'string',
			enum: ['one', 'two', 'three'],
			enumNames: ['One', 'Two', 'Three'],
		},
	};
	return (
		<Form
			data={schema}
			onSubmit={action('VALIDATE')}
			actions={actions}
		/>
	);
});
