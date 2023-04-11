import {
	lazy,
	DetailedHTMLProps,
	KeyboardEvent,
	LabelHTMLAttributes,
	Suspense,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { isEventKey, codes } from 'keycode';
import assetsApi from '@talend/assets-api';
import { AceEditorProps } from 'react-ace';
import FieldTemplate from '../FieldTemplate';
import { generateId, generateDescriptionId, generateErrorId } from '../../Message/generateId';

import { I18N_DOMAIN_FORMS } from '../../../constants';
import CodeSkeleton from './CodeSkeleton.component';

const ReactAce = lazy(() =>
	assetsApi.getUMD('react-ace').then((mod: any) => assetsApi.toDefaultModule(mod.default)),
);

const DEFAULT_SET_OPTIONS = {
	enableBasicAutocompletion: true,
	enableLiveAutocompletion: true,
	enableSnippets: true,
};

interface CodeSchema {
	autoFocus: boolean;
	description: string;
	disabled: boolean;
	options: AceEditorProps & { language?: string };
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
	value?: string | number;
	valueIsUpdating?: boolean;
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
}: CodeProps) {
	const { t } = useTranslation(I18N_DOMAIN_FORMS);
	const { autoFocus, description, options, readOnly = false, title, labelProps } = schema;
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);
	const instructionsId = generateId(id, 'instructions');
	const containerRef = useRef<any>(null);
	const [editor, setEditor] = useState<any>(null);

	useEffect(() => {
		if (editor) {
			const textarea = editor.textInput.getElement();
			textarea.setAttribute('id', id);
			textarea.setAttribute('aria-describedby', `${instructionsId} ${descriptionId} ${errorId}`);
		}
	}, [editor, instructionsId, descriptionId, errorId, id]);

	function onKeyDown(event: KeyboardEvent) {
		if (isEventKey(event.nativeEvent, codes.enter)) {
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
				onKeyDown={onKeyDown}
				ref={containerRef}
				tabIndex={-1}
			>
				<div id={instructionsId} className="sr-only">
					{t('TF_CODE_ESCAPE', {
						defaultValue: 'To focus out of the editor, press ESC key twice.',
					})}
				</div>
				<Suspense fallback={<CodeSkeleton />}>
					<ReactAce
						key="ace"
						className="tf-widget-code form-control"
						editorProps={{ $blockScrolling: Infinity }} // https://github.com/securingsincity/react-ace/issues/29
						focus={autoFocus}
						name={`${id}_wrapper`}
						mode={options?.language}
						onBlur={(event: Event) => onFinish(event, { schema })}
						onLoad={(ace: any) => setEditor(ace)}
						onChange={(newValue: string | number, event: Event) =>
							onChange(event, { schema: schema, value: newValue })
						}
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
				</Suspense>
			</div>
		</FieldTemplate>
	);
}
