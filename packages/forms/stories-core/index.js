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

jsonStories.forEach(({ name, story }) => {
	decoratedStories.add(name, story);
});
decoratedStories.add(customWidgetStory.name, customWidgetStory.story);
decoratedStories.add(customActionsStory.name, customActionsStory.story);
