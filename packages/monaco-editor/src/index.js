/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { registerLanguage } from 'monaco-editor/esm/vs/basic-languages/_.contribution.js';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { languages } from 'monaco-editor/esm/metadata';
import assetsApi from '@talend/assets-api';

if (window && !window.TalendMonacoEditorAPI) {
	window.TalendMonacoEditorAPI = monaco;
}

const basicLanguage = languages.map(i => i.label);
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
		console.log('### Hello getWorkerUrl', label, workerId);
		return assetsApi.getURL(`${label || 'editor'}.worker.bundle.js`, '@talend/monaco-editor');
		// return './editor.worker.bundle.js';
	},
	globalAPI: true,
	baseUrl: () => {
		// eslint-disable-next-line no-console
		console.log('### Hello baseUrl');
		return assetsApi.getURL('/', '@talend/monaco-editor');
	},
	getWorker: function getWorker(workerId, label) {
		// eslint-disable-next-line no-console
		console.log('### Hello getWorker', workerId, label);
	},
};

basicLanguage.forEach(lng => {
	const src = assetsApi.getURL(`/dist/languages/${lng}.js`);
	registerLanguage({
		id: lng,
		// extensions: ['.py', '.rpy', '.pyw', '.cpy', '.gyp', '.gypi'],
		aliases: [lng],
		firstLine: '^#!/.*\\bpython[0-9.-]*\\b',
		loader: () => {
			return new Promise((resolve, reject) => {
				const onload = () => {
					const value = window.TalendMonacoEditor.languages[lng];
					if (value) {
						const mod = toLanguageMod(value);
						resolve(mod);
					}
					reject(new Error(`fail to load monaco ${lng}`));
				};
				assetsApi.addScript({ src, onload });
			});
		},
	});
});

function toLanguageMod(mod) {
	return Object.create(null, {
		conf: {
			value: mod.conf,
			enumerable: true,
		},
		language: {
			value: mod.language,
			enumerable: true,
		},
		__esModule: {
			value: true,
		},
		[Symbol.toStringTag]: {
			value: 'Module',
		},
	});
}

const Monaco = React.forwardRef((props, ref) => {
	const [editor, setEditor] = React.useState(null);
	const [loaded, setLoaded] = React.useState({});
	const editorRef = React.useCallback(node => {
		if (node !== null) {
			console.log('#create editor instance');
			const ed = monaco.editor.create(node, {
				...props,
			});
			setEditor(ed);
			// window.TalendMonaco = ed;
		}
	}, []);

	// React.useEffect(() => {
	// 	if (!props.language) {
	// 		return;
	// 	}
	// 	if (basicLanguage.includes(props.language) && !loaded[props.language]) {
	// 		if (window.TalendMonacoEditor.languages[props.language]) {
	// 			setLoaded({ ...loaded, [props.language]: true });
	// 			return;
	// 		}
	// 		const src = assetsApi.getURL(`/dist/languages/${props.language}.js`);
	// 		onload = () => {
	// 			const value = window.TalendMonacoEditor.languages[props.language];
	// 			if (value) {
	// 				const mod = toLanguageMod(value);
	// 				console.log('### onload mod', mod);
	// 				registerLanguage({
	// 					id: props.language,
	// 					// extensions: ['.py', '.rpy', '.pyw', '.cpy', '.gyp', '.gypi'],
	// 					aliases: [props.language],
	// 					firstLine: '^#!/.*\\bpython[0-9.-]*\\b',
	// 					loader: () => {
	// 						console.log('## call loader');

	// 						return new Promise(resolve => {
	// 							setTimeout(() => {
	// 								console.log('## return from loader ', props.language, mod);
	// 								resolve(mod);
	// 							}, 100);
	// 						});
	// 					},
	// 				});
	// 				setLoaded({ ...loaded, [props.language]: true });
	// 			}
	// 		};
	// 		assetsApi.addScript({ src, onload });
	// 	} else if (props.loadLanguage) {
	// 		props.loadLanguage(props.language);
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [props.language]);
	const style = {
		width: props.width || '100%',
		height: props.height || '200px',
	};
	return <div ref={editorRef} style={style} />;
});

Monaco.displayName = 'TalendMonacoEditor';

Monaco.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
};
Monaco.registerLanguage = registerLanguage;
Monaco.api = monaco;
export default Monaco;
