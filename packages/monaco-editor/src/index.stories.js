import React from 'react';
import Monaco from './';

export default {
	title: 'Example/Monaco',
	component: Monaco,
	args: {
		theme: 'vs-light',
	},
};

const Template = args => {
	if (!window.TalendMonacoEditor) {
		window.TalendMonacoEditor = Monaco;
		window.TalendMonacoEditor.languages = {};
	}
	return <Monaco {...args} />;
};

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing

export const DefaultStory = Template.bind({});
DefaultStory.args = {
	value: 'print("This line will be printed.")',
	language: 'python',
};
export const LazyStory = Template.bind({});
LazyStory.args = {
	value: 'SELECT * from MATABLE;',
	language: 'sql',
};
