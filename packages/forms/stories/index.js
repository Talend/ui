import React from 'react';
import ReactDOM from 'react-dom';
import a11y from 'react-a11y';
import { Provider } from 'react-redux';
import { storiesOf, action } from '@kadira/storybook';
import { withKnobs, object } from '@kadira/storybook-addon-knobs';
import { Tabs, Tab } from 'react-bootstrap';

import Well from 'react-bootstrap/lib/Well';
import IconsProvider from 'react-talend-components/lib/IconsProvider';

import { createStore, combineReducers } from 'redux';
import { UIForm, ConnectedUIForm, formReducer } from '../src/UIForm';

const reducers = { forms: formReducer };

const reducer = combineReducers(reducers);
const store = createStore(reducer);

a11y(ReactDOM);

const decoratedStories = storiesOf('Form', module)
	.addDecorator(withKnobs)
	.addDecorator(story => (
		<Provider store={store}>
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
		</Provider>
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
			const props = {
				autocomplete: 'off',
				// onBlur: action('Blur'),
				customValidation(schema, value, properties) {
					action('customValidation')(schema, value, properties);
					return value.length >= 5 &&
						'Custom validation : The value should be less than 5 chars';
				},
				formName: 'my-form',
				onChange: action('Change'),
				onTrigger(type, schema, value, properties) {
					action('Trigger')(type, schema, value, properties);
					const key = schema.key[schema.key.length - 1];
					return key.includes('fail') ?
						Promise.reject({ errors: { [schema.key]: 'This trigger has failed' } }) :
						Promise.resolve({});
				},
				onSubmit: action('Submit'),
			};
			decoratedStories.add(capitalizedSampleName, () => (
				<section>
					<IconsProvider />

					<Tabs>
						<Tab
							eventKey={0}
							key={'without'}
							title={'State'}
						>
							<UIForm
								{...props}
								data={object(capitalizedSampleName, sampleFilenames(filename))}
							/>
						</Tab>
						<Tab
							eventKey={1}
							key={'with'}
							title={'Redux'}
						>
							<ConnectedUIForm
								{...props}
								data={object(capitalizedSampleName, sampleFilenames(filename))}
							/>
						</Tab>
					</Tabs>
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
		uiSchema: [
			{
				key: 'list',
				type: 'unknown',
			},
		],
	};
	return (
		<UIForm widgets={widgets} data={schema} />
	);
});
