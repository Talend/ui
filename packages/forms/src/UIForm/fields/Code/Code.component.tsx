import { DetailedHTMLProps, LabelHTMLAttributes, useEffect, useState } from 'react';
import { IAceEditorProps } from 'react-ace';
import { useTranslation } from 'react-i18next';
import ReactAce from 'react-ace';
import 'ace-builds/src-noconflict/ext-language_tools';
import { VisuallyHidden } from '@talend/design-system';

import { I18N_DOMAIN_FORMS } from '../../../constants';
import { generateDescriptionId, generateErrorId, generateId } from '../../Message/generateId';
import FieldTemplate from '../FieldTemplate';

declare const ace: any;

// setup CDN so ace is able to load its modes and themes
ace.config.set('basePath', 'https://statics.cloud.talend.com/ace-builds/1.10.1/src-min-noconflict');

const DEFAULT_SET_OPTIONS = {
	enableBasicAutocompletion: true,
	enableLiveAutocompletion: true,
	enableSnippets: true,
};

interface CodeSchema {
	autoFocus: boolean;
	description: string;
	disabled: boolean;
	options: IAceEditorProps & { language?: string };
	readOnly: boolean;
	required: boolean;
	title: string;
	labelProps: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
	type: string;
}
export interface CodeProps {
	id?: string;
	isValid?: boolean;
	errorMessage?: string;
	onChange: (
		event: Event,
		payload: { schema: Partial<CodeSchema>; value: string | number },
	) => void;
	onFinish: (event: Event, payload: { schema: Partial<CodeSchema> }) => void;
	schema?: Partial<CodeSchema>;
	value?: string;
	valueIsUpdating?: boolean;
	showInstructions?: boolean;
}

export default function Code({
	id,
	isValid = true,
	errorMessage,
	schema = {},
	value,
	valueIsUpdating,
	onChange,
	onFinish,
	showInstructions = true,
}: CodeProps) {
	const { t } = useTranslation(I18N_DOMAIN_FORMS);
	const { autoFocus, description, options, readOnly = false, title, labelProps } = schema;
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);
	const instructionsId = generateId(id, 'instructions');
	const [editor, setEditor] = useState<any>(null);

	useEffect(() => {
		if (editor) {
			const textarea = editor.textInput.getElement();
			textarea.setAttribute('id', id);
			textarea.setAttribute('aria-describedby', `${instructionsId} ${descriptionId} ${errorId}`);
		}
	}, [editor, instructionsId, descriptionId, errorId, id]);

	function onBlur() {
		editor?.textInput?.getElement()?.removeAttribute('tabindex');
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
			labelProps={labelProps}
			required={schema.required}
			valueIsUpdating={valueIsUpdating}
		>
			<div // eslint-disable-line jsx-a11y/no-static-element-interactions
				id={id && `${id}-editor-container`}
				onBlur={onBlur}
				tabIndex={-1}
			>
				{showInstructions && (
					<VisuallyHidden id={instructionsId} data-testid="widget-code-instructions">
						{t('TF_CODE_ESCAPE', {
							defaultValue: 'To focus out of the editor, press ESC key twice.',
						})}
					</VisuallyHidden>
				)}

				<ReactAce
					key="ace"
					editorProps={{ $blockScrolling: Infinity }} // https://github.com/securingsincity/react-ace/issues/29
					focus={autoFocus}
					name={`${id}_wrapper`}
					mode={options?.language}
					onBlur={(event: Event) => onFinish(event, { schema })}
					onLoad={(component: unknown) => setEditor(component)}
					onChange={(newValue: string | number, event: Event) =>
						onChange(event, { schema: schema, value: newValue })
					}
					// disabled is not supported by ace use readonly
					// https://github.com/ajaxorg/ace/issues/406
					readOnly={readOnly || schema.disabled || valueIsUpdating}
					setOptions={DEFAULT_SET_OPTIONS}
					showGutter={false}
					showPrintMargin={false}
					value={value}
					width="auto"
					{...options}
				/>
			</div>
		</FieldTemplate>
	);
}
