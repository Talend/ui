import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import assetsApi from '@talend/assets-api';

window.MonacoEnvironment = {
	getWorkerUrl: function (moduleId, label) {
		// eslint-disable-next-line no-console
		console.log('Hello world', label, moduleId);
		return assetsApi.getURL(`${label || 'editor'}.worker.bundle.js`, '@talend/monaco-editor');
		// return './editor.worker.bundle.js';
	},
};

const Monaco = React.forwardRef((props, ref) => {
	return <MonacoEditor ref={ref} {...props} />;
});
Monaco.displayName = 'TalendMonacoEditor';
export default Monaco;
