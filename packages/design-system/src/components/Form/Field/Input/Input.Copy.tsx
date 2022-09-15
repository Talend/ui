import React, { useEffect, useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { useTranslation } from 'react-i18next';
import FieldGroup from '../../FieldGroup';
import Text from './Input.Text';
import { InputProps } from './Input';
import { AffixButton, AffixReadOnly } from '../../FieldGroup/Affix';
import { I18N_DOMAIN_DESIGN_SYSTEM } from '../../../constants';

const InputCopy = React.forwardRef(
	(
		{ label, disabled, readOnly, value, defaultValue, prefix, ...rest }: InputProps,
		ref: React.Ref<HTMLInputElement | null>,
	) => {
		const [copiedValue, setCopiedValue] = useState('');
		const [copyError, setCopyError] = useState<Error | undefined | null>(null);
		const [{ value: clipboardValue, error: clipboardError }, copyToClipboard] =
			useCopyToClipboard();
		const inputRef = React.useRef<HTMLInputElement | null>(null);
		const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);
		const inputValue = value || defaultValue;

		useEffect(() => {
			if (inputValue !== copiedValue) {
				setCopiedValue('');
				setCopyError(null);
			}
		}, [inputValue, copiedValue]);

		useEffect(() => {
			setCopiedValue(clipboardValue as string);
		}, [clipboardValue]);

		useEffect(() => {
			setCopyError(clipboardError);
		}, [clipboardError]);

		React.useImperativeHandle(ref, () => inputRef.current);

		const getDescriptionMessage = () => {
			if (copyError) {
				return copyError.message;
			} else if (copiedValue && copiedValue === inputValue) {
				return t('FORM_COPY_COPIED_TO_CLIPBOARD', 'Copied to clipboard');
			}
			return '';
		};

		return (
			<FieldGroup
				label={label}
				prefix={prefix}
				suffix={
					!readOnly || disabled ? (
						<AffixButton
							icon="talend-files-o"
							onClick={() => copyToClipboard(inputRef.current?.value || '')}
							hideText
							disabled={disabled}
						>
							{t('FORM_COPY_COPY_TO_CLIPBOARD', 'Copy to clipboard')}
						</AffixButton>
					) : (
						<AffixReadOnly icon="talend-files-o" hideText>
							{t('FORM_COPY_COPY_TO_CLIPBOARD', 'Copy to clipboard')}
						</AffixReadOnly>
					)
				}
				readOnly={!disabled}
				disabled={!!disabled}
				hasError={!!copyError}
				hasSuccess={!!copiedValue}
				description={getDescriptionMessage()}
			>
				{/*
				// @ts-ignore */}
				<Text
					{...rest}
					value={value}
					defaultValue={defaultValue}
					label={t('FORM_COPY_COPY_TO_CLIPBOARD', 'Copy to clipboard')}
					ref={inputRef}
				/>
			</FieldGroup>
		);
	},
);

export default InputCopy;
