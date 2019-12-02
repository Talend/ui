import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { action } from '@storybook/addon-actions';
import IconsProvider from '@talend/react-components/lib/IconsProvider';
import { UIForm } from '../src/UIForm-v2/UIForm';
import Enumeration from '../src/UIForm-v2/UIForm/fields/Enumeration';
import { PRESIGNED_URL_TRIGGER_ACTION } from '../src/UIForm/fields/File/File.component';

const conceptsFilenames = require.context('./json/concepts', true, /.(js|json)$/);
const fieldsetsFilenames = require.context('./json/fieldsets', true, /.(js|json)$/);
const fieldsFilenames = require.context('./json/fields', true, /.(js|json)$/);

const sampleFilenameRegex = /^.\/(.*).js/;
const stories = [];

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function getFilteredCollection({ name, selection, certified, favorites, selected, orders }) {
	const methods = {
		asc: (a, b) => (a > b ? -1 : 1),
		desc: (a, b) => (a < b ? -1 : 1),
	};
	const collection = [
		{
			id: '0',
			name: 'Title with few actions',
			modified: 1442880000000,
			icon: 'talend-file-xls-o',
			author: 'First Author',
			flags: ['CERTIFIED', 'FAVORITE'],
		},
		{
			id: '1',
			name: 'Title with lot of actions',
			modified: 1537574400000,
			icon: 'talend-file-xls-o',
			author: 'Second Author',
		},
		{
			id: '2',
			name: 'Title with persistant actions',
			modified: 1474502400000,
			author: 'Jean-Pierre DUPONT',
			icon: 'talend-file-xls-o',
			flags: ['FAVORITE'],
		},
		{
			id: '3',
			name: 'Title with icon',
			modified: 1506038400000,
			author: 'Third Author',
			icon: 'talend-file-xls-o',
			flags: ['CERTIFIED'],
		},
		{
			id: '4',
			name: 'Title in input mode',
			modified: 1506038400000,
			author: 'Jean-Pierre DUPONT',
			icon: 'talend-file-xls-o',
		},
		{
			id: '5',
			name: 'Title with long long long long long long long long long long long text',
			modified: 1547478328552,
			author: 'Jean-Pierre DUPONT with super super super long text',
			icon: 'talend-file-xls-o',
			flags: ['CERTIFIED', 'FAVORITE'],
		},
	];

	let c = collection;

	if (name) {
		c = c.filter(item => item.name.includes(name));
	}
	if (certified) {
		c = c.filter(item => item.flags && item.flags.includes('CERTIFIED'));
	}
	if (favorites) {
		c = c.filter(item => item.flags && item.flags.includes('FAVORITE'));
	}
	if (selection) {
		c = c.filter(item => selected.includes(item.id));
	}

	if (orders) {
		if (orders.name) {
			c = c.sort((a, b) => methods[orders.name](a.name, b.name));
		}
		if (orders.date) {
			c = c.sort((a, b) => methods[orders.date](a.modified, b.modified));
		}
	}

	return c;
}

function createCommonProps(tab) {
	return {
		autocomplete: 'off',
		// onBlur: action('Blur'),
		customValidation(schema, value, properties) {
			action('customValidation')(schema, value, properties);
			return value.length >= 5 && 'Custom validation : The value should be less than 5 chars';
		},
		formName: `my-form-${tab}`,
		onChange: action('Change'),
		onTrigger(event, payload) {
			action('Trigger')(event, payload);
			const schema = payload.schema;
			const key = schema.key && schema.key[schema.key.length - 1];
			if (key && key.includes('fail')) {
				return Promise.reject({ errors: { [schema.key]: 'This trigger has failed' } });
			}

			if (key && (key.includes('asyncTitleMap') || key.includes('AsyncTitleMap'))) {
				return new Promise(resolve => {
					setTimeout(
						() =>
							resolve({
								titleMap: [
									{ value: 'clafoutis', name: 'Clafoutis aux poires et aux fruits' },
									{ value: 'conchiglioni-au-thon', name: 'Conchiglioni au thon' },
									{ value: 'coquillettes-crevettes', name: 'coquillettes aux crevettes' },
									{ value: 'crumble', name: 'Crumble a la danette' },
									{ value: 'pomme-savane', name: 'Pomme savane' },
									{ value: 'tarte-au-citron', name: 'Tarte  au citron' },
								],
							}),
						3000,
					);
				});
			}

			if (key === 'datasetId' && payload.trigger.onEvent === 'filter') {
				return new Promise(resolve => {
					setTimeout(
						() =>
							resolve({
								collection: getFilteredCollection(payload.filters),
							}),
						3000,
					);
				});
			}
			if (key === 'datasetId' && payload.trigger.onEvent === 'change') {
				return Promise.resolve({
					properties: properties => {
						const { datasetId, name } = properties;
						return name && name.length
							? properties
							: {
									...properties,
									name: datasetId && `Resource ${datasetId} preparation`,
							  };
					},
					errors: errors => {
						const e = { ...errors };
						delete e.name;
						return e;
					},
				});
			}
			if (
				key &&
				key.startsWith('file') &&
				payload.trigger &&
				payload.trigger.action === PRESIGNED_URL_TRIGGER_ACTION &&
				payload.trigger.onEvent === 'change'
			) {
				const { name } = event.target.files[0];
				return new Promise(resolve => {
					setTimeout(
						() =>
							resolve({
								properties: properties => ({
									...properties,
									[key]: `${uuid.v4()}.${btoa(name)}`,
								}),
							}),
						3000,
					);
				});
			}

			return Promise.resolve({});
		},
		onReset: action('onReset'),
		onSubmit: action('Submit'),
	};
}

class DisplayModeForm extends React.Component {
	static propTypes = {
		category: PropTypes.string,
		doc: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {};
		this.toggleDisplayModeText = this.toggleDisplayModeText.bind(this);
	}

	toggleDisplayModeText(event) {
		this.setState({ displayMode: event.target.checked ? 'text' : undefined });
	}

	render() {
		return (
			<section>
				<IconsProvider />
				{this.props.doc && (
					<a
						href={`https://github.com/Talend/ui/tree/master/packages/forms/src/UIForm/${this.props.category}/${this.props.doc}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						Documentation
					</a>
				)}
				<form>
					<div className="form-group">
						<div className="checkbox">
							<label>
								<input
									type="checkbox"
									checked={this.state.displayMode === 'text'}
									onChange={this.toggleDisplayModeText}
								/>
								Text mode
							</label>
						</div>
					</div>
				</form>

				<hr style={{ borderColor: 'black' }} />

				<UIForm
					{...this.props}
					displayMode={this.state.displayMode}
					widgets={{ enumeration: Enumeration }}
				/>
			</section>
		);
	}
}

function createStory(category, sampleFilenames, filename) {
	const sampleNameMatches = filename.match(sampleFilenameRegex);
	const sampleName = sampleNameMatches[sampleNameMatches.length - 1];
	const name = capitalizeFirstLetter(sampleName);

	return {
		category,
		name,
		story() {
			const { doc, ...data } = sampleFilenames(filename);
			return (
				<DisplayModeForm
					{...createCommonProps('state')}
					data={data}
					doc={doc}
					category={category}
				/>
			);
		},
	};
}

conceptsFilenames.keys().forEach(filename => {
	stories.push(createStory('concepts', conceptsFilenames, filename));
});

fieldsetsFilenames.keys().forEach(filename => {
	stories.push(createStory('fieldsets', fieldsetsFilenames, filename));
});

fieldsFilenames.keys().forEach(filename => {
	stories.push(createStory('fields', fieldsFilenames, filename));
});

export default stories;
