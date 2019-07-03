import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';

import jsonStories from './jsonStories';
import playgroundStory from './playgroundStory';
import layouts from './layouts';
import customTemplateStory from './customTemplateStory';
import customWidgetStory from './customWidgetStory';
import customActionsStory from './customActionsStory';
import customUpdating from './customUpdating';
import customErrors from './customErrors';
import customDisplayMode from './customDisplayMode';
import customHoverSubmitStory from './customHoverSubmitStory';

const coreConceptsStories = storiesOf('Core concepts', module).addDecorator(story => (
	<I18nextProvider i18n={i18n}>{story()}</I18nextProvider>
));

const coreFieldsetsStories = storiesOf('Core fieldsets', module);

const coreFieldsStories = storiesOf('Core fields', module);

const playground = storiesOf('Playground', module);
playground.addDecorator(withKnobs);
playground.add(playgroundStory.name, playgroundStory.story);

const layout = storiesOf('Layout', module);
layouts.forEach(info => layout.add(info.name, info.story, info.options));

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

coreConceptsStories.add(customTemplateStory.name, customTemplateStory.story);
coreConceptsStories.add(customWidgetStory.name, customWidgetStory.story);
coreConceptsStories.add(customActionsStory.name, customActionsStory.story);
coreConceptsStories.add(customUpdating.name, customUpdating.story);
coreConceptsStories.add(customErrors.name, customErrors.story);
coreConceptsStories.add(customDisplayMode.name, customDisplayMode.story);
coreConceptsStories.add(customHoverSubmitStory.name, customHoverSubmitStory.story);
