import React from 'react';
import ReactDOM from 'react-dom';
import a11y from 'react-a11y';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import Well from 'react-bootstrap/lib/Well';

import { createStore, combineReducers } from 'redux';
import { formReducer } from '../src/UIForm';

import jsonStories from './jsonStories';
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
	default:
		console.error(`No category ${category} found for story ${name}`);
	}
});

coreConceptsStories.add(customWidgetStory.name, customWidgetStory.story);
coreConceptsStories.add(customActionsStory.name, customActionsStory.story);
