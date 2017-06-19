import React from 'react';
import ReactDOM from 'react-dom';
import a11y from 'react-a11y';

import { storiesOf, action } from '@kadira/storybook';
import { withKnobs, object } from '@kadira/storybook-addon-knobs';

import Well from 'react-bootstrap/lib/Well';
import IconsProvider from 'react-talend-components/lib/IconsProvider';

import Form from '../src/Form';

a11y(ReactDOM);

const decoratedStories = storiesOf('Form', module)
	.addDecorator(withKnobs)
	.addDecorator(story => (
		<div className="container-fluid">
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

const sampleFilenames = require.context('./json', true, /.(js|json)$/);

const sampleFilenameRegex = /^.\/(.*).js/;

sampleFilenames
	.keys()
	.forEach(
		(filename) => {
			const sampleNameMatches = filename.match(sampleFilenameRegex);
			const sampleName = sampleNameMatches[sampleNameMatches.length - 1];
			const capitalizedSampleName = capitalizeFirstLetter(sampleName);
			decoratedStories.add(capitalizedSampleName, () => (
				<section>
					<IconsProvider />
					<Form
						autocomplete="off"
						data={object(capitalizedSampleName, sampleFilenames(filename))}
						onChange={action('Change')}
						onBlur={action('Blur')}
						onSubmit={action('Submit')}
					/>
				</section>
			));
		});

decoratedStories.add('Multiple actions', () => {
	const actions = [
		{
			name: 'cancel',
			style: 'link',
			onClick: action('CANCEL'),
			type: 'button',
			label: 'CANCEL',
		},
		{
			name: 'other',
			type: 'button',
			label: 'Other Button',
			onClick: action('OTHER'),
			tooltip: true,
		},
		{
			style: 'primary',
			type: 'submit',
			label: 'VALIDATE',
			inProgress: true,
			onClick: action('INPROGRESS'),
		},
		{
			style: 'primary',
			type: 'submit',
			label: 'VALIDATE',
			onClick: action('VALIDATE'),
		},
		{
			style: 'primary',
			type: 'submit',
			label: 'SUBMIT',
			disabled: true,
			onClick: action('SUBMIT'),
		},
	];
	const schema = {
		jsonSchema: {
			title: 'Please select a datastore',
			type: 'object',
			properties: {
				num: {
					type: 'string',
					enum: ['one', 'two', 'three'],
					enumNames: ['One', 'Two', 'Three'],
				},
			},
		},
	};
	return (
		<Form
			data={schema}
			onSubmit={action('SUBMIT')}
			actions={actions}
		/>
	);
});

decoratedStories.add('Datalist', () => {
	function fetchItems() {
		return [
			'Auklet',
			'Cormorant',
			'Falcon',
			'Goldfinch',
			'Magpie',
			'Pewee',
		];
	}
	const schema = {
		jsonSchema: {
			title: 'A simple typeahead',
			description: 'A simple typeahead widget example.',
			type: 'object',
			required: [
				'fullDatalist',
				'select1',
			],
			definitions: {
				datalist: {
					type: 'string',
					enum: [
						'Apple',
						'Pine[apple]',
						'Banana',
						'Cher[ry',
						'Lemo}n',
						'Grapefruit',
					],
				},
			},
			properties: {
				select1: {
					$ref: '#/definitions/datalist',
				},
				fullDatalist: {
					$ref: '#/definitions/datalist',
				},
				remoteDataList: {
					type: 'string',
				},
			},
		},
		uiSchema: {
			remoteDataList: {
				'ui:widget': 'datalist',
			},
			fullDatalist: {
				'ui:widget': 'datalist',
				'ui:options': {
					restricted: true,
				},
			},
			'ui:order': [
				'select1',
				'fullDatalist',
				'remoteDataList',
			],
		},
		properties: {
			fullDatalist: 'Apple',
		},
	};

	return (
		<Form
			data={schema}
			formContext={{ fetchItems }}
			onChange={action('CHANGE')}
			onSubmit={action('SUBMIT')}
		/>
	);
});

const UnknownWidget = (props) => {
	const { value } = props;

	return (
		<div className="panel panel-info">
			<div className="panel-heading">
				<h3 className="panel-title">Custom widget</h3>
			</div>
			<div className="panel-body">
				Form was instantiated with a custom widget to display its selected value <code>{value}</code>.
			</div>
		</div>
	);
};

UnknownWidget.propTypes = {
	value: React.PropTypes.string,
};

decoratedStories.add('Custom widget', () => {
	const widgets = {
		unknown: UnknownWidget,
	};
	const schema = {
		jsonSchema: {
			title: 'Unknown widget',
			type: 'object',
			properties: {
				list: {
					type: 'string',
					enum: ['one', 'two', 'three'],
					enumNames: ['One', 'Two', 'Three'],
				},
			},
		},
		properties: {
			list: 'two',
		},
		uiSchema: {
			list: {
				'ui:widget': 'unknown',
			},
		},
	};
	return (
		<Form
			data={schema}
			widgets={widgets}
			onSubmit={action('SUBMIT')}
		/>
	);
});

decoratedStories.add('Form Children', () => {
	const schema = {
		jsonSchema: {
			title: 'Form with children',
			type: 'object',
			properties: {
				test: {
					title: 'Test title',
					type: 'string',
				},
			},
		},
		uiSchema: {},
		properties: {
			test: 'test',
		},
	};
	return (
		<Form data={schema} onSubmit={action('SUBMIT')}>
			<h1>Child</h1>
			<p>This is an inner child in the form</p>
		</Form>
	);
});
