import React from 'react';
import styled from 'styled-components';
import { unstable_useId as useId } from 'reakit';

import { InputProps } from './Input';
import { InlineStyle } from '../Field.style';

import tokens from '../../../../tokens';
import useReadOnly from './hooks/useReadOnly';

export const SRadio = styled(InlineStyle)<{
	readOnly: boolean;
	checked: boolean;
	disabled: boolean;
}>`
	span:before,
	span:after {
		border-radius: ${tokens.radii.circleRadius};
	}

	input:checked + span:before {
		background-color: ${({ theme }) => theme.colors.inputBackgroundColor};
	}

	input:checked + span:after {
		background-color: ${({ theme }) => theme.colors.activeColor[500]};
	}

	&.input--read-only.input--checked span:after {
		background-color: ${({ theme }) => theme.colors.inputColor};
	}
`;

const Radio = React.forwardRef(
	(
		{
			id,
			label,
			defaultChecked,
			checked,
			readOnly,
			disabled,
			required,
			children,
			...rest
		}: InputProps,
		ref: React.Ref<HTMLInputElement>,
	) => {
		const { id: reakitId } = useId();
		const radioId = id || `radio--${reakitId}`;
		const readOnlyRadioProps = useReadOnly(defaultChecked || checked);

		let radioProps = {};
		if (readOnly) {
			radioProps = readOnlyRadioProps;
		}

		return (
			<SRadio readOnly={!!readOnly} checked={!!checked} disabled={!!disabled}>
				<label htmlFor={radioId} style={readOnly ? { pointerEvents: 'none' } : {}}>
					<input
						type="radio"
						id={radioId}
						checked={checked}
						defaultChecked={defaultChecked}
						disabled={disabled}
						readOnly={readOnly}
						required={required}
						{...rest}
						{...radioProps}
						ref={ref}
					/>
					<span>
						{label || children}
						{required && '*'}
					</span>
				</label>
			</SRadio>
		);
	},
);

export default Radio;
