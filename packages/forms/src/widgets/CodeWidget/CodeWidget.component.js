/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';
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

try {
	const AceEditor = require('react-ace').default;

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
					theme="chrome"
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
