import React from 'react';
import MonacoEditor from 'react-monaco-editor';
// import * as monaco from 'monaco-editor';

self.MonacoEnvironment = {
	getWorkerUrl: function (moduleId, label) {
		// eslint-disable-next-line no-console
		console.log('Hello world', label, moduleId);
		if (label === 'json') {
			return './json.worker.bundle.js';
		}
		if (label === 'css' || label === 'scss' || label === 'less') {
			return './css.worker.bundle.js';
		}
		if (label === 'html' || label === 'handlebars' || label === 'razor') {
			return './html.worker.bundle.js';
		}
		if (label === 'typescript' || label === 'javascript') {
			return './ts.worker.bundle.js';
		}
		return './editor.worker.bundle.js';
	},
};

export default function Monaco(props) {
	return <MonacoEditor {...props} />;
}
