import React from 'react';
import assetsApi from '@talend/assets-api';
import Monaco from './';

// const Monaco = React.lazy(() =>
// 	assetsApi.getUMD('@talend/monaco-editor').then(mod => assetsApi.toDefaultModule(mod)),
// );

export default {
	title: 'Monaco',
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

export const Python = Template.bind({});
Python.args = {
	value: 'print("This line will be printed.")',
	language: 'python',
};
export const SQL = Template.bind({});
SQL.args = {
	value: 'SELECT * from MATABLE;',
	language: 'sql',
};
