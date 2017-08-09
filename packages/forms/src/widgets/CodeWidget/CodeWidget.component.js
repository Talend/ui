import React, { PropTypes } from 'react';
import TextareaWidget from 'react-jsonschema-form/lib/components/widgets/TextareaWidget';

function TextareaCodeWidget(props) {
	return <TextareaWidget {...props} />;
}
TextareaCodeWidget.displayName = 'TextareaCodeWidget';

let CodeWidget = TextareaWidget;

try {
	const DEFAULT_LANGUAGES = ['javascript', 'java', 'python'];
	const AceEditor = require('react-ace').default;
	try {
		require('brace/theme/monokai');
		require('brace/ext/language_tools');
	} catch (e) {}
	DEFAULT_LANGUAGES.forEach(lang => {
		try {
			require(`brace/mode/${lang}`);
			require(`brace/snippets/${lang}`);
		} catch(e) {}
	});
	const setOptions = {
		enableBasicAutocompletion: true,
		enableLiveAutocompletion: true,
		enableSnippets: true,
	};

	class AceCodeWidget extends React.Component {
		static displayName = 'AceCodeWidget';

		constructor(props) {
			super(props);
			this.onChange = this.onChange.bind(this);
			this.onLoad = this.onLoad.bind(this);
		}

		/**
		 * ACE editor has an onchange quite different
		 * this re-map the change to a more form stuff
		 * @param  {String} value     the old value
		 * @param  {Object} operation {"start":{"row":1,"column":0},"end":{"row":2,"column":0},"action":"insert","lines":["",""]}
		 */
		onChange(value, operation) {
			if (this.props.onChange) {
				this.props.onChange(value);
			}
		}

		onLoad(event, arg2) {
			this.editor = event.env.editor;
		}

		render() {
			const {
				id,
				options,
				value,
				disabled,
				readonly,
				autofocus,
			} = this.props;
			if (options && options.language && DEFAULT_LANGUAGES.indexOf(options.language) === -1) {
				try {
					require(`brace/mode/${options.language}`);
				} catch (e) {
					console.error(e);
				}
			}

			return (
				<AceEditor
					className="tf-widget-code form-control"
					focus={autofocus || false}
					name={id}
					width="auto"
					mode={options && options.language}
					onLoad={this.onLoad}
					onChange={this.onChange}
					readOnly={readonly}
					disabled={disabled}
					setOptions={setOptions}
					theme="monokai"
					enableSnippets
					showLineNumbers
					value={value}
				/>
			);
		}
	}
	CodeWidget = AceCodeWidget;
	CodeWidget.displayName = 'AceEditorCodeWidget';
} catch (error) {
	console.warn('CodeWidget react-ace not found, fallback to TextareaWidget', TextareaWidget);
}
export default CodeWidget;
