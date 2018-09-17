/* eslint-disable global-require,import/no-extraneous-dependencies */
/* eslint-disable import/no-mutable-exports,jsx-a11y/no-static-element-interactions */
import PropTypes from 'prop-types';
import React from 'react';
import keyCode from 'keycode';
import FieldTemplate from '../FieldTemplate';
import TextArea from '../TextArea';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';

const DEFAULT_SET_OPTIONS = {
	enableBasicAutocompletion: true,
	enableLiveAutocompletion: true,
	enableSnippets: true,
};

let CodeWidget = TextArea;

try {
	const AceEditor = require('react-ace').default;
	require('brace/ext/language_tools'); // https://github.com/securingsincity/react-ace/issues/95

	class Code extends React.Component {
		constructor(props) {
			super(props);
			this.onChange = this.onChange.bind(this);
			this.onFinish = this.onFinish.bind(this);
			this.onLoad = this.onLoad.bind(this);
			this.onBlur = this.onBlur.bind(this);
			this.onKeyDown = this.onKeyDown.bind(this);
		}

		componentDidUpdate() {
			this.attachTextareaAttributes();
		}

		onChange(value, event) {
			this.props.onChange(event, { schema: this.props.schema, value });
		}

		onFinish(event) {
			this.props.onFinish(event, { schema: this.props.schema });
		}

		onKeyDown(event) {
			if (event.keyCode === keyCode.codes.esc) {
				const now = Date.now();
				if (this.lastEsc && this.lastEsc - now < 1000) {
					this.lastEsc = null;
					this.ref.focus();
					this.editor.textInput.getElement().setAttribute('tabindex', -1);
				} else {
					this.lastEsc = now;
				}
			} else {
				this.lastEsc = null;
			}
		}

		onBlur() {
			this.editor.textInput.getElement().removeAttribute('tabindex');
		}

		onLoad(editor) {
			this.editor = editor;
			this.attachTextareaAttributes();
		}

		attachTextareaAttributes() {
			if (this.editor) {
				const textarea = this.editor.textInput.getElement();
				textarea.setAttribute('id', this.props.id);
				textarea.setAttribute('aria-describedby', `${this.ids.descriptionId} ${this.ids.errorId}`);
			}
		}

		render() {
			const { id, isValid, errorMessage, schema, value } = this.props;
			const { autoFocus, description, disabled = false, options, readOnly = false, title } = schema;
			const descriptionId = generateDescriptionId(id);
			const errorId = generateErrorId(id);
			this.ids = {
				descriptionId,
				errorId,
			};
			return (
				<FieldTemplate
					description={description}
					descriptionId={descriptionId}
					errorId={errorId}
					errorMessage={errorMessage}
					id={id}
					isValid={isValid}
					label={title}
					required={schema.required}
				>
					<div
						id={id && `${id}-editor-container`}
						onBlur={this.onBlur}
						onKeyDown={this.onKeyDown}
						ref={ref => {
							this.ref = ref;
						}}
						tabIndex="-1"
					>
						<AceEditor
							className="tf-widget-code form-control"
							disabled={disabled}
							editorProps={{ $blockScrolling: Infinity }} // https://github.com/securingsincity/react-ace/issues/29
							focus={autoFocus}
							name={`${id}_wrapper`}
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
					</div>
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
