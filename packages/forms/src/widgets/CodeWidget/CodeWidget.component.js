import React, { PropTypes } from 'react';
import TextareaWidget from 'react-jsonschema-form/lib/components/widgets/TextareaWidget';

let AceEditor = (props) => <textarea {...props} />;
let hasAce = false;
const DEFAULT_LANGUAGES = ['javascript', 'java', 'python'];

try {
	AceEditor = require('react-ace').default;
	DEFAULT_LANGUAGES.forEach(lang => {
		require(`brace/mode/${lang}`);
		require(`brace/snippets/${lang}`);
	});
	hasAce = true;
} catch(error) {
	console.warn('CodeWidget react-ace not found, fallback to TextareaWidget', TextareaWidget);
}

export class AceCodeWidget extends React.Component {
	static displayName = 'AceCodeWidget';
	static propTypes = {
		name: PropTypes.string,
	};

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
		console.log(options);
		if (options && options.language && DEFAULT_LANGUAGES.indexOf(options.language) === -1) {
			require(`brace/mode/${options.language}`);
		}
		return (
			<AceEditor
				autofocus={autofocus}
				id={id}
				mode={options && options.language}
				onLoad={this.onLoad}
				onChange={this.onChange}
				readOnly={readonly}
				disabled={disabled}
				className="form-control"
				enableBasicAutocompletion
				enableLiveAutocompletion
				enableSnippets
				showLineNumbers
				value={value}
			/>
		);
	}
}

export function TextareaCodeWidget(props) {
	return <TextareaWidget {...props}/>;
}
TextareaCodeWidget.displayName = 'TextareaCodeWidget';

let CodeWidget;

if (hasAce) {
	CodeWidget = AceCodeWidget;
} else {
	CodeWidget = TextareaCodeWidget;
}

export default CodeWidget;
