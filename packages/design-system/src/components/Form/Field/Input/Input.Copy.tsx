import React from 'react';
import { useCopyToClipboard } from 'react-use';
import { useTranslation } from 'react-i18next';
import Button from '../../../Button';
import FieldGroup from '../../FieldGroup';
import Text from './Input.Text';
import { InputProps } from './Input';

const InputCopy = React.forwardRef(
	({ label, disabled, readOnly, ...rest }: InputProps, ref: React.Ref<HTMLInputElement | null>) => {
		const [state, copyToClipboard] = useCopyToClipboard();
		const inputRef = React.useRef<HTMLInputElement | null>(null);
		const { t } = useTranslation();

		React.useImperativeHandle(ref, () => inputRef.current);

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
				hasError={!!state.error}
				hasSuccess={!!state.value}
				description={
					state.error
						? state.error.message
						: state.value && t('FORM_COPY_COPIED_TO_CLIPBOARD', 'Copied to clipboard')
				}
			>
				{/*
				// @ts-ignore */}
				<Text
					{...rest}
					label={t('FORM_COPY_COPY_TO_CLIPBOARD', 'Copy to clipboard')}
					ref={inputRef}
				/>
			</FieldGroup>
		);
	},
);

export default InputCopy;
