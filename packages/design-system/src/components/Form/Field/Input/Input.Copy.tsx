import React from 'react';
import { useCopyToClipboard } from 'react-use';
import { useTranslation } from 'react-i18next';
import Button from '../../../Button';
import FieldGroup from '../../FieldGroup';
import Text from './Input.Text';
import { InputProps } from './Input';

const InputCopy = React.forwardRef(
	(
		{ label, disabled, readOnly, value, defaultValue, ...rest }: InputProps,
		ref: React.Ref<HTMLInputElement | null>,
	) => {
		const [{ value: copiedValue, error: copyError }, copyToClipboard] = useCopyToClipboard();
		const inputRef = React.useRef<HTMLInputElement | null>(null);
		const { t } = useTranslation();
		const inputValue = value || defaultValue;

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
				suffix={
					!readOnly ? (
						<Button.Icon
							icon="talend-files-o"
							onClick={() => copyToClipboard(inputRef.current?.value || '')}
							disabled={disabled}
						>
							{t('FORM_COPY_COPY_TO_CLIPBOARD', 'Copy to clipboard')}
						</Button.Icon>
					) : undefined
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
