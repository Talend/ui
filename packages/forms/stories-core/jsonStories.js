import React from 'react';
import { action } from '@storybook/addon-actions';
import { object } from '@storybook/addon-knobs';
import IconsProvider from '@talend/react-components/lib/IconsProvider';
import { UIForm } from '../src/UIForm';

const conceptsFilenames = require.context('./json/concepts', true, /.(js|json)$/);
const fieldsetsFilenames = require.context('./json/fieldsets', true, /.(js|json)$/);
const fieldsFilenames = require.context('./json/fields', true, /.(js|json)$/);
const oldFilenames = require.context('../stories/json', true, /.(js|json)$/);

const sampleFilenameRegex = /^.\/(.*).js/;
const stories = [];

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
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
			return Promise.resolve({});
		},
		onReset: action('onReset'),
		onSubmit: action('Submit'),
	};
}

class DisplayModeForm extends React.Component {
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
			<div>
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

				<UIForm {...this.props} displayMode={this.state.displayMode} />
			</div>
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
			const { doc, ...data } = object(name, sampleFilenames(filename));
			return (
				<section>
					<IconsProvider />
					{doc && (
						<a
							href={`https://github.com/Talend/ui/tree/master/packages/forms/src/UIForm/${category}/${doc}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							Documentation
						</a>
					)}
					<DisplayModeForm {...createCommonProps('state')} data={data} />
				</section>
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

oldFilenames.keys().forEach(filename => {
	stories.push(createStory('old', oldFilenames, filename));
});

export default stories;
