import React from 'react';
import { useCopyToClipboard } from 'react-use';
import Button from '../../../Button';
import FieldGroup from '../../FieldGroup';
import Text from './Input.Text';
import { InputProps } from './Input';

const InputCopy = React.forwardRef(
	({ label, disabled, readOnly, ...rest }: InputProps, ref: React.Ref<HTMLInputElement | null>) => {
		const [state, copyToClipboard] = useCopyToClipboard();
		const inputRef = React.useRef<HTMLInputElement | null>(null);

		React.useImperativeHandle(ref, () => inputRef.current);

		return (
			<FieldGroup
				label={label}
				suffix={
					!readOnly && (
						<Button.Icon
							icon="talend-files-o"
							onClick={() => copyToClipboard(inputRef.current?.value || '')}
							disabled={disabled}
						>
							Copy to clipboard
						</Button.Icon>
					)
				}
				readOnly={!disabled}
				disabled={!!disabled}
				hasError={!!state.error}
				hasSuccess={!!state.value}
				description={state.error ? state.error.message : state.value && 'Copied to clipboard'}
			>
				{/*
				// @ts-ignore */}
				<Text {...rest} label="Copy to clipboard" ref={inputRef} />
			</FieldGroup>
		);
	},
);

export default InputCopy;
