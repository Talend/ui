import { storiesOf } from '@storybook/react';

import jsonStories from './jsonStories';
import layouts from './layouts';
import customTemplateStory from './customTemplateStory';
import customWidgetStory from './customWidgetStory';
import customActionsStory from './customActionsStory';
import customUpdating from './customUpdating';
import customDisplayMode from './customDisplayMode';

const coreConceptsStories = storiesOf('Core concepts', module);

const coreFieldsetsStories = storiesOf('Core fieldsets', module);

const coreFieldsStories = storiesOf('Core fields', module);

const oldStories = storiesOf('Migration', module);

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
coreConceptsStories.add(customUpdating.name, customUpdating.story);
coreConceptsStories.add(customDisplayMode.name, customDisplayMode.story);
