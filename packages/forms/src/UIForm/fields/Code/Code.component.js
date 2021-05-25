import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import keyCode from 'keycode';
import { ImportLazy, Skeleton } from '@talend/react-components';
import FieldTemplate from '../FieldTemplate';

import { generateId, generateDescriptionId, generateErrorId } from '../../Message/generateId';
import getDefaultT from '../../../translate';
import { I18N_DOMAIN_FORMS } from '../../../constants';

function CodeSkeleton() {
	return (
		<div>
			<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.small} />
			<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
			<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
			<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
			<Skeleton type={Skeleton.TYPES.button} />
		</div>
	);
}

const DEFAULT_SET_OPTIONS = {
	enableBasicAutocompletion: true,
	enableLiveAutocompletion: true,
	enableSnippets: true,
};

function Code(props) {
	const { id, isValid, errorMessage, schema, value, valueIsUpdating, t } = props;
	const { autoFocus, description, options, readOnly = false, title } = schema;
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);
	const instructionsId = generateId(id, 'instructions');
	const containerRef = React.useRef(null);
	const [editor, setEditor] = React.useState(null);

	useEffect(() => {
		if (editor) {
			const textarea = editor.textInput.getElement();
			textarea.setAttribute('id', id);
			textarea.setAttribute('aria-describedby', `${instructionsId} ${descriptionId} ${errorId}`);
		}
	}, [editor, instructionsId, descriptionId, errorId, id]);

	function onChange(value, event) {
		props.onChange(event, { schema: props.schema, value });
	}

	function onFinish(event) {
		props.onFinish(event, { schema: props.schema });
	}

	function onKeyDown(event) {
		if (event.keyCode === keyCode.codes.esc) {
			const now = Date.now();

			if (containerRef.current.lastEsc && containerRef.current.lastEsc - now < 1000) {
				containerRef.current.lastEsc = null;
				containerRef.current.focus();
				editor.textInput.getElement().setAttribute('tabindex', -1);
			} else {
				containerRef.current.lastEsc = now;
			}
		} else {
			containerRef.current.lastEsc = null;
		}
	}

	function onBlur() {
		editor.textInput.getElement().removeAttribute('tabindex');
	}

	function onLoad(ace) {
		setEditor(ace);
	}

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
				onBlur={onBlur}
				onKeyDown={onKeyDown}
				ref={containerRef}
				tabIndex="-1"
			>
				<div id={instructionsId} className="sr-only">
					{t('TF_CODE_ESCAPE', {
						defaultValue: 'To focus out of the editor, press ESC key twice.',
					})}
				</div>
				<ImportLazy skeleton={<CodeSkeleton />} name="react-ace" version="6.2.0" varName="ReactAce" path="/dist/react-ace.min.js">
					{AceEditor => (
						<AceEditor
							key="ace"
							className="tf-widget-code form-control"
							editorProps={{ $blockScrolling: Infinity }} // https://github.com/securingsincity/react-ace/issues/29
							focus={autoFocus}
							name={`${id}_wrapper`}
							mode={options && options.language}
							onBlur={onFinish}
							onLoad={onLoad}
							onChange={onChange}
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
					)}
				</ImportLazy>
			</div>
		</FieldTemplate>
	);
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
			required: PropTypes.bool,
			title: PropTypes.string,
			type: PropTypes.string,
		}),
		t: PropTypes.func,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		valueIsUpdating: PropTypes.bool,
	};
}

Code.defaultProps = {
	isValid: true,
	schema: {},
	t: getDefaultT(),
};

export default withTranslation(I18N_DOMAIN_FORMS)(Code);
