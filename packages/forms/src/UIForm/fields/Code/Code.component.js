import PropTypes from 'prop-types';
import React from 'react';
import { translate } from 'react-i18next';
import keyCode from 'keycode';
import CircularProgress from '@talend/react-components/lib/CircularProgress';
import FieldTemplate from '../FieldTemplate';
import { generateId, generateDescriptionId, generateErrorId } from '../../Message/generateId';
import getDefaultT from '../../../translate';
import { I18N_DOMAIN_FORMS } from '../../../constants';

// import ReactAce from 'react-ace';
const ReactAce = React.lazy(() => import(/* webpackChunkName: "react-ace" */ 'react-ace'));

const DEFAULT_SET_OPTIONS = {
	enableBasicAutocompletion: true,
	enableLiveAutocompletion: true,
	enableSnippets: true,
};

// eslint-disable-next-line react/no-multi-comp
class Code extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onFinish = this.onFinish.bind(this);
		this.onLoad = this.onLoad.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);

		// this hold the last time the ESC is pressed to offer an escape solution from keyboard trap
		this.lastEsc = null;
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
			textarea.setAttribute(
				'aria-describedby',
				`${this.ids.instructionsId} ${this.ids.descriptionId} ${this.ids.errorId}`,
			);
		}
	}

	render() {
		const { id, isValid, errorMessage, schema, value, valueIsUpdating, t } = this.props;
		const { autoFocus, description, options, readOnly = false, title } = schema;
		const descriptionId = generateDescriptionId(id);
		const errorId = generateErrorId(id);
		const instructionsId = generateId(id, 'instructions');
		this.ids = {
			descriptionId,
			errorId,
			instructionsId,
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
				valueIsUpdating={valueIsUpdating}
			>
				<div // eslint-disable-line jsx-a11y/no-static-element-interactions
					id={id && `${id}-editor-container`}
					onBlur={this.onBlur}
					onKeyDown={this.onKeyDown}
					ref={ref => {
						this.ref = ref;
					}}
					tabIndex="-1"
				>
					<div id={instructionsId} className="sr-only">
						{t('TF_CODE_ESCAPE', {
							defaultValue: 'To focus out of the editor, press ESC key twice.',
						})}
					</div>
					<React.Suspense
						fallback={
							<div aria-busy>
								<CircularProgress />
							</div>
						}
					>
						<ReactAce
							key="ace"
							className="tf-widget-code form-control"
							editorProps={{ $blockScrolling: Infinity }} // https://github.com/securingsincity/react-ace/issues/29
							focus={autoFocus}
							name={`${id}_wrapper`}
							mode={options && options.language}
							onBlur={this.onFinish}
							onLoad={this.onLoad}
							onChange={this.onChange}
							// disabled is not supported by ace use readonly
							// https://github.com/ajaxorg/ace/issues/406
							readOnly={readOnly || schema.disabled || valueIsUpdating}
							setOptions={DEFAULT_SET_OPTIONS}
							showGutter={false}
							showPrintMargin={false}
							theme="chrome"
							value={value}
							width="auto"
							{...options}
						/>
					</React.Suspense>
				</div>
			</FieldTemplate>
		);
	}
}

Code.defaultProps = {
	isValid: true,
	schema: {},
	t: getDefaultT(),
};
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
		t: PropTypes.func,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		valueIsUpdating: PropTypes.bool,
	};
}
export default translate(I18N_DOMAIN_FORMS)(Code);
