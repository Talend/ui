import React from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import assetsApi from '@talend/assets-api';

/**
 * current main is the following file:
 * import '../basic-languages/monaco.contribution';
 * import '../language/css/monaco.contribution';
 * import '../language/html/monaco.contribution';
 * import '../language/json/monaco.contribution';
 * import '../language/typescript/monaco.contribution';
 * export * from './edcore.main';
 */

self.MonacoEnvironment = {
	getWorkerUrl: function (workerId, label) {
		// eslint-disable-next-line no-console
		console.log('Hello getWorkerUrl', label, workerId);
		return assetsApi.getURL(`${label || 'editor'}.worker.bundle.js`, '@talend/monaco-editor');
		// return './editor.worker.bundle.js';
	},
	globalAPI: true,
	baseUrl: () => {
		// eslint-disable-next-line no-console
		console.log('Hello baseUrl');
		return assetsApi.getURL('/', '@talend/monaco-editor');
	},
	getWorker: function getWorker(workerId, label) {
		// eslint-disable-next-line no-console
		console.log('Hello getWorker', workerId, label);
	},
};

const Monaco = React.forwardRef((props, ref) => {
	const [editor, setEditor] = React.useState(null);

	const editorRef = React.useCallback(node => {
		if (node !== null) {
			const ed = monaco.editor.create(node, {
				value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
				...props,
			});
			setEditor(ed);
			window.TalendMonaco = ed;
		}
	}, []);
	return <div ref={editorRef} />;
});
Monaco.displayName = 'TalendMonacoEditor';
export default Monaco;
