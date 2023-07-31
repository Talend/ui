import { forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { useTranslation } from 'react-i18next';
import { I18N_DOMAIN_DESIGN_SYSTEM } from '../../../constants';
import {
	FieldPrimitive,
	FieldPropsPrimitive,
	InputPrimitive,
	InputPrimitiveProps,
} from '../../Primitives/index';

type InputCopyProps = Omit<FieldPropsPrimitive, 'hasError'> &
	Omit<InputPrimitiveProps, 'style' | 'className' | 'suffix'>;

const InputCopy = forwardRef(
	(
		{
			label,
			link,
			description,
			id,
			name,
			hideLabel,
			value,
			defaultValue,
			disabled,
			readOnly,
			required,
			...rest
		}: InputCopyProps,
		ref: Ref<HTMLInputElement | null>,
	) => {
		const [copiedValue, setCopiedValue] = useState('');
		const [changedTime, setChangedTime] = useState<number | null | undefined>(null);
		const [copyError, setCopyError] = useState<Error | undefined | null>(null);
		const [{ value: clipboardValue, error: clipboardError }, copyToClipboard] =
			useCopyToClipboard();
		const inputRef = useRef<HTMLInputElement | null>(null);
		const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);
		const inputValue = value || defaultValue;

		const updateChangeTime = (update: boolean) => {
			setChangedTime(update ? Date.now() : null);
		};
		useEffect(() => {
			if (inputValue) {
				updateChangeTime(true);
			}
		}, [inputValue]);
		useEffect(() => {
			if (inputValue !== copiedValue) {
				setCopiedValue('');
				setCopyError(null);
				updateChangeTime(false);
			}
		}, [inputValue, copiedValue]);

		useEffect(() => {
			if (changedTime && copiedValue !== inputValue) {
				setCopiedValue(clipboardValue as string);
				updateChangeTime(false);
			}
		}, [clipboardValue, changedTime]);

		useEffect(() => {
			setCopyError(clipboardError);
		}, [clipboardError]);

		useImperativeHandle(ref, () => inputRef.current);
		const doCopy = () => {
			copyToClipboard(inputRef.current?.value || '');
			updateChangeTime(true);
		};
		const getDescriptionMessage = () => {
			if (copyError) {
				return copyError.message;
			} else if (copiedValue && copiedValue === inputValue) {
				return t('FORM_COPY_COPIED_TO_CLIPBOARD', 'Copied to clipboard');
			}
			return '';
		};

		return (
			<FieldPrimitive
				label={label}
				description={getDescriptionMessage()}
				hasError={!!copyError}
				hideLabel={hideLabel}
				required={required}
				name={name}
			>
				<InputPrimitive
					{...rest}
					ref={inputRef}
					value={value}
					defaultValue={defaultValue}
					readOnly={!disabled}
					disabled={!!disabled}
					suffix={{
						type: 'button',
						icon: 'talend-files-o',
						onClick: () => doCopy(),
						disabled: !!disabled || !!readOnly,
						children: t('FORM_COPY_COPY_TO_CLIPBOARD', 'Copy to clipboard'),
						hideText: true,
					}}
				/>
			</FieldPrimitive>
		);
	},
);

InputCopy.displayName = 'InputCopy';

export default InputCopy;
