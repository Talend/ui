/* eslint-disable import/no-mutable-exports */
import PropTypes from 'prop-types';
import React from 'react';
import FieldTemplate from '../FieldTemplate';
import TextArea from '../TextArea';

const DEFAULT_SET_OPTIONS = {
	enableBasicAutocompletion: true,
	enableLiveAutocompletion: true,
	enableSnippets: true,
};

let CodeWidget = TextArea;

try {
	// eslint-disable-next-line global-require,import/no-extraneous-dependencies
	const AceEditor = require('react-ace').default;

	class Code extends React.Component {
		constructor(props) {
			super(props);
			this.onChange = this.onChange.bind(this);
			this.onFinish = this.onFinish.bind(this);
			this.onLoad = this.onLoad.bind(this);
		}

		onChange(value, event) {
			this.props.onChange(event, { schema: this.props.schema, value });
		}

		onFinish(event) {
			this.props.onFinish(event, { schema: this.props.schema });
		}

		onLoad(editor) {
			editor.textInput.getElement().setAttribute('id', this.props.id);
		}

		render() {
			const { id, isValid, errorMessage, schema, value } = this.props;
			const { autoFocus, description, disabled = false, options, readOnly = false, title } = schema;

			return (
				<FieldTemplate
					description={description}
					errorMessage={errorMessage}
					id={id}
					isValid={isValid}
					label={title}
					required={schema.required}
				>
					<AceEditor
						className="tf-widget-code form-control"
						disabled={disabled}
						focus={autoFocus}
						name={`${id}_wrapper`}
						enableSnippets
						mode={options && options.language}
						onBlur={this.onFinish}
						onLoad={this.onLoad}
						onChange={this.onChange}
						readOnly={readOnly}
						setOptions={DEFAULT_SET_OPTIONS}
						showGutter={false}
						showPrintMargin={false}
						theme="chrome"
						value={value}
						width="auto"
						{...options}
					/>
				</FieldTemplate>
			);
		}
	}
	if (process.env.NODE_ENV !== 'production') {
		Code.propTypes = {
			id: PropTypes.string,
			isValid: PropTypes.bool,
			errorMessage: PropTypes.string,
			onChange: PropTypes.func.isRequired,
			onFinish: PropTypes.func.isRequired,
			schema: PropTypes.shape({
				autoFocus: PropTypes.bool,
				description: PropTypes.string,
				disabled: PropTypes.bool,
				options: PropTypes.object,
				readOnly: PropTypes.bool,
				title: PropTypes.string,
				type: PropTypes.string,
			}),
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		};
	}

	Code.defaultProps = {
		isValid: true,
		schema: {},
	};

	CodeWidget = Code;
} catch (error) {
	// eslint-disable-next-line no-console
	console.warn('CodeWidget react-ace not found, fallback to Textarea');
}

export default CodeWidget;
