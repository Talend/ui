import React, { PropTypes } from 'react';
import TextareaWidget from 'react-jsonschema-form/lib/components/widgets/TextareaWidget';

function TextareaCodeWidget(props) {
	return <TextareaWidget {...props} />;
}
TextareaCodeWidget.displayName = 'TextareaCodeWidget';

let CodeWidget = TextareaWidget;
const SET_OPTIONS = {
	enableBasicAutocompletion: true,
	enableLiveAutocompletion: true,
	enableSnippets: true,
};
const DEFAULT_LANGUAGES = ['javascript', 'java', 'python', 'sql', 'json'];

try {
	const AceEditor = require('react-ace').default;

	try {
		require('brace/theme/monokai');
		require('brace/ext/language_tools');
	} catch (e) {
		console.log(e);
	}
	DEFAULT_LANGUAGES.forEach((lang) => {
		try {
			require(`brace/mode/${lang}`);
			require(`brace/snippets/${lang}`);
		} catch (e) {
			console.log(e);
		}
	});

	class AceCodeWidget extends React.Component {
		static displayName = 'AceCodeWidget';

		constructor(props) {
			super(props);
			this.onChange = this.onChange.bind(this);
			this.onLoad = this.onLoad.bind(this);
		}

		onChange(value) {
			if (this.props.onChange) {
				this.props.onChange(value);
			}
		}

		onLoad(event) {
			if (this.props.formContext.codeWidgetOnLoad) {
				this.props.formContext.codeWidgetOnLoad(event.env.editor);
			}
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
				console.error(`${options.language} language not supported`);
			}
			// allow override using
			const contextProps = this.props.formContext && this.props.formContext.codeWidgetProps;
			let setOptions = SET_OPTIONS;
			if (contextProps && contextProps.setOptions) {
				setOptions = Object.assign({}, SET_OPTIONS, contextProps.setOptions);
				delete contextProps.setOptions;
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
					enableSnippets
					value={value}
					theme="monokai"
					showGutter={false}
					showPrintMargin={false}
					{...contextProps}
				/>
			);
		}
	}
	CodeWidget = AceCodeWidget;
	if (process.env.NODE_ENV !== 'production') {
		AceCodeWidget.propTypes = {
			onChange: PropTypes.func,
			formContext: PropTypes.shape({
				codeWidgetProps: PropTypes.object,
				codeWidgetOnLoad: PropTypes.func,
			}),
			id: PropTypes.string,
			options: PropTypes.shape({
				language: PropTypes.string,
			}),
			value: PropTypes.string,
			disabled: PropTypes.bool,
			readonly: PropTypes.bool,
			autofocus: PropTypes.bool,
		};
	}
} catch (error) {
	console.warn('CodeWidget react-ace not found, fallback to TextareaWidget', TextareaWidget);
}

export default CodeWidget;
