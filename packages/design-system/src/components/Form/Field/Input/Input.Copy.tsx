import React, { forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCopyToClipboard } from '@talend/react-hooks';
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
		const [copiedValue, copyToClipboard] = useCopyToClipboard();
		const inputRef = useRef<HTMLInputElement | null>(null);
		const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);
		const inputValue = value || defaultValue;

		useImperativeHandle(ref, () => inputRef.current);

		const getDescriptionMessage = () => {
			if (copiedValue && copiedValue === inputValue) {
				return t('FORM_COPY_COPIED_TO_CLIPBOARD', 'Copied to clipboard');
			}
			return '';
		};

		return (
			<FieldPrimitive
				label={label}
				description={getDescriptionMessage()}
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
						onClick: () => copyToClipboard(inputRef.current?.value || ''),
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
