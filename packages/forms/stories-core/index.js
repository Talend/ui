import React from 'react';
import ReactDOM from 'react-dom';
import a11y from 'react-a11y';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import Well from 'react-bootstrap/lib/Well';

import { createStore, combineReducers } from 'redux';

import { I18nextProvider } from 'react-i18next';
import i18n from './../stories/config/i18n';

import { formReducer } from '../src/UIForm';

import jsonStories from './jsonStories';
import customTemplateStory from './customTemplateStory';
import customWidgetStory from './customWidgetStory';
import customActionsStory from './customActionsStory';

// integrate widget code
import 'brace/theme/monokai';
import 'brace/ext/language_tools';
import 'brace/mode/python';
import 'brace/snippets/python';

const reducers = { forms: formReducer };
const reducer = combineReducers(reducers);
const store = createStore(reducer);

a11y(ReactDOM);

const forStoryDecorator = story => (
	<I18nextProvider i18n={i18n}>
	<Provider store={store}>
		<div className="container-fluid">
			<nav style={{ position: 'fixed', bottom: 0, width: '100vw', textAlign: 'center', zIndex: 1 }}>
				<div className="btn-group">
					<button className="btn" onClick={() => i18n.changeLanguage('en')}>Default (en)</button>
					<button className="btn" onClick={() => i18n.changeLanguage('fr')}>fr</button>
					<button className="btn" onClick={() => i18n.changeLanguage('it')}>it</button>
				</div>
			</nav>
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
	</I18nextProvider>
);

const coreConceptsStories = storiesOf('Core concepts', module)
	.addDecorator(withKnobs)
	.addDecorator(forStoryDecorator);

const coreFieldsetsStories = storiesOf('Core fieldsets', module)
	.addDecorator(withKnobs)
	.addDecorator(forStoryDecorator);

const coreFieldsStories = storiesOf('Core fields', module)
	.addDecorator(withKnobs)
	.addDecorator(forStoryDecorator);

const oldStories = storiesOf('Migration', module)
	.addDecorator(withKnobs)
	.addDecorator(forStoryDecorator);

jsonStories.forEach(({ category, name, story }) => {
	switch (category) {
		case 'concepts':
			coreConceptsStories.add(name, story);
			break;
		case 'fieldsets':
			coreFieldsetsStories.add(name, story);
			break;
		case 'fields':
			coreFieldsStories.add(name, story);
			break;
		case 'old':
			oldStories.add(name, story);
			break;
		default:
			console.error(`No category ${category} found for story ${name}`);
	}
});

coreConceptsStories.add(customTemplateStory.name, customTemplateStory.story);
coreConceptsStories.add(customWidgetStory.name, customWidgetStory.story);
coreConceptsStories.add(customActionsStory.name, customActionsStory.story);
